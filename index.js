var exec = require('child_process').exec;

exports.extractFrame = function(filePath, frameRate, time, frameNumber) {
  console.log('Extracting Frame: ' + time + ';' + frameNumber);
  command  = 'ffmpeg  -vsync passthrough  -ss ' + time + ' -i ' + filePath +' -vf "select=gte(n\\, ' + frameNumber  +')" -vframes 1 ' + frameNumber + '.png -y';
  child = exec(command, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
