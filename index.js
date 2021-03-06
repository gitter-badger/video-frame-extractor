var exec = require('child_process').exec,
    Promise = require('bluebird'),
    _ = require('lodash'),
    mediainfo = require('mediainfo');

function getMediaInfo(filePath) {
  return new Promise(function(resolve, reject) {
    mediainfo(filePath, function(err, info) {
      if(err) return reject(err);

      return resolve(info);
    });
  });
}

function parseTimecode(time) {
  var hhmmss = time.split(':');
  
  return {
    hours: hhmmss[0],
    minutes: hhmmss[1],
    seconds: hhmmss[2]
  };
}

function calculateFrame(frameRate, startTime, time, frameNumber) {
  var hours, minutes, seconds, startSeconds, parsedTime, parsedStartTime, frame, realSeconds;

  parsedTime = parseTimecode(time);
  parsedStartTime = parseTimecode(startTime);
 
  seconds = (+parsedTime.hours) * 60 * 60 + (+parsedTime.minutes) * 60 + (+parsedTime.seconds); 
  startSeconds = (+parsedStartTime.hours) * 60 * 60 + (+parsedStartTime.minutes) * 60 + (+parsedStartTime.seconds); 
  
  realSeconds = seconds - startSeconds;

  frame = (realSeconds * Math.ceil(frameRate)) + frameNumber

  return frame;
}

module.exports =  {
  extractFrame: function(filePath, time, frameNumber, outputPath) {
    console.log(time);
    console.log(frameNumber);
    return new Promise(function(resolve, reject) {
      var frame, command, videoTrack, timecodeTrack, startTimecode, fileName;

      startTimecode = '00:00:00';

      getMediaInfo(filePath).then(function(info) {
        videoTrack =  _.select(info[0].tracks, function(track) { return track.type === "Video"; })[0];
        timecodeTrack = _.select(info[0].tracks, function(track) { return track.type === "OtherTime code" })[0];

        if(timecodeTrack !== null && timecodeTrack !== undefined)
          startTimecode = timecodeTrack.time_code_of_first_frame;

        frame = calculateFrame(videoTrack.frame_rate.split(' ')[0], startTimecode, time, parseInt(frameNumber));

        command  = 'time ffmpeg -i ' + filePath +' -s 192x168 -qscale 28 -vf "select=gte(n\\, ' + frame + ')" -vframes 1 -threads 10 /tmp/' + outputPath + ' -y';
        child = exec(command, function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }

          return resolve();
        });
      });
    });
  }
};
