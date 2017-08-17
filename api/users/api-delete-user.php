<?php
//gets id
$sUserId = $_GET['id'];

//read file
$sajUsers = file_get_contents("users.txt"); //only txt

//convert text into object
$ajUsers = json_decode($sajUsers);

//loop through each property and check if ID matches
//will read the whole array, object for object. break when found.

foreach ($ajUsers as $key=>$jUser){
    if($sUserId == $key){
        array_splice($ajUsers, $key, 1);
        break;
    }
}

//convert array back to text
$sajUsers = json_encode($ajUsers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

//save to file users.txt
file_put_contents("users.txt", $sajUsers);

echo '{"status":"ok"}';

?>




