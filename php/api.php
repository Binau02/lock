<?php
echo "coucou<br>";
var_dump($_POST);
if (!empty($_POST['data'])) {
  $data = $_POST['data'];
  // $fname = ; //generates random name

  // $file = fopen("upload/" . $fname, 'w'); //creates new file
  // fwrite($file, $data);
  // fclose($file);
}
?>