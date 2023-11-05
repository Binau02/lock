<?php

$data = scandir("../saves/Philippe/template");
$data = range(2, count($data), 2);



if (isset($data)){
  print_r(json_encode($data));
}

?>