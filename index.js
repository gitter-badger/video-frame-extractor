var exec = require('child_process').exec;

exports.extractFrame = function(file, time, frame) {
  var command  = 'ffmpeg -i ./fixtures/timecode.mp4 -vf "select=gte(n\\, ' + frame +')" -vframes 1 ' + frame + '.png';
  console.log(command);

  child = exec(command, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
