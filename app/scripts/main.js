/*jshint quotmark: double */
"use strict";

$(function() {    
    /* cache these for frequent use */
    var navbar = $(".nav-bar");
    var headerText = $(".header__text");
    var headerHeight = $(".header").outerHeight(true);
    
    /* nav bar sticks to top of the screen */
    var positionFloatingNavBar = function(){   
        navbar.css({"position":"absolute", "top":headerHeight+"px", "z-index":"800"});
    };
    var positionFixedNavBar = function(){
        navbar.css({"position":"fixed","top":"0px", "z-index":"800"});
    };
    var checkNavBarPosition = function(scrollTop){
        if ( scrollTop > headerHeight ) {
            positionFixedNavBar(navbar);
        } else {
            positionFloatingNavBar(navbar);
        }
    };
    
    
    /**********/
    /* handle floating navbar and header text */
    var positionFloatingHeader = function(scrollTop){
        var baselevel = 20,
            percent = Math.max(0, baselevel*(headerHeight - 1.25*scrollTop) / headerHeight);
        headerText.css({"position":"absolute","bottom":percent+"%"});
    };
    positionFloatingHeader();
    
    $(window).resize(function() {
        /* reset header height */
        headerHeight = $(".header").outerHeight(true);   
        checkNavBarPosition($(this).scrollTop());
        positionFloatingHeader($(this).scrollTop());
    });
    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();                   
        checkNavBarPosition(scrollTop);
        if ( scrollTop < headerHeight) {
          positionFloatingHeader(Math.max(1, scrollTop));
        }
    });
    
    
    /**********/
    /* load art from the json database and start popup gallery */
        
    /* this is the loader from the default poptrox styling */
    var setupLoader = function(){
        var popup = $(".poptrox-popup");
        $(".loader")
            .html("")
            .css("position", "relative")
            .css("font-size", "2em")
            .on("startSpinning", function() {
                var x = $("<div>&bull;&bull;&bull;&bull;</div>");
                x
                    .css("height", "50px")
                    .css("overflow", "hidden")
                    .css("line-height", "50px")
                    .css("text-align", "center")
                    .css("margin-top", Math.floor((popup.height() - x.height() + 60 / 2)))
                    .css("color", "#333333")
                    .on("xfin", function() { x.fadeTo(300, 0.5, function() { x.trigger("xfout"); }); })
                    .on("xfout", function() { x.fadeTo(300, 0.05, function() { x.trigger("xfin"); }); })
                    .trigger("xfin");
                $(".loader").append(x);
            })
            .on("stopSpinning", function() {
                var x = $(".loader").find("div");
                x.remove();      
            });
      };
    
    var selectArt = function(artchoice){
        $(".poptrox-overlay").remove();
        $.get("./showArtwork.php?q="+artchoice, function(result){
            $(".main").html(result);
            $(".nav-selected").removeClass("nav-selected").addClass("nav-unselected");
            $("#"+artchoice).removeClass("nav-unselected").addClass("nav-selected");
            if ($(":root").width() > 480){
                var gallery = $(".gallery");
                gallery.poptrox({
                    fadeSpeed: 175,
                    popupSpeed: 225,
                    usePopupCloser: false,
                    usePopupNav: true,
                    usePopupCaption: true,
                    usePopupDefaultStyling: false
                });
                setupLoader();
            } else {
                $(".artpiece__image").removeAttr("href");
            }
        });
    };
    
    var selectAbout = function(){
        $(".main").load("./aboutrose.html");
        $(".nav-selected").removeClass("nav-selected").addClass("nav-unselected");
        $("#about-rose").removeClass("nav-unselected").addClass("nav-selected");
    };
    
    
    $("#about-rose").click(function(){ selectAbout(); });
    $("#landscape").click( function(){ selectArt("landscape"); });
    $("#stilllife").click( function(){ selectArt("stilllife"); });
    $("#winter").click( function(){ selectArt("winter"); });
    
    /**********/
    /* initialize the page showing landscapes */
    selectArt("landscape");
    checkNavBarPosition(navbar);
    
});