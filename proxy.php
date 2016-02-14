<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//$data = file_get_contents ('http://api.cleverscript.com/csapi?key=nftlxbf36f14c69279137a6b9e663a4df224c&ttsvoice=serena&'.$_GET['i']);

$data = array(
        'key' => 'nftlxbf36f14c69279137a6b9e663a4df224c'
    );

$j = json_decode($_GET['i']);

foreach($j as $k => $v){
  $data[$k] = $v;
}

$postdata = http_build_query(
    $data
);

$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);

$context  = stream_context_create($opts);

$result = file_get_contents('http://api.cleverscript.com/csapi?ttsvoice=serena', false, $context);

echo $result;