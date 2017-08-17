<?php
//gets id
$sPropertyId = $_GET['id'];

//read file
$sajProperties = file_get_contents("properties.txt"); //only txt

//convert text into object
$ajProperties = json_decode($sajProperties);

//loop through each property and check if ID matches
//will read the whole array, object for object. break when found.

foreach ($ajProperties as $key=>$jProperty){
    if($sPropertyId == $key){
        array_splice($ajProperties, $key, 1);
        break;
    }
}

//convert array back to text
$sajProperties = json_encode($ajProperties, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

//save to file properties.txt
file_put_contents("properties.txt", $sajProperties);

echo '{"status":"ok"}';

?>




