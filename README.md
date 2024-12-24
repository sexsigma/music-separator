# Music Separator 音乐分离器

[English](#english) | [中文](#chinese)

## English

### Introduction
Music Separator is a web-based application that separates music into vocals and instrumental tracks using advanced AI technology. It provides an intuitive interface for users to upload music files and obtain high-quality separated audio tracks.

### Features
- 🎵 High-quality audio separation using Spleeter AI technology
- 🎨 Beautiful and intuitive web interface
- 📱 Responsive design that works on both desktop and mobile devices
- 🔄 Drag and drop file upload support
- ⚡ Real-time processing progress display
- 💾 Easy download of separated tracks
- 🎧 In-browser audio preview

### Supported Formats
- MP3
- WAV
- OGG

### Installation

1. Make sure you have Python 3.9-3.12 installed (3.13 is not supported yet)

2. Clone the repository:
```bash
git clone https://github.com/sexsigma/music-separator.git
cd music-separator
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and visit:
```
http://localhost:5000
```

### Usage
1. Open the web interface in your browser
2. Drag and drop your music file or click to select
3. Wait for the processing to complete
4. Preview the separated tracks in your browser
5. Download the vocals and instrumental tracks

### Technical Details
- Backend: Flask (Python)
- Audio Processing: Spleeter
- Frontend: HTML5, CSS3, JavaScript
- UI Framework: Bootstrap 5
- Additional Libraries: librosa, numpy, scipy

---

## Chinese

### 简介
音乐分离器是一个基于Web的应用程序，使用先进的AI技术将音乐分离成人声和伴奏轨道。它提供了直观的界面，让用户可以上传音乐文件并获得高质量的分离音轨。

### 特点
- 🎵 使用Spleeter AI技术进行高质量音频分离
- 🎨 美观直观的网页界面
- 📱 响应式设计，同时支持桌面和移动设备
- 🔄 支持拖放文件上传
- ⚡ 实时处理进度显示
- 💾 简单的音轨下载功能
- 🎧 浏览器内音频预览

### 支持的格式
- MP3
- WAV
- OGG

### 安装步骤

1. 确保安装了Python 3.9-3.12版本（暂不支持3.13）

2. 克隆仓库：
```bash
git clone https://github.com/sexsigma/music-separator.git
cd music-separator
```

3. 安装依赖：
```bash
pip install -r requirements.txt
```

4. 运行应用：
```bash
python app.py
```

5. 打开浏览器访问：
```
http://localhost:5000
```

### 使用方法
1. 在浏览器中打开Web界面
2. 拖放音乐文件或点击选择文件
3. 等待处理完成
4. 在浏览器中预览分离的音轨
5. 下载人声和伴奏音轨

### 技术细节
- 后端：Flask (Python)
- 音频处理：Spleeter
- 前端：HTML5, CSS3, JavaScript
- UI框架：Bootstrap 5
- 其他库：librosa, numpy, scipy

### 注意事项
- 上传文件大小限制为16MB
- 处理时间取决于音频文件的大小和服务器性能
- 建议使用高质量的音频文件以获得最佳分离效果 
