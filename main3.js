window.mainobj = [];


var recognition = new webkitSpeechRecognition();
recognition.lang = "en";
recognition.interimResults = true;

recognition.onresult = function(event) {
  if (event.results.length > 0) {
    if (event.results[0].isFinal) {
      $('#usertext').val(event.results[0][0].transcript);
      process();
    } else {
      $('#usertext').val(event.results[0][0].transcript);
    }
  }
}


recognition.onaudiostart = function(event) {
  $('#speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
}

recognition.onend = function(event) {
  $('#speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
}


$(document).ready(function() {

  //$('#usertext').bind('webkitspeechchange', function() {
  //  process();
  //});
  
  
  $('#usertext').keypress(function (e) {
    if (e.which == 13) {
      process();
    }
  });
  
  $('#speech-content-mic').click(function(){
    recognition.start();
  });
  
  process();
  
});



function process(){
    var usertext = $('#usertext').val();
    
    $('#usertext').val("");
    
    if (usertext != "")
      $("#discusstextarea").html("<span style=\"color:green\">You</span>: " + usertext + "<br />\n" + $("#discusstextarea").html());
    
    $("#cleverbotthink").fadeIn();
    
    var url = {input: usertext}
    
    $.each(window.mainobj, function(index, value) {
      if (index != "clever_output" && index != "output" && index != "input")
        url[index] = value;
    }); 

    $.get("http://learn.core.kochi-tech.ac.jp/clever/proxy.php", { i: JSON.stringify(url) }, function(data) {
      //console.log(data);
      //var obj = JSON.parse(data);
      var obj = data;
      window.mainobj = obj;
      //chrome.tts.speak(obj.output);
      
      var audio = new Audio();
      audio.setAttribute("src", obj.ttsvoice_mp3file);
      audio.load();
      audio.play();
      
      $("#cleverbotthink").fadeOut();  
      $("#discusstextarea").html( "<span style=\"color:#CC6633\">Bot</span>: " + obj.output + "<br />\n" + $("#discusstextarea").html());
      $("#discusstextarea").scrollTop = $("#discusstextarea").scrollHeight;
    });
}


