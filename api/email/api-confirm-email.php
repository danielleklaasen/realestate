<?php

$sConfirmEmailMessage = "";

if(isset($_GET['id']) && $_GET['id']!=""){
    $sId = $_GET['id'];


//read file
    $ajUsers = [];
    $sajUsers = file_get_contents("api/users/users.txt"); //only txt
    if( $sajUsers != null ){
        $ajUsers = json_decode($sajUsers);
        if( !is_array($ajUsers ) ){
            $ajUsers = [];
        }
    }

    foreach($ajUsers as $jUser) { //foreach element in $arr
        if($sId == $jUser->id){
            $iActive = $jUser->active;
            if($iActive==0){
                $jUser->active = 1;
                $sConfirmEmailMessage = "Your account is now activated.";

            }else{
                $sConfirmEmailMessage = "Your account is already activated.";
            }
            break;
        }else{
            $sConfirmEmailMessage = "Your account is not found.";
        }
    }

    //json_encode
    $sajUsers = json_encode($ajUsers, JSON_PRETTY_PRINT| JSON_UNESCAPED_UNICODE );

    //store file back on server
    file_put_contents("api/users/users.txt", $sajUsers);
}
?>