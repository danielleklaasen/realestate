<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION["jUser"])) {
    echo "0";
}else{
    $sUserRights = $_SESSION['jUser']->rights;
    echo $sUserRights;
}

?>