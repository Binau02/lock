<?php

$temp = scandir("../saves/Philippe/template");
$temp2 = range(2, count($temp)-1, 2);

$data = [];
for ($i = 0; $i < count($temp2); $i++) {
  array_push($data, $temp[$temp2[$i]]);
}



if (isset($data)){
  print_r(json_encode($data));
}

?>