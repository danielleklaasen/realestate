<?php

//http://localhost:8888/WWW/test.php?img0=img11.jpg&img1=img1.jpg&img2=img2.jpg&name=danielle

$aImages = [];

//loop through GET results
foreach($_GET as $query_string_variable => $value) {
    if (0 === strpos($query_string_variable, 'img')) {
        // It starts with 'img'

        array_push($aImages, $value);
    }

}

print_r($aImages);
$sProperty = '{}';
$jProperty = json_decode($sProperty);

for($i = 0; $i < count($aImages); $i++){
    $jProperty->img.$i = "test";
        }


?>