window.mainobj = [];
window.recordmark = 0;

$(document).ready(function() {

  $('#usertext').bind('webkitspeechchange', function() {
    process();
  });
  
  
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
      var obj = jQuery.parseJSON(data);
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


(function($) {

    insertAtCaret = function(areaId,text) {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        
        strPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0,strPos);
        var back = (txtarea.value).substring(strPos,txtarea.value.length);
        txtarea.value=front+text+back;
        strPos = strPos + text.length;
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
        txtarea.scrollTop = scrollPos;
    };

    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    };

    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

})(jQuery);

(function($) {

    $(document).ready(function() {

        try {
            var recognition = new webkitSpeechRecognition();
        } catch(e) {
            var recognition = Object;
        }
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en";

        var interimResult = '';
        var textArea = $('#usertext');
        var textAreaID = 'usertext';

        $('#speech-content-mic').click(function(){
          console.log(window.recordmark);
          if (window.recordmark == 0) {
            startRecognition();
            window.recordmark = 1;
          } else {
            recognition.stop();
            window.recordmark = 0;
          }
        });

        var startRecognition = function() {
            $('#speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
            textArea.focus();
            recognition.start();
        };

        recognition.onresult = function (event) {
            var pos = textArea.getCursorPosition() - interimResult.length;
            textArea.val(textArea.val().replace(interimResult, ''));
            interimResult = '';
            textArea.setCursorPosition(pos);
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    insertAtCaret(textAreaID, event.results[i][0].transcript);
                } else {
                    isFinished = false;
                    insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
                    interimResult += event.results[i][0].transcript + '\u200B';
                }
            }
        };

        recognition.onend = function() {
            $('#speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
            window.recordmark = 0;
            process();
        };
    });
})(jQuery);