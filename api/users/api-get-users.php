<?php

$iLastUserId = 0;
$ajUsers = [];

//store content in sajPropertiesDatabase and convert to JSON
$sajUsersDatabase= file_get_contents( "users.txt" );
$ajUsersDatabase = json_decode($sajUsersDatabase);
if( !is_array($ajUsersDatabase ) ){
    echo '{"status":"error", "id":"001", "message":"could not work with the database"}';
    exit;
}

// SUCCESS

$ajUsersToClient = [];

foreach( $ajUsersDatabase as $key=>$jUser){

    if($key >= $iLastUserId )
    {
        // only when not found in iLastUseraId:
        // add to array
        // update iLastPropertyID
        array_push( $ajUsersToClient, $jUser);
        $iLastUserId = $key;
    }

}

$sajUsersToClient = json_encode( $ajUsersToClient , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );

echo $sajUsersToClient;

?>