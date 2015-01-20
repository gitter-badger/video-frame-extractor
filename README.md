## Video Frame Extractor

This library extracts frames from a video file using ffmpeg and saves the file to disk.

### Dependencies

- Mediainfo
- ffmpeg

### Usage

```
npm install --save video-frame-extractor

var videoFrameExtractor = require('video-frame-extractor');

videoFrameExtractor.extractFrame(filePath, time, frameNumber);
```

### Test

- Add a video file to test/fixtures
- Edit the test/index.js and set the time and frames you want


```
node test/index.js
``
