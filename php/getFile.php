<?php
// echo "coucou<br>";
// var_dump($_POST);

$fname = $_POST["name"];
$fname = $_GET["name"];
var_dump($_GET);
$data = file_get_contents($fname);


if (isset($data)){
  print_r(json_encode($data));
}

?>