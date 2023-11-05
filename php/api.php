<?php
// echo "coucou<br>";
// var_dump($_POST);

$fname = $_POST["name"];
$file = fopen("../saves/Philippe/template/" . $fname, 'w'); //creates new file
fwrite($file, $_POST["file"]);
fclose($file);

$file = fopen("../saves/Philippe/template/" . $fname . ".json", 'w'); //creates new file
fwrite($file, $_POST["json"]);
fclose($file);

?>