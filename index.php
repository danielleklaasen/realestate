<?php
require_once('meta.php');
require_once('header.php');
require_once('navigation.php');
require_once('api/email/api-confirm-email.php');

?>
<div id="confirm-email"><?php echo $sConfirmEmailMessage; ?></div>
<nav id="login-overlay" class="login-overlay overlay">
    <a class="close-button" href="javascript:void(0)">
        <div class="close">
        </div>
    </a>
    <a href="javascript:void(0)" id="facebook-login" class="button2 tooltip"><i class="fa fa-facebook" aria-hidden="true"></i>Login with Facebook<span class="tooltiptext">Not working yet</span></a>
    <p>otherwise</p>
    <form class="formContainer">
        <div id="loginForm">
            <div>
                <input id="txtEmailLogin" type="text" name="Email" class="floating-label">
                <label for="txtEmailLogin">Email</label>
            </div>
            <div>
                <input id="txtPasswordLogin" type="password" name="Password"class="floating-label">
                <label for="txtPasswordLogin">Password</label>
            </div>
            <button id="btnLogin">Login</button>
            <label class="errorMessage">Wrong login, please try again.</label>
        </div>
    </form>
    <p>No account yet?<br/>
        <a href="javascript:void(0)" id="signUp">Sign up here.</a></p>
</nav>

<nav id="register-overlay" class="register-overlay overlay">
    <a class="close-button" href="javascript:void(0)">
        <div class="close">
        </div>
    </a>
    <a href="javascript:void(0)" id="facebook-register" class="button2 tooltip"><i class="fa fa-facebook" aria-hidden="true"></i>Register with Facebook<span class="tooltiptext">Not working yet</span></a>
    <p>otherwise</p>
    <form id="signupForm" class="formContainer">
        <div class="signupForm">
            <div>
                <input id="txtEmail" type="text" name="Email" class="floating-label">
                <label for="txtEmail">Email</label>
            </div>
            <div>
                <input id="txtPassword" type="password" name="Password" class="floating-label">
                <label for="txtPassword">Password</label>
            </div>
            <div>
                <input id="txtPasswordAgain" type="password" name="PasswordAgain" class="floating-label">
                <label for="txtPasswordAgain">Repeat password</label>
            </div>
            <button id="btnSignup" type="submit">Sign up</button>
            <label class="errorMessage">Wrong login, please try again.</label>
        </div>
    </form>
    <p>Already got an account?<br/>
        <a href="javascript:void(0)" id="signIn">Sign in here.</a></p>
</nav>
<!-- *************************** / NAVIGATION ******************************* -->

<div id="message">
</div>

<section id="wdw-landing">
    <div class="header-space"></div>
    <div class="wrapper">
        <h1 class="xs">Hello!</h1>
        <p class="headline">Welcome to Real Estate, an example project for a non-existing real estate agency that offers houses and apartments.</p>
        <div class="button-wrapper">

            <a href="#discover" class="button-outline" data-smooth-scroll>Discover</a>
            <a href="#wdw-home" class="button2" data-smooth-scroll>Search properties</a>
        </div>
    </div>
</section>

<section id="discover" class="discover-grid wrapper">

    <div class="background-image rural image-wrapper">
        <div class="background-image-overlay">
            <a href="javascript:void(0)" class="bigger">Rural</a>
        </div>
    </div>
    <div>
        <div class="background-image city image-wrapper">
            <div class="background-image-overlay">
                <a href="javascript:void(0)">City</a>
            </div>
        </div>
        <div class="background-image business image-wrapper">
            <div class="background-image-overlay">
                <a href="javascript:void(0)">Business</a>
            </div>
        </div>
    </div>

    <!--<div class="background-image rural"></div>
    <div class="background-image city"></div>
    <div class="background-image business"></div>-->
</section>


<section id="wdw-home" ng-app="instantsearch">
    <div ng-controller="instantSearchCtrl">
        <div id="front">
            <div class="wrapper">
                <div class="form-search">
                    <input id="search-field" placeholder="Search on address, zipcode, or city.." ng-model="searchString" type="text" ><i class="fa fa-search" aria-hidden="true"></i>
                </div>
            </div>
        </div>

        <main id="propertiesList" class="wrapper">
            <div ng-attr-id="{{ 'property-' + $index }}" class="property-item clearfix card" ng-repeat="i in items | searchFor:searchString">
                <div class="property-img"  ng-style="{'background-image': 'url(uploads/' + i.img[0] + ')'}"></div>
                <h2>{{i.address}}</h2>
                <p class="property-address-details">{{i.zipcode}} {{i.city}}</p>
                <p class="price">{{i.price}} DKK</p>
                <ul class="property-details">
                    <li>{{i.sizem2}} m²</li>
                    <li>&bull;</li>
                    <li>{{i.rooms}} room(s)</li>
                    </ul>
            </div>
        </main>
    </div>
</section>
<!-- *************************** SINGLE PROPERTY ******************************* -->
<section id="single-property" class="wdw">

    <div class="wrapper">
        <div class="space-short"></div>
       <div id="single-property-close" class="right-align pointer"><span class="close rounded close-animation"></span></div>

        <header>
            <h2 id="single-address">Address</h2>
            <p id="single-city">2100 København Ø</p>
            <p id="single-price">123123 DKK</p>

        </header>

        <!-- JS SLIDER -->
        <div id="single-property-image-slider" class="slider">

               <!-- <img class="slider-image active" src="uploads/img1.jpg" alt />
                <img class="slider-image " src="uploads/img2.jpg" alt />
                <img class="slider-image " src="uploads/img3.jpg" alt />-->

            <!-- CONTROLS ARE HERE -->
            <!-- PREVIOUS -->
            <a class="prev" href="javascript:void(0)">

                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
            <!-- NEXT -->
            <a class="next" href="javascript:void(0)">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
        </div>
        <!-- / END JS SLIDER -->
        <div class="single-property-details">
            <h2>Details</h2>
            <p id="single-size"></p>
            <p id="single-rooms"></p>
        </div>
        <h2>Location on map</h2>
        <iframe id="single-map"
                frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA7ydXfGFcdoPoS7E2caWOFINEaBtoSj48
    &q=loc:{{lat}}+{{lng}}" allowfullscreen>
        </iframe>
        <div class="space-short"></div>
    </div>
</section>
<!-- *************************** / END SINGLE PROPERTY ******************************* -->

<!-- *************************** DASHBOARD ******************************* -->
<?php
require_once('dashboard.php');
?>
<!-- *************************** / END DASHBOARD ******************************* -->

<!-- *************************** EDIT SCREEN FOR DASHBOARD ******************************* -->

<div id="wdw-edit-property">

    <a id="edit-close" class="btn-close" href="javascript:void(0)"></a>

    <h2>Edit</h2>
    <div class="edit-image" style="background-image:url('uploads/default.png')"></div>
    <input type="text" class="address" placeholder="Address" />
    <input type="text" class="price" placeholder="Price" />

    <button id="btn-save-property">Save</button>
</div>

<!-- *************************** / EDIT SCREEN ******************************* -->

<!-- *************************** CONTACT PAGE ******************************* -->
<div id="wdw-page-contact" class="wdw">

    <div class="split-window background-image">
        <div class="background-image-overlay">
        </div>
    </div>

    <div class="split-window">
        <form id="contact-form" class="formContainer">
            <div class="contact-form">
                <h2>Say hello!</h2>
                <div>
                    <input id="contactEmail" type="text" name="Email" class="floating-label">
                    <label for="contactEmail">Your e-mail address</label>
                </div>
                <div>
                    <textarea id="contactMessage" type="text" name="Message" class="floating-label"></textarea>
                    <label for="contactMessage">Message</label>
                </div>
                <button id="btnSignup" type="submit">Send</button>
            </div>
        </form>
    </div>
</div>


<!-- *************************** / END CONTACT PAGE ******************************* -->
<div id="wdw-overlay"></div>




<div id="up-button">
    <img src="img/spaceship.png">
</div>

<?php
require_once('footer.php');
?>
