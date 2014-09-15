<!-- load art from the json database and start popup gallery -->
var selectArt = function(artchoice){
    $.get("./showArtwork.php?q="+artchoice, function(result){
        $("#main").html(result);
        $(".nav-choice--selected").removeClass("nav-choice--selected").addClass("nav-choice--unselected");
        $("#"+artchoice).removeClass("nav-choice--unselected").addClass("nav-choice--selected");
        if (!$(":root").hasClass('mobile')){
            var gallery = $("#gallery");
            gallery.poptrox({
                fadeSpeed: 175,
                popupSpeed: 225,
                usePopupCloser: false,
                usePopupNav: true,
                usePopupCaption: true,
                usePopupDefaultStyling: false
            })
        } else {
            $(".art-link").removeAttr("href")
            //$(".art-link").attr("href", "javascript:void(0)")
        }
    })
};
 
<!-- set up the about rose page -->
var selectAbout = function(){
    $("#main").load("./aboutrose.html")
    $(".nav-choice--selected").removeClass("nav-choice--selected").addClass("nav-choice--unselected");
    $("#about-rose").removeClass("nav-choice--unselected").addClass("nav-choice--selected");
};

$(document).ready(function() {
    <!-- initialize the page showing landscapes -->
    selectArt('landscape')
    
    <!-- nav bar sticks to top of the screen -->
    var positionFloatingNavBar = function(){   
        $('#nav').css({'position':'absolute', 'top':$("#header").outerHeight(true)+'px', 'z-index':'800'});
    }
    var positionFixedNavBar = function(){
        $('#nav').css({'position':'fixed','top':'0px', 'z-index':'800'});
    }
    var checkNavBarPosition = function(){
        $('#nav').css({'width':$('#header').innerWidth()+'px'});
        if ( $(this).scrollTop() > $("#header").outerHeight(true) ) {
            positionFixedNavBar();
        } else {
            positionFloatingNavBar();
        }
    };    
    checkNavBarPosition();
    
    var positionFloatingHeader = function(){
        var baselevel = 20,
            percent = Math.max(0, baselevel*($("#header").outerHeight(true) - 1.25*$(this).scrollTop()) / $("#header").outerHeight(true));
        $('.header__text').css({'position':'absolute','bottom':percent+'%'});
        $('.header__text-background').css({'position':'absolute','bottom':percent+'%'});
    }
    positionFloatingHeader();
    
    $(window).resize(function() {
        checkNavBarPosition();
        positionFloatingHeader();
    });
    
    $(window).scroll(function() {                   
        checkNavBarPosition();
        positionFloatingHeader();
    });
    
    <!-- this is the loader from the default poptrox styling -->
    $(".loader")
        .html('')
        .css('position', 'relative')
        .css('font-size', '2em')
        .on('startSpinning', function(e) {
            
            var x = $('<div>&bull;&bull;&bull;&bull;</div>');
            x
                .css('height', '50px')
                .css('overflow', 'hidden')
                .css('line-height', '50px')
                .css('text-align', 'center')
                .css('margin-top', Math.floor((100 - x.height() + 60 / 2)))
                .css('color', '#000000')
                .on('xfin', function() { x.fadeTo(300, 0.5, function() { x.trigger('xfout'); }); })
                .on('xfout', function() { x.fadeTo(300, 0.05, function() { x.trigger('xfin'); }); })
                .trigger('xfin');
            
            $loader.append(x);
        
        })
        .on('stopSpinning', function(e) {
            
            var x = $loader.find('div');
            x.remove();
        
        });
});