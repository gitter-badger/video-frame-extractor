var videoFrameExtractor = require('../index');

for(var i = 0; i < 10; i++) {
  videoFrameExtractor.extractFrame('fixtures/timecode.mp4' , 29.970, '00:05:00', i);
}
