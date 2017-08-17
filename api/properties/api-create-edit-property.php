<?php

//require validation library
require_once '../../vendor/autoload.php';
use Respect\Validation\Validator as v;

$sPropertyAddress = $_GET['address'];
$sPropertyPrice = $_GET['price'];

//read file
$ajProperties = [];
$sajProperties = file_get_contents("properties.txt"); //only txt
if( $sajProperties != null ){
    $ajProperties = json_decode($sajProperties);
    if( !is_array($ajProperties ) ){
        $ajProperties = [];
    }
}

if(isset($_GET['id']) && $_GET['id']!=""){
    //EDIT PROPERTY
    $sPropertyId = $_GET['id'];

    //has id
    //edit property based on id

    //loop through each property and check if ID matches
    //will read the whole array, object for object

    foreach ( $ajProperties as $key=>$jProperty ){
        if( $sPropertyId == $key ){
            //update the address
            $jProperty->address = $sPropertyAddress;
            //update the price
            $jProperty->price = $sPropertyPrice;
            //stop looping
            break;
        }
    }
}else{
    //no property id
    //CREATE PROPERTY
    $sCity = $_GET['city'];
    $sZipcode = $_GET['zipcode'];
    $sLat = $_GET['lat'];
    $sLng = $_GET['lng'];
    $sRooms = $_GET['rooms'];
    $sSize = $_GET['size'];

    $aImages = [];

    //loop through GET results
    foreach($_GET as $query_string_variable => $value) {
        if (0 === strpos($query_string_variable, 'img')) {
            // It starts with 'img'
            array_push($aImages, $value);
        }

    }


    $priceValidation = v::numeric()->validate($sPropertyPrice); //only numbers
    $addressValidation = $is_alnum = v::charset(['UTF-8'])->length(5, 100)->validate($sPropertyAddress); //length 5 - 50
    if($priceValidation && $addressValidation){
        //data is valid
        $sUniqueId = uniqid();

       /* if (empty($_GET['img'])){
            $sPropertyImg = "img/default.png";
        }else{
            $sPropertyImg = ($_GET["img"]);
        }*/

        //create a JSON object for the property
        $sProperty = '{}';
        $jProperty = json_decode($sProperty);
        //give property unique id
        $jProperty->id=$sUniqueId;
        //add address to json property
        $jProperty->address=$sPropertyAddress;
        //add price
        $jProperty->price=$sPropertyPrice;

        //$jProperty->img=$sPropertyImg;

        $jProperty->city=$sCity;
        $jProperty->zipcode=$sZipcode;
        $jProperty->lat=$sLat;
        $jProperty->lng=$sLng;
        $jProperty->rooms=$sRooms;
        $jProperty->sizem2=$sSize;
        $jProperty->img=$aImages;
        /*for($i = 0; $i < count($aImages); $i++{
            $jProperty->img = "test";
        }*/

        //store jProperty with new id, address and price in ajProperties array
        array_push($ajProperties,$jProperty);
    }else{
        //not valid
        echo '{"status":"error","message":"Data is not valid."}';
        exit;

    }




}


//json_encode
$sajProperties = json_encode($ajProperties, JSON_PRETTY_PRINT| JSON_UNESCAPED_UNICODE );

//store file back on server. or create if not existign ???
file_put_contents("properties.txt", $sajProperties);

echo '{"status":"ok"}';

?>