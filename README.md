## Video Frame Extractor

[![Join the chat at https://gitter.im/ikhasi/video-frame-extractor](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ikhasi/video-frame-extractor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This library extracts frames from a video file using ffmpeg and saves the file to disk.

### Dependencies

- Mediainfo
- ffmpeg

### Usage

The output path is the path and the filename where the image should be stored on disk

```
npm install --save video-frame-extractor

var videoFrameExtractor = require('video-frame-extractor');

videoFrameExtractor.extractFrame(sourceFilePath, time, frameNumber, outputPath);
```

### Test

- Add a video file to test/fixtures
- Edit the test/index.js and set the time and frames you want


```
node test/index.js
```
