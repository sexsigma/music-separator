from flask import Flask, render_template, request, send_file, jsonify
import os
from werkzeug.utils import secure_filename
import numpy as np
import librosa
from spleeter.separator import Separator

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# 确保上传目录存在
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# 允许的文件扩展名
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'ogg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/split', methods=['POST'])
def split_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(input_path)
        
        # 使用Spleeter进行音频分离
        separator = Separator('spleeter:2stems')
        
        # 创建输出目录
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output')
        os.makedirs(output_path, exist_ok=True)
        
        # 执行分离
        separator.separate_to_file(input_path, output_path)
        
        # 获取分离后的文件路径
        base_name = os.path.splitext(filename)[0]
        vocals_path = os.path.join(output_path, base_name, 'vocals.wav')
        accompaniment_path = os.path.join(output_path, base_name, 'accompaniment.wav')
        
        return jsonify({
            'status': 'success',
            'vocals_path': vocals_path,
            'accompaniment_path': accompaniment_path
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_file(filename, as_attachment=True)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)
