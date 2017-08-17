<?php
$bFirstUser = false;

//read file
$ajUsers = [];
$sajUsers = file_get_contents("users.txt"); //only txt
if( $sajUsers != null ){
    $ajUsers = json_decode($sajUsers);
    if( !is_array($ajUsers ) ){
        $ajUsers = [];
    }
}else{
    $bFirstUser = true;
}

if(isset($_GET['id']) && $_GET['id']!=""){
    //EDIT USER
    $sUserId = $_GET['id'];
    $sUserRights = $_GET['rights'];

    $iUserRights = (int)$sUserRights;
    //has id
    //edit user based on id

    //loop through each user and check if ID matches
    //will read the whole array, object for object

    foreach ( $ajUsers as $key=>$jUser ){
        if( $sUserId == $key ){
            //update rights
            $jUser->rights = $iUserRights;
            //stop looping
            break;
        }
    }

}else{
    //no user id
    //CREATE USER

    $sEmail = $_GET['email'];

    //check is email exists in db
    foreach($ajUsers as $jUser) { //foreach element in $arr
        if($sEmail == $jUser->email){
            //email matches email in database
            echo '{"status":"error", "message":"E-mail address is already registered. Try to login."}';
            exit;
        }
    }

    $sPassword = $_GET['password'];

    $sUniqueId = uniqid();

    $regexEmail = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
    $validateEmail = preg_match($regexEmail, $sEmail);

    $regexPassword = '/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/';
    $validatePassword = preg_match($regexPassword, $sPassword);

    // validate email and password minimal 5 characters
    if( $validatePassword == 0  || $validateEmail == 0){
        echo '{"status":"error", "message":"Error. Please try again."}';
        exit;
    }

    // SET UP EMAIL
    $sUrl = 'http://www.danielleklaasen.com/KEA/realestate/index.php?id='.$sUniqueId;
    $subject = "Confirm your e-mail";

    $msg = file_get_contents('../email/api-email.php', true);
    $placeholder = '{{url}}';
    $finalMsg = str_replace($placeholder, $sUrl, $msg);

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <info@realestate.com>' . "\r\n";

    //if the email gets send make a new user
    if(mail($sEmail,$subject,$finalMsg,$headers)){
        //create a JSON object for the user
        $sUser = '{}';
        $jUser = json_decode($sUser);
        //give property unique id
        $jUser->id=$sUniqueId;
        //add address to json property
        $jUser->email=$sEmail;
        //add price
        $jUser->password=$sPassword;
        //not activated yet, should be done by email confirmation
        $jUser->active=0;

        //add rights 10= super admin. 5=admin. 1= user 0 = unlogged user
        if ($bFirstUser){
            $jUser->rights=10;
            $bFirstUser=false;
        }else{
            $jUser->rights=1;
        }

        //store jProperty with new id, address and price in ajProperties array
        array_push($ajUsers,$jUser);
    }
}

//json_encode
$sajUsers = json_encode($ajUsers, JSON_PRETTY_PRINT| JSON_UNESCAPED_UNICODE );

//store file back on server. or create if not existign ???
file_put_contents("users.txt", $sajUsers);

echo '{"status":"ok"}';

?>