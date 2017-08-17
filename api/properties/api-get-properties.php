<?php

$iLastPropertyId = 0;
$ajProperties = [];

//store content in sajPropertiesDatabase and convert to JSON
$sajPropertiesDatabase= file_get_contents( "properties.txt" );
$ajPropertiesDatabase = json_decode($sajPropertiesDatabase);
if( !is_array($ajPropertiesDatabase ) ){
    echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
    exit;
}

// SUCCESS

$ajPropertiesToClient = [];


//IF A SPECIFIC ID IS REQUESTED, ONLY ECHO OUT THAT, EXIT
if(isset($_GET['id']) && $_GET['id']!=""){
//THERE IS AN ID, SHOW FOR EDIT WINDOW

    foreach( $ajPropertiesDatabase as $key=>$jProperty){
        if($key == $_GET['id']){
            array_push( $ajPropertiesToClient, $jProperty);
        }
    }

}else{
    foreach( $ajPropertiesDatabase as $key=>$jProperty){

        if($key >= $iLastPropertyId )
        {
            // only when not found in iLastPropertyId:
            // add to array
            // update iLastPropertyID
            array_push( $ajPropertiesToClient, $jProperty);
            $iLastPropertyId = $key;
        }
    }


}

$sajPropertiesToClient = json_encode( $ajPropertiesToClient , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

echo $sajPropertiesToClient;



?>