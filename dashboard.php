<?php // Start the session

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

?>

<!-- *************************** DASHBOARD ******************************* -->


<div id="dashboard-bg"></div>
<section id="wdw-dashboard">

    <aside>
        <nav class="wrapper">
            <a id="btn-back" href="javascript:void(0)">Back</a>
            <a id="profile-link" href="#card-profile" class="dashboard-link"><i class="fa fa-user" aria-hidden="true"></i></a>
            <a id="settings-link" href="#card-settings" class="dashboard-link"><i class="fa fa-gear" aria-hidden="true"></i></a>

            <?php
            if (isset($_SESSION["jUser"]) && $_SESSION['jUser']->rights>=5) {
                ?>
                <a id="property-link" href="#card-property" class="dashboard-link"><i class="fa fa-home" aria-hidden="true"></i></a>
                <a id="property-add-link" href="#card-property-add" class="dashboard-link"><i class="fa fa-home" aria-hidden="true"></i><i class="fa fa-plus" aria-hidden="true"></i></a>
                <a id="user-link" href="#card-user" class="dashboard-link"><i class="fa fa-users" aria-hidden="true"></i></a>
                <?php
            }
            ?>
        </nav>
    </aside>

    <div class="wrapper">
        <div class="space-short"></div>
        <h1>Welcome</h1>

        <div id="card-profile" class="card">
            <h2><i class="fa fa-user" aria-hidden="true"></i> My profile</h2>
            <div class="content">

                <div class="left">
                    <!--<p>Profile picture</p>-->
                    <p>Name</p>
                    <p>Email-address</p>
                    <p>New password</p>
                    <p>Confirm password</p>
                </div>
                <div class="right">
                    <input>
                    <input type="text" value="example@email.com">
                    <input>
                    <input>
                </div>

            </div>

        </div>

        <div id="card-settings" class="card">
            <h2> <i class="fa fa-gear" aria-hidden="true"></i> Settings</h2>
            <div class="flex-wrapper">
                <button class="button3">Sign up for newsletter</button>
                <button class="button4">Delete my account</button>
            </div>
        </div>


        <?php
        if (isset($_SESSION["jUser"]) && $_SESSION['jUser']->rights>=5) {
        ?>

            <div id="card-property" class="card">
                <div class="flex-row">
                    <h2> <i class="fa fa-home" aria-hidden="true"></i> Properties</h2>
                </div>
                <div class="flex-row">
                    <p><strong>Address</strong></p>
                    <p></p>
                </div>
            </div>

            <div id="card-property-add" class="card">
                <h2> <i class="fa fa-home" aria-hidden="true"></i><i class="fa fa-plus" aria-hidden="true"></i> Add property</h2>

                <form id="form-add-property">
                    <div id="locationField">
                        <input id="autocomplete" type="text" placeholder="Address">
                    </div>
                    <input id="new-price"  type="text" placeholder="Price">
                    <input id="new-rooms"  type="text" placeholder="Number of rooms">
                    <input id="new-size"  type="text" placeholder="Size in m2">



                    <div id="upload-images">

                        <div>
                            <img class="preview-image" src="img/preview-xs.jpg" alt="preview-image" />
                            <input type="file" name="file-0" class="upload-file">
                        </div>

                    </div>


                    <button type="submit" class="button3"><i class="fa fa-floppy-o" aria-hidden="true"></i>Save new property</button>
                </form>

            </div>

            <?php
            if (isset($_SESSION["jUser"]) && $_SESSION['jUser']->rights>=10) {
                ?>
                <div id="card-user" class="card">
                    <h2><i class="fa fa-users" aria-hidden="true"></i> Users</h2>
                    <div class="flex-row">
                        <p><strong>Email address</strong></p>
                        <p><strong>Rights</strong></p>
                        <p></p>
                    </div>
                </div>

                <?php
            }
        }
        ?>

        <div class="space"></div>

    </div>






</section>

<!-- *************************** / END DASHBOARD ******************************* -->