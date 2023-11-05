<?php
echo "coucou";
$test = [1, 2, 3];
var_dump($test);
if (!empty($_POST['data'])) {
  $data = $_POST['data'];
  var_dump($_POST);
  // $fname = ; //generates random name

  // $file = fopen("upload/" . $fname, 'w'); //creates new file
  // fwrite($file, $data);
  // fclose($file);
}
?>