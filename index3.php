<!doctype html>
<html>
<head>
<title>speak cleverbot</title>
<script src="jquery.js"></script>
<script src="main3.js?<?php echo time(); ?>"></script>
<link rel="stylesheet" type="text/css" media="all" href="css/page.css"/>
</head>
<body>
<div>
  
  </head>
  <body>

	<div class="container">
	
	
		<div class="sixteen columns">
			<h1 class="remove-bottom" style="margin-top: 40px">Speak with cleverbot</h1>
			<h5></h5>
			<hr/>
		</div>
		
		<div style="width: 1030px;">

      <div class="clear"></div>
      <div style="height: 40px;">
        <div id="cleverbotthink" style="display:none;">
          <div style="float: left;font-size: 16px;">Cleverbot think</div> 
          <div style="float: left;"><img src="images/ajax-loader.gif"></div>
        </div>
      </div>
      <div class="clear"></div>

      <div class="position-table-box">
        
        
        <div name="discusstextarea" id="discusstextarea" style="width: 530px; height: 200px; overflow-y: scroll;"></div>
        <div id="speech-content-mic" class="speech-mic" style="float:left;width: 45px;height: 45px;"></div>
        <div style="float:left;width: 900px;">
          <input type="text" name="usertext" id="usertext" value="" placeholder="Click record button and speak" style="font-size: 20px;width:450px;" onclick="return false;" />
          <!--<input type="button" value="Click to Speak" onclick="recognition.start()" style="font-size:22px;margin:6px;" />-->
        </div>
        <div class="clear"></div>
      
      </div>
      
		</div>
		
		<div class="clear"></div>


  <div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>

	</div><!-- container -->
	
	
	
</div>
</body></html>
