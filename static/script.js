document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('audioFile');
    const progressBar = document.querySelector('.progress-bar');
    const progressDiv = document.getElementById('progress');
    const resultsDiv = document.getElementById('results');

    // 拖放处理
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('dragover');
    }

    function unhighlight(e) {
        dropZone.classList.remove('dragover');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFile(file);
    }

    // 文件输入处理
    fileInput.addEventListener('change', function(e) {
        handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // 显示进度条
        progressDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        progressBar.style.width = '0%';
        dropZone.classList.add('processing');

        // 模拟进度
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 90) {
                clearInterval(progressInterval);
                progress = 90;
            }
            progressBar.style.width = progress + '%';
        }, 500);

        fetch('/split', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            
            if (data.error) {
                alert(data.error);
                return;
            }

            // 更新音频播放器
            document.getElementById('vocals').src = '/download/' + data.vocals_path;
            document.getElementById('accompaniment').src = '/download/' + data.accompaniment_path;
            
            // 显示结果
            setTimeout(() => {
                progressDiv.style.display = 'none';
                resultsDiv.style.display = 'block';
                dropZone.classList.remove('processing');
            }, 500);
        })
        .catch(error => {
            clearInterval(progressInterval);
            alert('处理过程中出现错误：' + error);
            dropZone.classList.remove('processing');
        });
    }

    // 下载处理
    window.downloadTrack = function(type) {
        const audio = document.getElementById(type);
        if (audio.src) {
            const link = document.createElement('a');
            link.href = audio.src;
            link.download = type + '.wav';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
}); 