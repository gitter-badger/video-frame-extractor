var exec = require('child_process').exec;


function calculateFrame(frameRate, time, frameNumber) {
  var a = time.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
  
  return Math.ceil((seconds * frameRate) + frameNumber - 1);
}

exports.extractFrame = function(filePath, frameRate, time, frameNumber) {
  var frame = calculateFrame(frameRate, time, frameNumber);
  var command  = 'ffmpeg -r ' + frameRate + ' -i ./fixtures/timecode.mp4 -vf "select=gte(n\\, ' + frame +')" -vframes 1 ' + frameNumber + '.png -y';
  console.log(command);

  child = exec(command, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
