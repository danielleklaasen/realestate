<?php // Start the session

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

?>


<nav id="navigation-overlay" class="navigation-overlay overlay">
    <a class="close-button" href="javascript:void(0)">
       <div class="close white">
        </div>
    </a>
    <h3 class="disabled">Properties</h3>
    <a href="#" class="sub">All properties</a>
    <a href="#" class="sub">Most viewed</a>
    <a href="#" class="sub">Your recent views</a>
    <a id="about" href="javascript:void(0)">About</a>
    <a id="contact" href="javascript:void(0)">Contact</a>
    <div class="mobile-buttons">
        <?php
        if (!isset($_SESSION["jUser"])) {
            ?>

            <!--<a id="login-button" href="javascript:void(0)">Login</a>-->
            <a id="login-mobile" href="javascript:void(0)">Login</a>
           <!-- <a id="register-button" href="javascript:void(0)">Register</a>-->
            <a id="register-mobile" href="javascript:void(0)">Register</a>

            <?php
        } else {
            ?>
            <a id="logout-mobile" href="javascript:void(0)">Logout</a>
            <a id="dashboard-mobile" href="javascript:void(0)">Dashboard</a>
            <?php
        }
        ?>
    </div>
</nav>