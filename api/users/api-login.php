<?php
session_start();

$sEmail = $_GET['email'];
$sPassword = $_GET['password'];

$sajUsers = file_get_contents( "users.txt" );
$ajUsers = json_decode( $sajUsers );
//connect to database and received data
for($i = 0; $i < count($ajUsers); $i++){
    if( $sEmail == $ajUsers[$i]->email){
        if($sPassword == $ajUsers[$i]->password){
            $_SESSION['jUser'] = $ajUsers[$i]; //ram
            echo '{"status":"ok","rights":"'.$ajUsers[$i]->rights.'"}';
            break;
        }else{
            echo '{"status":"error"}';
        }

    }
}


?>

