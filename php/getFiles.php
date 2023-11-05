<?php

$data = scandir("../saves/Philippe/template");




if (isset($data)){
  print_r(json_encode($data));
}

?>