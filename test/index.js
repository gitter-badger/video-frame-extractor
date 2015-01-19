var videoFrameExtractor = require('../index');

for(var i = 0; i < 10; i++) {
  videoFrameExtractor.extractFrame('./test/fixtures/timecode.mp4' , 29.97, '00:05:00', i);
}
