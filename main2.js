window.mainobj = [];

var audio = new Audio();


var recognition = new webkitSpeechRecognition();
recognition.lang = "en";
recognition.onresult = function(event) {
  if (event.results.length > 0) {
    $('#usertext').val(event.results[0][0].transcript);
    process();
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
      
      //$('#audioanswer').attr("src", obj.ttsvoice_mp3file);
      //$('#audioanswer').trigger('load');
      //$('#audioanswer').trigger('play');
      
      //audio.setAttribute("src", obj.ttsvoice_mp3file);
      audio.setAttribute("src", "http://translate.google.com/translate_tts?tl=en&q="+encodeURIComponent(obj.output));
      audio.load();
      audio.play();
      
      $("#cleverbotthink").fadeOut();  
      $("#discusstextarea").html( "<span style=\"color:#CC6633\">Bot</span>: " + obj.output + "<br />\n" + $("#discusstextarea").html());
      $("#discusstextarea").scrollTop = $("#discusstextarea").scrollHeight;
    });
}


