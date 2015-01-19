var videoFrameExtractor = require('../index');

for(var i = 0; i < 400; i++) {
  videoFrameExtractor.extractFrame('./test/fixtures/timecode.mov' , 29.970, '00:00:00', i);
}
