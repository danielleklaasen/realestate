/********************************************************************************************************

TABLE OF CONTENTS
                                                        line

 1. General elements __________________________________ 49

    .1 Floating labels ________________________________ 56
    .2 Show message to user ___________________________ 98
    .3 Smooth scrolling _______________________________ 118

 2. Navigation ________________________________________ 173

    .1 Changes on scroll ______________________________

 3. Register __________________________________________ 280

 4. Login _____________________________________________ 331

 5. Log out ___________________________________________ 445

 6. Dashboard _________________________________________ 481

 7. Properties ________________________________________ 564

    .1 Create _________________________________________ 571
        .1 Google Maps autocomplete form ______________
    .2 Read
    .3 Update
    .4 Delete

 8. Pages

    .1 Single property
    .2 Contact


 9. User

    .1 Create
    .2 Read
    .3 Update
    .4 Delete

 10. Notifications

 11. Angular search form

 12. JS image slider / slideshow

 ********************************************************************************************************/

/********************************************************************************************************


 1. GENERAL ELEMENTS


 ********************************************************************************************************/

/********************************************************************************************************

 1.1 Floating labels

 ********************************************************************************************************/

/* FORM LABELS FLOAT WHEN INPUT != EMPTY */
//check once immediately, then setInterval
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

//$("#search-field").focus();

function fnCheckInputEmpty() {
    var sAllLabels = $(".floating-label");
    //loop through every element with class .floating-label
    sAllLabels.each(function() {
        var hasValue = $(this).val().length > 0;//Normal
        if(!hasValue){
            if(is_chrome)
            {
                hasValue = $(":-webkit-autofill", this).length > 0;//Chrome
            }

        }
        if (hasValue) {
            $(this).addClass('active');
        }
    });
}

fnCheckInputEmpty();
setInterval(fnCheckInputEmpty, 1000);

$('input.floating-label').blur(function()
{
    if( !$(this).val() ) {
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
});

/********************************************************************************************************

 1.2 Show message to user

 ********************************************************************************************************/

function fnShowMessage(message) {
    $('#message').text(message);
    $('#message').animate({
        top: 0
    }, 550, function(){

        var topValue="-50px";
        $('#message').delay(2000).animate({
            top: topValue
        }, 550);

    });
}

/********************************************************************************************************

 1.3 Smooth scrolling

 ********************************************************************************************************/

$(document).on('click', 'a', function(event){
    var attr = $(this).attr('data-smooth-scroll');
    this.blur();

// For some browsers, `attr` is undefined; for others,
// `attr` is false.  Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top-100
        }, 500);

    }
});

//SMOOTH SCROLLING WITHIN DASHBOARD WINDOW DIV
$('.dashboard-link').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('#wdw-dashboard').animate({
                scrollTop: $('#wdw-dashboard').scrollTop() + target.offset().top-100
            }, 500);
            return false;
        }
    }
});

/********************************************************************************************************


 2. NAVIGATION


 ********************************************************************************************************/

var closeBtn = $('.close-button');
var navOverlay = $('#navigation-overlay');
var bOverlayIsOpen = false;

$(document).on('click', '#menu-button', function(){
    fnOpenMenu();
});

function fnOpenMenu() {
    navOverlay = $('#navigation-overlay');

    $('body').addClass('stop-scrolling');
    navOverlay.addClass('open');
    bOverlayIsOpen = true;
    setTimeout(fnAnimateButton, 1100);
}

function fnAnimateButton() {
    closeBtn = $('.close-button');
    closeBtn.addClass("animated fadeInRight");
}

//when an element of the close button is clicked//
$(document).on('click', '.close-button', function(e){
    fnCloseOverlay(e);
});

$(document).on('click', '.close', function(e){
    fnCloseOverlay(e);
});

$(document).on('click', '.cross', function(e){
    fnCloseOverlay(e);
});

function fnCloseOverlay(e){
    if(bOverlayIsOpen) {
        closeBtn.addClass("fadeOutRight");
        if (e.target.parentNode.parentNode.id == "navigation-overlay" || e.target.parentNode.parentNode.parentNode.id == "navigation-overlay") {
            navOverlay.toggleClass("open");
        }
        if (e.target.parentNode.parentNode.id == "login-overlay" || e.target.parentNode.parentNode.parentNode.id == "login-overlay" || e.target.id == "signUp" || e.target.id == "btnLogin") {
            loginOverlay.toggleClass("open");
        }
        if (e.target.parentNode.parentNode.id == "register-overlay" || e.target.parentNode.parentNode.parentNode.id == "register-overlay" || e.target.id == "signIn"|| e.target.parentNode.id == "register-overlay") {
            registerOverlay.toggleClass("open");
        }
        closeBtn.removeClass("fadeInRight fadeOutRight animated");
        bOverlayIsOpen = false;
        $('body').removeClass('stop-scrolling');
    }
    fnHideErrorMessage();
}

function fnCloseNavigation(){
    navOverlay.removeClass("open");
    bOverlayIsOpen = false;
}
function fnCloseLogin() {

}
function fnCloseRegister() {

}

/********************************************************************************************************

 2.1 Changes on scroll

 ********************************************************************************************************/

var windowHeight = $(window).height();   // Get the window height.

var buttonVisibleBoolean = false;

function fnShowUpButton(){
    $('#up-button').css( "bottom","10px");
    $('#up-button').fadeIn();
    buttonVisibleBoolean=true;
}

function fnHideUpButton(){
    $('#up-button').fadeOut();
    buttonVisibleBoolean=false;
}




$('#single-property').on("scroll", function(){

    if ($(this).scrollTop() > (windowHeight/10) ) {
        //animate close button
        $('.close-animation').addClass('close-scroll');
        console.log("they hating...");
    }else{console.log("they see me scrolling...");

        //close button reset
        $('.close-animation').removeClass('close-scroll');
    }
});

$(window).on("scroll", function () {
    if ($(this).scrollTop() > windowHeight ) {

        if ( buttonVisibleBoolean === false ){
            fnShowUpButton();
        }

    } else {
        fnHideUpButton();
    }

    if ($(this).scrollTop() > (windowHeight/10) ) {
        $('#mainHeader').addClass("scrolling-state");


    } else {
        $('#mainHeader').removeClass("scrolling-state");


    }
}).on("resize", function(){ // If the user resizes the window
    windowHeight = $(this).height(); // you'll need the new height value
});





/* UP BUTTON */

$('#up-button').click(function() {
var bottomValue = "100vh";
    $('#up-button').animate({
        bottom: bottomValue
    },500);

    setTimeout(function(){
        $('html, body').stop().animate({
            scrollTop: 0
        }, 500);
    },200);
});

/********************************************************************************************************


 3. REGISTER


 ********************************************************************************************************/
var registerOverlay = $('#register-overlay');


$(document).on('click', '#register-button', function(e){
    if(e.target.parentNode.className=='mobile-buttons'){
        fnCloseOverlay(e);
    }
    fnOpenSignup();
});

$(document).on('click', '#register-mobile', function(e){
    fnCloseOverlay(e);
    fnOpenSignup();
});

function fnOpenSignup() {
    registerOverlay.toggleClass("open");
    bOverlayIsOpen = true;
    setTimeout(fnAnimateButton, 1100);
    $('body').addClass('stop-scrolling');
}
$("#signupForm").on('submit',(function(e) {
    e.preventDefault();
    fnCreateUser(e);
}));
/* SWITCH SIGNUP LOGIN SCREENS */

$( "#signUp" ).click(function(e) {
    fnSwitchLoginSignup(e);
});
$( "#signIn" ).click(function(e) {
    fnSwitchLoginSignup(e);
});

function fnSwitchLoginSignup(e){
    fnCloseOverlay(e);
    if(e.target.id == "signIn"){
        setTimeout(fnOpenLogin, 700);
    }else{
        setTimeout(fnOpenSignup, 700);
    }

}

/********************************************************************************************************


 4. LOGIN


 ********************************************************************************************************/
var loginOverlay = $('#login-overlay');

$(document).on('click', '#login-button', function(e){
    fnOpenLogin();
});

$(document).on('click', '#login-mobile', function(e) {
    fnCloseOverlay(e);
    fnOpenLogin();
});

function fnOpenLogin(){
    loginOverlay.toggleClass("open");
    bOverlayIsOpen = true;
    setTimeout(fnAnimateButton, 1100);
    $('body').addClass('stop-scrolling');
}

$("#btnLogin").click(function(e){
    e.preventDefault();
    fnLogin(e);
});

function fnLogin(e) {
    var sEmail= $("#txtEmailLogin").val();
    var sPassword = $("#txtPasswordLogin").val();
    //FROM CLASS
    var sUrl = "api/users/api-login.php?email=" + sEmail + "&password=" + sPassword;
    $.get( sUrl, function (sData){
        var errorMessage = "Wrong login, please try again.";
        if (!$.trim(sData)){
            fnShowErrorMessage(errorMessage);
        }else{
            var jData = JSON.parse(sData); //ok error in the key status

            if( jData.status == "ok" ){
                iUserRights = jData.rights;

                fnRefreshLoginElements();
                fnUpdateContentUserRights();
                fnCloseOverlay(e);

                setTimeout(function(){
                    fnShowMessage("You are logged in.");
                },500);
                fnHideErrorMessage();

                $("#txtEmailLogin").val("");
                $("#txtPasswordLogin").val("");

            }else{
                fnShowErrorMessage(errorMessage);
            }
        }
    });
}

function fnRefreshLoginElements(){
    //refreshing header
    $.ajax({
        type: "GET",
        url : 'header.php',
        success : function (sData) {
           $( "#mainHeader" ).replaceWith( sData );
        },
        error : function(){
        }
    });

    $.ajax({
        type: "GET",
        url : 'navigation.php',
        success : function (sData) {
            $( "#navigation-overlay" ).replaceWith( sData );
        },
        error : function(){
        }
    });

    $.ajax({
        type: "GET",
        url : 'dashboard.php',
        success : function (sData) {
            $('#dashboard-bg').remove();
            $( "#wdw-dashboard" ).replaceWith( sData );
        },
        error : function(){
        }
    });
}

function fnShowErrorMessage(errorMessage) {
    $('.errorMessage').text(errorMessage);
    $('.errorMessage').animate({
        opacity: 0.95,
        left: 0
    }, 500);
}

function fnHideErrorMessage(){
    var sLeftValue= "-100px";
    $('.errorMessage').animate({
        opacity: 0,
        left: sLeftValue
    }, 500);
}

/********************************************************************************************************


 5. LOG OUT


 ********************************************************************************************************/

$(document).on('click', '#logout-button', function(){
    fnLogOut();
    $('#logout-button').blur();
});

$(document).on('click', '#logout-mobile', function(e){
    fnCloseOverlay(e);
    fnLogOut();
});

function fnLogOut() {
    $.ajax({
        url: "api/users/api-logout.php",
        type: "GET",
        contentType: false,
        processData: false,
        cache:false,
        success: function(){
            $('.loggedIn').css('display','none');
            fnShowMessage("You are successfully logged out.");
                fnRefreshLoginElements();
        },
        error: function(){
            fnShowMessage("Oops, something went wrong.");
        }
    });
}

/********************************************************************************************************


 6. DASHBOARD


 ********************************************************************************************************/
$(document).on('click', '#dashboard-button', function(){
    setTimeout(function(){
        document.body.scrollTop = 0; // For Chrome, Safari and Opera
        document.documentElement.scrollTop = 0; // For IE and Firefox
    },400);
    fnOpenDashboard();
});

$(document).on('click', '#dashboard-mobile', function(e){
    fnCloseOverlay(e);
    fnOpenDashboard();
});

function fnOpenDashboard() {
    $('body').addClass('stop-scrolling');
    $('#dashboard-bg').fadeIn();
    $('#wdw-dashboard').fadeIn(500, function(){
        $('#wdw-dashboard aside').animate({
            top:0
        });
    });
}

$(document).on('click', '#btn-back', function(e){
   fnCloseDashboard();
});

function fnCloseDashboard() {
    $('body').removeClass('stop-scrolling');
    var sAsideValue = "-50px";
    $('#wdw-dashboard aside').animate({top:sAsideValue},function(){
        $('#wdw-dashboard').fadeOut();
        $('#dashboard-bg').fadeOut();
    });
}

$(document).on('click', '.user-edit', function(e) {
    if($(this).hasClass('open')){
        $(this).removeClass('open');
        $(this).siblings('.user-edit-options').fadeOut();
    }else{
        $(this).addClass('open');
        $(this).siblings('.user-edit-options').fadeIn();
    }

    //close when click outside user edit window
    $('html').click(function(e) {
        if(!$(e.target).hasClass('user-edit-options') && !$(e.target).hasClass('fa') && !$(e.target).hasClass('user-edit') )
        {
            //clicked element doesn't have class user-edit-options
                $('.user-edit-options').fadeOut();
                 $('.user-edit').removeClass('open');

        }
    });
});

$("#wdw-dashboard").on("scroll", function () {
    fnAddLinkInViewport("card-profile", "profile-link");
    fnAddLinkInViewport("card-user", "user-link");
    fnAddLinkInViewport("card-property", "property-link");
    fnAddLinkInViewport("card-property-add", "property-add-link");
    fnAddLinkInViewport("card-settings", "settings-link");
});

function fnAddLinkInViewport(cardInViewport, LinkToBeActive) {
    var iCardInViewport = $('#'+cardInViewport+':in-viewport(200)').isInViewport().length;

    if(iCardInViewport === 1 ){
        //in viewport
        $('#'+LinkToBeActive).addClass('active');
    }else{
        $('#'+LinkToBeActive).removeClass('active');
    }
}

/********************************************************************************************************


 7. PROPERTIES


 ********************************************************************************************************/

/********************************************************************************************************

 7.1 Create properties

 ********************************************************************************************************/

var iElementNumber = 0;

$("#upload-file").change(function(){
    fnShowPreviewImage(this);
});



$(document).on('change' , '[type="file"]' , function(){
    fnShowPreviewImage(this);
});


function fnRemovePreviewImage() {
    $('#upload-file').val('');
    $('#preview-image').attr('src', 'img/preview-xs.jpg');
}

function fnShowPreviewImage(that) {

    var preview = new FileReader();
    preview.readAsDataURL( that.files[0] );
    var self = that;
    preview.onload = function(event){
        $(self).siblings(".preview-image").attr("src", event.target.result);
    };
    fnCreateImageInput();
}

function fnCreateImageInput() {
    iElementNumber++;
    var sDiv = '<div>\
                     <img class="preview-image" src="img/preview-xs.jpg" alt="preview-image" />\
                   <input type="file" name="file-'+iElementNumber+'" class="upload-file">\
                  </div>';
    $("#upload-images").append(sDiv);
}

$("#form-add-property").on('submit',(function(e) {
    e.preventDefault();
    fnUploadImage(this);
}));

function fnUploadImage(that) {
    $.ajax({
        url: "upload.php",
        type: "POST",
        data:  new FormData(that),
        contentType: false,
        processData: false,
        cache:false,
        success: function(sData){
            fnCreateProperties(sData);
        },
        error: function(){
            swal({
                title: "Oops...",
                text: "Error uploading the file!",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#263238"
            });
        }
    });
}

function fnCreateProperties(sData){
    var ajData = JSON.parse(sData);

    //counting size of json object
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // Get the size of an object
    var size = Object.size(ajData);


    //make array for image names
    var aImageNames = [];

    //size minus 1 because last image is always empty.
    for(var i = 0; i<size-1; i++){
        var sName = ajData['file-'+i].name;
        aImageNames.push(sName);
    }



    var newAddress = $( "#autocomplete" );
    var newPrice = $( "#new-price" );
    var newRooms = $( "#new-rooms" );
    var newSize= $( "#new-size" );
    var newAddressValue = newAddress.val();
    var newPriceValue = newPrice.val();
    var newRoomsValue = newRooms.val();
    var newSizeValue = newSize.val();

  /*  var sImgName = sData;
    if(!sImgName){
        sImgName = "default.png"
    }
    var imgUrl = "uploads/" + sImgName;*/

    //validate to be only numbers: price, rooms, size

    var onlyNumbers = /^[0-9]+$/;
    var validationPrice = newPriceValue.match(onlyNumbers); //match email address to regex, null is invalid.
    var validationRooms = newPriceValue.match(onlyNumbers); //match email address to regex, null is invalid.
    var validationSize = newPriceValue.match(onlyNumbers); //match email address to regex, null is invalid.

    if(newPriceValue == "" || newRoomsValue == "" || newSizeValue == "" || newAddressValue == "" || sStreetNumber == null || validationPrice == null || validationRooms == null || validationSize == null || aImageNames.length < 3){
        var sMessage = "";

        if(aImageNames.length < 3){
            sMessage += "Three images required. ";
        }

        if(newAddressValue == "") {
            newAddress.addClass('error');
        }

        if(newPriceValue == "") {
            newPrice.addClass('error');
        }
        if(validationPrice == null){
            sMessage += "Price should only consists of numbers. ";
        }

        if(sStreetNumber == null){
            newAddress.addClass('error');
            //swal("Please enter a street number");
            sMessage += "Please enter a street number. ";
        }
        if(newRoomsValue == "") {
            newRooms.addClass('error');
        }
        if(validationRooms == null){
            sMessage += "Rooms should only consists of numbers. ";
        }
        if(newSizeValue == "") {
            newSize.addClass('error');
        }
        if(validationSize == null){
            sMessage += "Size should only consists of numbers. ";
        }

        if( sMessage != ""){
            //Message is not empty
            swal({
                title: sMessage,
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#263238",
                confirmButtonText: "Yes",
                closeOnConfirm: true
            });
        }

    }else{
        //all fields are filled
        newAddress.removeClass('error');
        newPrice.removeClass('error');
        newRooms.removeClass('error');
        newSize.removeClass('error');

        console.log(aImageNames);
        var sImageUrl = "";
        for(var i = 0; i<aImageNames.length; i++){
            sImageUrl += "&img" + i + "=" + aImageNames[i];
        }


        var sUrlCreate= "api/properties/api-create-edit-property.php?address="+ sStreetAddress + "&price=" + newPriceValue + "&city=" + sCity + "&zipcode=" + sZipCode + "&lat=" + sLat + "&lng=" + sLng + "&rooms=" + newRoomsValue + "&size=" + newSizeValue + sImageUrl;
        //api/properties/api-create-edit-property.php?address=Drejøgade 35&price=123123123&city=København Ø&zipcode=2100&lat=55.7119921&lng=12.570981399999937&rooms=5&size=23&img0=img11.jpg&img1=img1.jpg&img2=img2.jpg
        $.getJSON( sUrlCreate, function( jData ){

            if( jData.status == "ok" ){
                fnShowMessage("Your property is added!");

                //remove data from upload

                $( "#form-add-property" ).animate({
                    opacity: 0
                }, 500, function() {
                    // Animation complete.
                    newAddress.val('');
                    newPrice.val('');

                    fnRemovePreviewImage();

                    $('#form-add-property').animate({
                        opacity: 1
                    }, 500);

                });

            }else{
                fnShowMessage(jData.message);
            }
        });
    }
}

/********************************************************************************************************

 7.1.1 Google Maps autocomplete form

 ********************************************************************************************************/
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var sStreetName, sStreetNumber, sCity, sZipCode, sStreetAddress, sLat, sLng;
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    sLat = place.geometry.location.lat();
    sLng = place.geometry.location.lng();
    fnParseGoogleResponse(place.address_components);
    if(sStreetNumber){
        sStreetAddress = sStreetName + " " + sStreetNumber;
    }else{
    }
}

function fnParseGoogleResponse(components) {
    _.each(components, function(component) {
        _.each(component.types, function(type) {
            if (type === 'route') {
                sStreetName = component.long_name;
            }
            if (type === 'street_number') {
                sStreetNumber = component.long_name;
            }
            if (type === 'locality') {
                //cityname without Ø NV K etc
            }
            if (type === 'country') {
                //country
            }
            if (type === 'postal_code') {
                sZipCode = component.long_name;
            }
            if (type === 'sublocality_level_1') {
                sCity = component.long_name;
            }
        })
    })
}

/********************************************************************************************************

 7.2 Read properties

 ********************************************************************************************************/

function fnAddCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}
var aLoadedProperties = [];
var sUrlProperties = "api/properties/api-get-properties.php";
//connect to server and display all properties
function fnGetProperties(){
    $.get( sUrlProperties, function( sData ){

        if (!$.trim(sData)){
            //sData is empty
            //Don't continue do stuff with sData
        }
        else{
            //sData is NOT empty
            //ready to convert sData to object

            var ajData = JSON.parse(sData);
            for(var i = 0; i < ajData.length; i++){
                var sIdProperty = ajData[i].id;

                if ($.inArray(sIdProperty, aLoadedProperties) != -1) {
                    //the object ID is already in aIdProperties array
                }
                else{
                    var sAddress=ajData[i].address;
                    //new object: add blueprint with data to html
                    var sBlueprint = '<div id="'+i+'"class="flex-row"> ' +
                                        '<p>'+sAddress+'</p> ' +
                                        '<div class="buttons-property"> ' +
                                        '<a class="btn-edit-property" href="javascript:void(0)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> ' +
                                        '<a class="btn-delete-property" href="javascript:void(0)"><i class="fa fa-trash" aria-hidden="true"></i></a> ' +
                                        '</div>';
                    $("#card-property").append( sBlueprint );

                    //add id to array
                    aLoadedProperties.push(sIdProperty);
                }
            }
        }
    });
}

setInterval( function(){
    if(iUserRights>=5){
        fnGetProperties();
    }

}, 2000 );

/********************************************************************************************************

 7.3 Update properties

 ********************************************************************************************************/
var bSaveEnabled = false;

$(document).on( "click", ".btn-edit-property", function(){
    fnEditProperty(this);

});
function fnEditProperty(that){
    var sId= that.parentNode.parentNode.id;

    //show edit window
    $("#wdw-overlay").fadeIn();
    $("#wdw-edit-property").css("display", "flex").hide().fadeIn();
    $('body').addClass('stop-scrolling');

    //add information
    $('#btn-save-property').addClass(sId);

    var sUrlEdit = "api/properties/api-get-properties.php?id=" + sId;
    $.getJSON( sUrlEdit, function( jData ){

        var sAddress = jData[0].address;
        var iPrice = jData[0].price;
        var sImageUrl = jData[0].img;

       // $('#wdw-edit-property .address').attr("placeholder", sAddress);
        $('#wdw-edit-property .address').val(sAddress);
       // $('#wdw-edit-property .price').attr("placeholder", iPrice);
        $('#wdw-edit-property .price').val(iPrice);
        $('#wdw-edit-property .edit-image').css("background-image", 'url('+ sImageUrl +')');

    });

    //close click listeners
    $(document).on( "click", "#wdw-overlay", function(){
        fnCloseEditProperty();
    });

    $(document).on( "click", "#edit-close", function(){
        fnCloseEditProperty();
    });

    $(document).on('focus', '#wdw-edit-property .address', function(){
       bSaveEnabled = true;
    });
    $(document).on('focus', '#wdw-edit-property .price', function(){
        bSaveEnabled = true;
    });
}

function fnCloseEditProperty() {
    if(bSaveEnabled){
        swal({
                title: "DO YOU WANT TO SAVE YOUR CHANGES? ",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#263238",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {

                if (isConfirm) {

                    $("#wdw-overlay").hide();
                    $("#wdw-edit-property").hide();
                    $('body').removeClass('stop-scrolling');
                    fnShowMessage("Your changes are saved!");

                    //connect to db

                } else {
                    //cancel edits
                    $("#wdw-overlay").hide();
                    $("#wdw-edit-property").hide();
                    $('body').removeClass('stop-scrolling');
                }
            });
        bSaveEnabled = false;
        return;
    }{
        $("#wdw-overlay").hide();
        $("#wdw-edit-property").hide();
        $('body').removeClass('stop-scrolling');
    }

}

/* PROPERTIES SAVE */

$(document).on( "click", "#btn-save-property", function(){
    fnSaveProperty(this);
});

function fnSaveProperty(that){

    var sId= that.classList[0];

    var sAddress = $('#wdw-edit-property .address').val();
    var iPrice = $('#wdw-edit-property .price').val();

    var sUrlEdit= "api/properties/api-create-edit-property.php?id=" + sId +"&address=" + sAddress + "&price=" + iPrice;

    $.getJSON( sUrlEdit, function( jData ){

        if (jData.status=="ok"){
            fnShowMessage("Property is saved!");
            bSaveEnabled = false;
            fnCloseEditProperty();

            //change front-end
            $("#property-"+sId + " h2").text(sAddress);
        }
    });
}

/********************************************************************************************************

 7.4 Delete properties

 ********************************************************************************************************/

$(document).on( "click", ".btn-delete-property", function(){
    fnDeletePropertyDatabase(this);
});

function fnRemoveProperty(that){
    var sId= that.parentNode.parentNode.id;

    $("#"+sId).fadeOut( function() {
        $(this).remove();
    });

    $("#property-"+sId).fadeOut( function() {
        $(this).remove();
    });

}

function fnDeletePropertyDatabase(that){
    swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#263238",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        },
        function(){
            fnShowMessage("Your property is deleted.");
            var sId= that.parentNode.parentNode.id;
            //take the id, put it in the UR L

            var sUrlDelete= "api/properties/api-delete-property.php?id=" + sId;

            $.getJSON( sUrlDelete, function( jData){
                if( jData.status == "ok" ){
                    fnRemoveProperty(that);
                    aIdProperties.splice(sId, 1);
                }
            });
        });
}

/********************************************************************************************************


 8. PAGES


 ********************************************************************************************************/

/********************************************************************************************************

 8.1 Single page property

 ********************************************************************************************************/

$(document).on('click', '.property-item', function(){
    fnHideUpButton();
    fnGetSinglePropertyDetails(this);
});

function fnGetSinglePropertyDetails(that) {
    var sId= that.id;
    var iId = sId.replace('property-','');

    var sUrlEdit = "api/properties/api-get-properties.php?id=" + iId;
    $.getJSON( sUrlEdit, function( jData ){
        fnOpenSingleProperty(jData);
    });
}

function fnOpenSingleProperty(jData){
    $('.slider-image:first-child').addClass('active');
    var sAddress = jData[0].address;
    var iPrice = jData[0].price;
   // var sImageUrl = jData[0].img;
    var sLat = jData[0].lat;
    var sLng = jData[0].lng;
    var sCity = jData[0].city;
    var sZipcode = jData[0].zipcode;
    var sCityInformation = sZipcode + " " + sCity;

    var iSize = jData[0].sizem2;
    var iRooms = jData[0].rooms;

    //set up blueprint for the images
    var sBlueprintImages = "";
    var bSlideLoaded = false;
    //generate <img> with all images and populate blueprint
    for(var i = 0; i < jData[0].img.length; i++){

        //if first time loading pictures
        if (bSlideLoaded === false){
            //populate slider
            if(i === 0){
                //first element
                sBlueprintImages += '<img class="slider-image active" src="uploads/'+ jData[0].img[i] +'" alt />';
            }else{
                //the others
                sBlueprintImages += '<img class="slider-image " src="uploads/'+ jData[0].img[i] +'" alt />';
            }
        }else{
            //pictures are already there
        }

    }

    //add the blueprint on top in the slider
    $('#single-property-image-slider').prepend(sBlueprintImages);

    $('#single-address').text(sAddress);
    $('#single-price').text(iPrice + " DKK");
    $('#single-city').text(sCityInformation);
    $('#single-property').css("display","flex");
    $('#single-size').text(iSize + " m2");
    $('#single-rooms').text(iRooms + " room(s)");
    $('body').addClass('stop-scrolling');

    var sMapSrc = $('#single-map').attr("src");
    var sNewMapSrc = sMapSrc.replace('{{lat}}',sLat);
    var sFinalMapSrc = sNewMapSrc.replace('{{lng}}',sLng);
    $('#single-map').attr("src",sFinalMapSrc);
}

$(document).on('click', '#single-property-close', function(){
    $('#single-property').css("display","none");
    $('body').removeClass('stop-scrolling');
    $('.slider-image').remove();
});


/********************************************************************************************************

 8.2 Contact page

 ********************************************************************************************************/

$(document).on('click', '#contact', function(e){
    fnOpenContactPage();
    fnCloseNavigation();
});

function fnOpenContactPage() {
    //add style to header nav
    $('#mainHeader').addClass('dark');
    $('body').addClass('stop-scrolling');
    $("#wdw-page-contact").css("display","flex");
}


/********************************************************************************************************

 9. USERS

 ********************************************************************************************************/
/********************************************************************************************************

 9.1 Create user

 ********************************************************************************************************/

function fnEmailValidation() {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailInput = $("#txtEmail");
    var sEmail = emailInput.val();
    var emailValidation = sEmail.match(mailFormat); //match email address to regex, null is invalid.

    if (sEmail == "" || emailValidation == null) {
        emailInput.addClass('error');
        return false;

    }else{
        //email is valid
        emailInput.removeClass('error');
        return true;
    }
}

function fnPasswordValidation() {
    // 6 - 16 characters, minimum 1 number
    var passwordFormat = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var passwordInput = $("#txtPassword");
    var passwordRepeatInput = $("#txtPasswordAgain");
    var sPassword = passwordInput.val();
    var sPasswordConfirm = passwordRepeatInput.val();

    var passwordValidation = sPassword.match(passwordFormat); //match password address to regex, null is invalid.

    if (sPassword == "" || passwordValidation == null || sPasswordConfirm!=sPassword ) {

        if(sPassword == "" || passwordValidation == null ) {
            passwordInput.addClass('error');
            fnShowErrorMessage("Password should be 6 - 16 characters with at least one number.")
        }else{
            passwordInput.removeClass('error');
        }

        if(sPasswordConfirm!=sPassword){
            passwordRepeatInput.addClass('error');
        }else{
            passwordRepeatInput.removeClass('error');
        }

        return false;
    }else{ //password is valid

        passwordInput.removeClass('error');
        passwordRepeatInput.removeClass('error');
        fnHideErrorMessage();

        return true;
    }
}

function fnCreateUser(e){
    var validation = false;

    var emailInput = $("#txtEmail");
    var passwordInput = $("#txtPassword");
    var passwordRepeatInput = $("#txtPasswordAgain");
    var sEmail = emailInput.val();
    var sPassword = passwordInput.val();

    var emailValidation = fnEmailValidation();
    var passwordValidation = fnPasswordValidation();

    if(emailValidation && passwordValidation){
        validation = true;
    }

    if(validation){

        var sUrlCreateUser= "api/users/api-create-edit-user.php?email="+ sEmail + "&password=" + sPassword;

        $.getJSON( sUrlCreateUser, function( jData ){

            if( jData.status == "ok" ){
                fnShowMessage("A confirmation e-mail is send to "+ sEmail);
                fnCloseOverlay(e);

                //remove data from form
                emailInput.val('');
                emailInput.removeClass('active');
                passwordInput.val('');
                passwordInput.removeClass('active');
                passwordRepeatInput.val('');
                passwordRepeatInput.removeClass('active');
            }else{
                var sMessage = jData.message;
                console.log(jData);
                fnShowMessage(sMessage);
            }

        });
    }
}
//show confirmation of email after going to site via email button
var sConfirmEmailMessage = $('#confirm-email').text();
if(sConfirmEmailMessage){
    swal({
        title: sConfirmEmailMessage,
        confirmButtonColor: "#263238"
    });
}

/********************************************************************************************************

 9.2 Read user

 ********************************************************************************************************/

var iUserRights = 0;

//this is totally weird, only works like that, otherwise css loads before js
setTimeout(function(){
    fnGetUserRights();
},0);

function fnGetUserRights(){
    $.ajax({
        url:  "api/users/api-user-rights.php"
    })
        .done(function( sData ) {
            iUserRights = Number(sData);
            fnUpdateContentUserRights();
        });
}

function fnUpdateContentUserRights() {
    if(iUserRights>=5){
        $('.loggedIn').fadeIn();
    }else{
        $('.loggedIn').css('display','none');
    }
}

var sUrlUsers = "api/users/api-get-users.php";
var aIdUsers = [];

function fnGetUsers(){
    if (iUserRights===10) {
        $.get(sUrlUsers, function (sData) {

            var ajData = JSON.parse(sData);
            for(var i = 0; i < ajData.length; i++){
                var sIdUser = ajData[i].id;

                if ($.inArray(sIdUser, aIdUsers) != -1) {
                    //the object ID is already in aIdUsers array

                }else{
                    var sEmail = ajData[i].email;
                    var iRights = ajData[i].rights;

                    if(iRights === 10){
                        var sRights = "Super admin";
                    }
                    if(iRights === 5){
                        var sRights = "Admin";
                    }
                    if(iRights === 1){
                        var sRights = "User";
                    }
                    var sBlueprint = '<div id="user-' + i + '" class="flex-row"> <p>'+ sEmail +'</p> <p class="user-rights">'+ sRights +'</p> <p class="user-edit"><i class="fa fa-gear" aria-hidden="true"></i> <i class="fa fa-sort-down" aria-hidden="true"></i></p> <div class="user-edit-options"> <ul> <li class="edit-super-admin">Make super admin</li> <li class="edit-admin">Make admin</li> <li class="edit-user">Make user</li> <li class="user-delete">Delete</li> </ul> </div> </div>';

                    $("#card-user").append( sBlueprint );

                    aIdUsers.push(sIdUser);
                }
            }

        });
    }
}

fnGetUsers();

setInterval(function(){
    fnGetUsers();
}, 2000);

/********************************************************************************************************

 9.3 Edit user

 ********************************************************************************************************/

$(document).on("click", '.edit-super-admin', function(){
    var iRights = 10;
    fnEditUser(this, iRights);
});

$(document).on("click", '.edit-admin', function(){
    var iRights = 5;
    fnEditUser(this, iRights);
});

$(document).on("click", '.edit-user', function(){
    var iRights = 1;
    fnEditUser(this, iRights);
});

function fnEditUser(that, rights){
    var sId= that.parentNode.parentNode.parentNode.id;
    var iId = sId.replace('user-','');
    var sUrlEditUser= "api/users/api-create-edit-user.php?id=" + iId +"&rights=" + rights;

    if(rights === 10){
        var sRights = "Super admin";
    }
    if(rights === 5){
        var sRights = "Admin";
    }
    if(rights === 1){
        var sRights = "User";
    }

    $.getJSON( sUrlEditUser, function( jData ){

        if (jData.status=="ok"){
            fnShowMessage("Rights successfully changed to: "+ sRights);
            fnEditUserRights(that, sId, sRights);
        }
    });
}

function fnEditUserRights(that, id, rights){
    var sUserRightsElement = $('#'+id + ' .user-rights');
    sUserRightsElement.fadeOut(500);

    setTimeout(function(){
        sUserRightsElement.text(rights);
        sUserRightsElement.fadeIn();
    },500);
}
/********************************************************************************************************

 9.4 Delete user

 ********************************************************************************************************/

$(document).on("click", '.user-delete', function(e){
    fnDeleteUserDatabase(this);
});

function fnDeleteUserDatabase(that){
    swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#263238",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        },
        function(){
            fnShowMessage("User is deleted.");
            var sId= that.parentNode.parentNode.parentNode.id;

            var iId = sId.replace('user-','');
            //take the id, put it in the URL

            var sUrlDeleteUser= "api/users/api-delete-user.php?id=" + iId;

            $.getJSON( sUrlDeleteUser, function( jData){
                if( jData.status == "ok" ){
                    fnRemoveUser(that);
                    aIdUsers.splice(iId, 1);
                }
            });
        });
}

function fnRemoveUser(that){
    var sId= that.parentNode.parentNode.parentNode.id;
    $('#'+sId).fadeOut();
}

/********************************************************************************************************

 10. NOTIFICATIONS

 ********************************************************************************************************/

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        console.log('Desktop notifications not available in your browser.');
        return;
    }
    if (Notification.permission !== "granted"){
        Notification.requestPermission();
    }
});

var oSound = new Audio('audio/notification.mp3'); //o because Object

var changeTitle;
var iterations = 0;

function fnShowNotification(address, img){
    oSound.play();
    var baseTitle = document.title;
    var notificationTitle = "New property added";
    changeTitle = setInterval(function(){
        fnChangeTitle(baseTitle, notificationTitle);
    }, 1000);
    fnShowDesktopNotification(address, img);
}

function fnChangeTitle(baseTitle, notificationTitle) {
    if (iterations < 6){
        if(document.title === baseTitle){
            document.title = notificationTitle;
        }else{
            document.title = baseTitle;
        }
    }else{
        clearInterval(changeTitle);
    }

    iterations++;
}

function fnShowDesktopNotification(address, img) {
    if (Notification.permission !== "granted"){
        Notification.requestPermission();
    }
    else {
        var notification = new Notification(address, {
            icon: "uploads/"+img,
            body: "A new property has been added!"
        });

        notification.onclick = function () {
            var sUrl = "individual url with id";

            window.open(sUrl);
        };
    }
}

/********************************************************************************************************

 11. ANGULAR SEARCH FORM

 ********************************************************************************************************/

var aIdProperties = [];

var app = angular.module('instantsearch',[]);

app.controller('instantSearchCtrl', function ($scope, $http, $interval) {

    $http.get('api/properties/api-get-properties.php').success(function (data, status, headers, config) {

        for( var i = 0; i < data.length; i++ ){
            sIdProperty = data[i].id;
            aIdProperties.push(sIdProperty);
        }
        $scope.items = data;
    }).error(function (data, status, headers, config) {
        console.log("No data found..");

    });
    //setting an interval to refresh the content
    $interval(function(){
        $http.get('api/properties/api-get-properties.php').success(function (data, status, headers, config) {

            var bRefreshData = false;

            for( var i = 0; i < data.length; i++ ) {
                sIdProperty = data[i].id;
                var iInArray = aIdProperties.indexOf(sIdProperty);

                if (iInArray != -1) {
                    //the object ID is already in aIdProperties array
                }else{
                    //new object, push id to array and make sure to refresh data
                    aIdProperties.push(sIdProperty);
                    var img = data[i].img[0];
                    var address = data[i].address;

                    fnShowNotification(address, img);
                    bRefreshData = true;
                }
            }

            //only change the scope when new properties are added
            if(bRefreshData){
                $scope.items = data;
                //show notifications for newly added property
            }

        }).error(function (data, status, headers, config) {

        });
    },2000);
});

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.zipcode.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
            if(item.city.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
            if(item.address.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});


/********************************************************************************************************

 12. JS SLIDER

 ********************************************************************************************************/

var slideIndex = 1;

$(document).on('click','.prev', function(){
    var iSlide = slideIndex - 1;
    fnShowSlide(iSlide);
});
$(document).on('click','.next', function(){
    var iSlide = slideIndex + 1;
    fnShowSlide(iSlide);
});

function fnShowSlide(number) {
    var iSlide = number;

    //get length of all .slider-image elements
    var iSliderElements = $('.slider img').length;

    //find correct element
    if( number < 1 ){
        iSlide = iSliderElements;
    }
    if( number > iSliderElements ){
        iSlide = 1;
    }
    $('.slider-image.active').removeClass('active');
    //assign .active to correct element
    $('.slider-image:nth-child('+ iSlide +')').addClass('active');

    slideIndex = iSlide;
}

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               Buddha bless the code
//