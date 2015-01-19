var exec = require('child_process').exec;

exports.extractFrame = function(filePath, frameRate, time, frameNumber) {
  var command  = 'ffmpeg -i ./fixtures/timecode.mp4 -vf "select=gte(n\\, ' + frameNumber +')" -vframes 1 ' + frameNumber + '.png';
  console.log(command);

  child = exec(command, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
