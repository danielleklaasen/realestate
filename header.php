<?php // Start the session

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

?>

<header id="mainHeader">
    <div class="wrapper">
        <a href="index.php"><h1 id="main-logo" class="main-logo">Real estate</h1></a>
        <nav id="navigation">
            <?php

            if (!isset($_SESSION["jUser"])) { //if there is NO USER then show this menu:
                ?>

                <a id="login-button" href="javascript:void(0)">Login</a>
                <a id="register-button" href="javascript:void(0)">Register</a>
                <?php
            } else { //if there is a USER then show this menu:
                ?>
                <a id="logout-button" href="javascript:void(0)">Logout</a>
                <a id="dashboard-button" href="javascript:void(0)">Dashboard</a>
                <?php
            }
            ?>
            <a id="menu-button" href="javascript:void(0)">Menu </a>
        </nav>
    </div>
</header>
