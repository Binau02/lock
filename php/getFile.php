<?php
// echo "coucou<br>";
// var_dump($_POST);

$fname = $_POST["name"];
$fname = $_GET["name"];
// var_dump($_GET["name"]);
$data = file_get_contents("../saves/Philippe/template/" . $fname);


if (isset($data)){
  print_r(json_encode($data));
}

?>