<!DOCTYPE html>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>VoiceShadow</title>
  <style type='text/css'>
    ul { list-style: none; }
    #recordingslist audio { display: block; margin-bottom: 10px; }
  </style>
  <script src="recorder.js?<?php echo time();?>"></script>
  <script src="jquery.js?<?php echo time();?>"></script>
</head>
<body>

  <h1>VoiceShadow</h1>

  <button onclick="startRecording(this);" id="btn_rec" disabled>record</button>
  <button onclick="stopRecording(this);" id="btn_stop" disabled>stop</button>
  
  <h2>Recordings</h2>
  <ul id="recordingslist"></ul>
  
  <h2>Log</h2>
  <pre id="log"></pre>

  <script>
  function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
  }

  var audio_context;
  var recorder;
  var audio;

  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.');
    
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    __log('Recorder initialised.');
  }

  function startRecording(button) {
    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
    __log('Recording...');
  }

  function stopRecording(button) {
    recorder && recorder.stop();
    button.disabled = true;
    button.previousElementSibling.disabled = false;
    __log('Stopped recording.');
    
    // create WAV download link using audio data blob
    createDownloadLink();
    
    recorder.clear();
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
  }

  window.onload = function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      __log('No live audio input: ' + e);
    });
  };
  
  
  
  //Audio play
  //var curPlaying;

  $(function() {
  //    $(".playback").click(function(e) {
  //        e.preventDefault();
  //        var song = $(this).next('audio')[0];
  //        if(song.paused){
  //            song.play();
  //            if(curPlaying) $("audio", "#"+curPlaying)[0].pause();
  //        } else { song.pause(); }
  //        curPlaying = $(this).parent()[0].id;
  //    });
  
  });
  
  function jInit(){
      audio = $("#audioshadow");
      addEventHandlers();
  }

  function addEventHandlers(){
      $("#btn_rec").click(startAudio);
      $("#btn_stop").click(stopAudio);
      //$("a.load").click(loadAudio);
      //$("a.start").click(startAudio);
      //$("a.forward").click(forwardAudio);
      //$("a.back").click(backAudio);
      //$("a.pause").click(pauseAudio);
      //$("a.stop").click(stopAudio);
      //$("a.volume-up").click(volumeUp);
      //$("a.volume-down").click(volumeDown);
      //$("a.mute").click(toggleMuteAudio);
  }

  function loadAudio(){
      audio.bind("load",function(){
        __log('MP3 Audio Loaded succesfully');
        $('#btn_rec').removeAttr( "disabled" );
      });
      audio.trigger('load');
  }

  function startAudio(){
      audio.trigger('play');
  }

  function pauseAudio(){
      audio.trigger('pause');
  }

  function stopAudio(){
      pauseAudio();
      audio.prop("currentTime",0);
  }

  function forwardAudio(){
      pauseAudio();
      audio.prop("currentTime",audio.prop("currentTime")+5);
      startAudio();
  }

  function backAudio(){
      pauseAudio();
      audio.prop("currentTime",audio.prop("currentTime")-5);
      startAudio();
  }

  function volumeUp(){
      var volume = audio.prop("volume")+0.2;
      if(volume >1){
        volume = 1;
      }
      audio.prop("volume",volume);
  }

  function volumeDown(){
      var volume = audio.prop("volume")-0.2;
      if(volume <0){
        volume = 0;
      }
      audio.prop("volume",volume);
  }

  function toggleMuteAudio(){
      audio.prop("muted",!audio.prop("muted"));
  }
  
  $( document ).ready(function() {
     jInit();
     loadAudio();
  });
  </script>

  <audio src="file.mp3" id="audioshadow" autobuffer="autobuffer"></audio>
</body>
</html>