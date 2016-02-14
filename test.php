<?php


$data = file_get_contents ('http://api.cleverscript.com/csapi?key=nftlxbf36f14c69279137a6b9e663a4df224c&input=Hello!&ttsvoice=serena');

echo $data;