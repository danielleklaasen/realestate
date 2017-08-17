<?php


$uploads_dir = 'uploads';

for($i=0 ; $i<count($_FILES) ; $i++){

    $tmp_name = $_FILES["file-".$i]["tmp_name"];
    $name = $_FILES["file-".$i]["name"];

    move_uploaded_file( $tmp_name , "$uploads_dir/$name" );
}

$jFiles = json_encode($_FILES);


echo $jFiles;

?>