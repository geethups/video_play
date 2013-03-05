
function openNewWindow(url,windowName){
    //	window.open(url,windowName,"resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=no,width=1280, height=752");
    window.location = url;
}

var globalConstants = {};
globalConstants.baseURL = function(){
    return window.location.host;
}

var utility = {};
utility.redirectTo = function(url){
    document.location.replace(url);
}

var globalVariables = {};
globalVariables.audioTags = [];
globalVariables.rootFolder = '';
globalVariables.is_narration_needed = (localStorage.getItem("is_narration_needed") == 'true')? true: false;
var audio_synch = {};
audio_synch.methods = [];
audio_synch.playing = null;
var is_muted = (localStorage.getItem("is_muted") == 'true')? true: false;

var muteUnmute = function()
{
    if(is_muted){           
        if(audio_synch.playing != null){
            audio_synch.playing.muted = false;
        }
        localStorage.setItem("is_muted",'false');
        is_muted = false;
        $("#speaker_image").css({
            backgroundPositionY :"-73px",
            backgroundPositionX :"-283px"
        });
    }else{
        if(audio_synch.playing != null){
            audio_synch.playing.muted = true;
        }
        localStorage.setItem("is_muted",'true');
        is_muted = true;
        $("#speaker_image").css({
            backgroundPositionY :"-103px",
            backgroundPositionX :"-283px"
        });
    }
}

//function for play  audio with  mute and unmute and 
var mediaPlay =  function()
{
    $('#play_button').removeAttr("disabled").css({
        opacity:1,
        backgroundPositionY :"-12px",
        backgroundPositionX :"-821px"
    });
    if(audio_synch.playing != null){
        if(is_muted){
            audio_synch.playing.muted=true;
        }else{
            audio_synch.playing.muted=false;
            
        }
        audio_synch.playing.play();    
    }
}

//function for save status of the is_mute variable
var audioMuteUnmuteStatus = function()
{
    is_muted = (localStorage.getItem("is_muted") == 'true')? true: false;
    if(is_muted){
        $("#speaker_image").css({
            backgroundPositionY :"-103px",
            backgroundPositionX :"-283px"
        });
    }else{
        $("#speaker_image").css({
            backgroundPositionY :"-73px",
            backgroundPositionX :"-283px"
        });
    }
}  

//initiialise section animations
utility.initSection = function (){
    //    $(".narration").hide(1);        
    var pathname = window.location.pathname;       
    var modules = pathname.split('/');      
    var module_name = modules[3];  
    var section_name = modules[4];
//    showClickToStartMessage();
    utility.enableButtons();  
    $('#play_button').attr("disabled","false");
    utility.checkInitialConditions();  
    if(module_name == 'do_you_know.html' || module_name == 'do_you_know_beginning.html'){
        do_you_know.init();
        mediaPlay();
    } else if(section_name == 'bac_section3.html'){
        bac_section3.init(); 
    } else if(section_name == 'sab_section4.html') {
        sab_section4.init();
    } 
    else if(section_name == 'fty_section2_1.html'){	
        fty_section2_1.init();
    }
    else if(section_name == 'cag_section1.html' || section_name == 'cag_section2.html'){
        console.log(section_name)	;
        cag_section.init();
    }
    else if(section_name == 'leaderboard.html'){    
        leaderboard.init();
    }
    else if(section_name == 'da_section2.html'){	
        if(utility.disable_button_for_next_time){
            da_section_two.init();     
        }
        else{
            mediaPlay();
        }
                            
    }
    else {
        mediaPlay();
    }

}

//disable buttons on preload
utility.disableButtons = function(){
    $('#play_button').css('background-position','-886px -12px');
    $('#play_button').css("opacity",0.5);
    $('#play_button').attr("disabled","true");  
    $('#chat_button').css("opacity",0.5);
    $('#chat_button').attr("disabled","disabled");
    $('#settings_button').css("opacity",0.5);
    $('#settings_button').attr("disabled","disabled");
    $('#question_mark_button').css("opacity",0.5);
    $('#question_mark_button').attr("disabled","disabled");  
    $('#question_mark_button_my_digital_life').attr("disabled","disabled"); 
    $('#question_mark_button_my_digital_life').css("opacity",0.5);
    $('#close_button').css("opacity",0.5);
    $('#close_button').attr("disabled","disabled");
    $('#speaker_image').attr("disabled","disabled");
    
}
utility.enableButtons = function(){
    $('#play_button').attr("disabled","false");
    $('#chat_button').css("opacity",1);
    $('#chat_button').removeAttr('disabled');
    $('#settings_button').css("opacity",1);
    $('#settings_button').removeAttr('disabled');
    $('#question_mark_button').css("opacity",1);
    $('#question_mark_button').removeAttr('disabled');
    $('#question_mark_button_my_digital_life').css("opacity",1);
    $('#question_mark_button_my_digital_life').removeAttr('disabled');
    $('#close_button').css("opacity",1);
    $('#close_button').removeAttr('disabled');
    $('#speaker_image').removeAttr('disabled');
}

/**
 * Animation controls
 */

$('#play_button').click(function(){ 
    $('#click_to_start_message').css("display","none");
    if(audio_synch.playing != null){
        if (audio_synch.playing.paused == false) {
            $(this).css('background-position','-886px -12px');
            audio_synch.playing.pause();      
            $(".animationToPause").pause();
        } else {
            $(this).css('background-position','-821px -12px');
            if(is_muted){
                audio_synch.playing.muted = true;
            }else{
                audio_synch.playing.muted = false;
            }
            audio_synch.playing.play();
            $(".animationToPause").resume();
        }
    }
});

$('#home_button').click(function(event){
    var url = '../';
    var pathname = window.location.pathname;
    var submodules = pathname.split('/');
    var submodule_name = submodules[3];
    switch (submodule_name){
        case 'my_digital_use':
        case 'digital_addiction':
        case 'stop_a_cyberbully':
            url = '../more_topics.html';
            break;
        default:
            url = '../';
            break;
    }    
    utility.redirectTo(url);
});

$('#close_button').click(function(){
    if(audio_synch.playing != null){
        audio_synch.playing.pause();
        $(".animationToPause").pause(); 
        $('#play_button').css('background-position','-886px -12px');
    }    
    var close_pop_up_box = $('#close_pop_up_box');
    if (!close_pop_up_box.length){
        $('<div/>', {
            id: 'close_overlay'
        }).appendTo('body');
        $('<div/>', {
            id: 'close_pop_up_box'
        }).appendTo('body');
        $('<div/>', {
            id: 'close_pop_up_head',
            text:'Exit'
        }).appendTo('#close_pop_up_box');
        $('<div/>', {
            id: 'close_pop_up_text',
            text:'are you sure you want to exit?'
        }).appendTo('#close_pop_up_box');
        $('<button />', {
            id: 'close_pop_up_button_no',
            Class:"close_pop_up_button"
        }).appendTo('#close_pop_up_box');
        $('<button />', {
            id: 'close_pop_up_button_yes',
            Class:"close_pop_up_button"
        }).appendTo('#close_pop_up_box');
    }              
    $('#close_overlay').css("display","block");
    $('#close_pop_up_box').css("display","block");
});

$('#close_pop_up_button_no').live("click",function(){
    $('#close_overlay').css("display","none");
    $('#close_pop_up_box').css("display","none");
    var $click_to_start_message_div = $('#click_to_start_message');
    if (!$click_to_start_message_div.length){
        if(audio_synch.playing != null){
            $('#play_button').css('background-position','-821px -12px');
            $(".animationToPause").resume();
            audio_synch.playing.play();
        }
    }
});

$('#close_pop_up_button_yes').live("click",function(){
    $('#close_overlay').css("display","none");
    $('#close_pop_up_box').css("display","none");
    utility.redirectTo('http://'+globalConstants.baseURL()+'/views/app_home/ah_section4.html');
});

$("#speaker_image").bind('click',function(){
    muteUnmute();   
});

utility.click_to_start_required = true;
function showClickToStartMessage() {
    if(utility.click_to_start_required){
        var click_here_to_start_section = '<div id="click_to_start_message"></div>';
        $('body').append(click_here_to_start_section);
        $('#click_to_start_message').show();
    }
}

utility.addLoadingNotification = function(){
    var loaderContainer = '<div class="loader_overlay">'+
    '<div class="loader">'+
    '<br/><br/>Loading...'+
    '</div>'+
    '</div>';
    $('body').append(loaderContainer);    
}

utility.removeLoadingNotification = function(){
    $('.loader_overlay').remove();   
}


$('#reload_button').click(function(){
    document.location.reload(true); 
});

$('#chat_button').click(function(){
    if($('.narration').css('display') == 'block'){
        localStorage.setItem('is_narration_needed','false');
        $('.narration').css('display','none');       
    }else{
        localStorage.setItem('is_narration_needed','true');
        $('.narration').css('display', 'block');
        $('.narration p').alternateScroll({
            'vertical-bar-class': 'styled-v-bar', 
            'hide-bars': false
        });
    }
});
utility.checkNarration = function() {
    var isNarrationNeeded = globalVariables.is_narration_needed;
    if(isNarrationNeeded){
        $('.narration').css('display','block');
    }else{
        $('.narration').css('display','none');
    }    
}


//write all initial setup methods here.
utility.checkInitialConditions = function() {
    //check and displays narration block if needed.
    utility.checkNarration();
    //check audio mute state.
    audioMuteUnmuteStatus();     
}

utility.setNarration = function (narration_text){
    $('.narration').html(narration_text);
    $('.narration p').alternateScroll({
        'vertical-bar-class': 'styled-v-bar', 
        'hide-bars': false
    });
}


// help section js
$('#question_mark_button').click(function(){
    var help_section = '<div class = "help_main_container" id="help_main_container" class="animationToPause">'+
    '<img id="help_bg_image" src="../../../images/common/help_bg_town_map.jpg"/>'+
    '<div id="help_welcome">'+
    '<div id="welcome_text"> WELCOME TO IGNITION</div>'+
    ' <div id="click_info_text">'+
    ' Click \'X\' to get to the map and begin! '+
    '</div>'+
    ' </div>'+
    ' <div id="help_text">'+
    '<p>Click on the available balloons on the map to access scenarios and activities</p>'+
    '<p>You\'ll apply some of what you learn in the modules to help you succeed in promoting'+
    ' the band in the simulation</p>'+
    '</div>'+
    '<img id="balloon_x_image" src="../../../images/common/balloon_x.png"/>'+
    ' </div>';
    if(audio_synch.playing != null){
        audio_synch.playing.pause();
        $(".animationToPause").pause(); 
    }   
    $('body').append(help_section);     
});

$("#balloon_x_image").live("click", function() {
    $('#help_main_container').remove();
    var $click_to_start_message_div = $('#click_to_start_message');
    if (!$click_to_start_message_div.length){
        if(audio_synch.playing != null){
            audio_synch.playing.play(); 
        }
        $(".animationToPause").resume();
    }
});

// settings section js
$('#settings_button').click(function(){
    var loaderContainer = '<div id="settings"></div>';
    $('body').append(loaderContainer);   
    $('#settings').load('../../../views/settings/settings_section.html #settings_container', 
        function (responseText, textStatus, XMLHttpRequest) {
            if (textStatus == "success") {
                $('.loader_overlay').css({
                    zIndex:1400
                }); 
                $('html, body').animate({
                    scrollTop:-10
                }, 50)
            }
        //     $('#glossary_details').alternateScroll({ 'vertical-bar-class': 'styled-v-bar', 'hide-bars': false });
        //     $('#file_list').alternateScroll({ 'vertical-bar-class': 'styled-v-bar', 'hide-bars': false });
        });
  
    if(audio_synch.playing != null){
        audio_synch.playing.pause();
        
    }  
    $(".animationToPause").pause(); 
   
});
$("#settings_close_btn").live("click", function(){
    $('.loader_overlay').css({
        zIndex:999
    }); 
    $('#settings_container').remove();
    var $click_to_start_message_div = $('#click_to_start_message');
    if (!$click_to_start_message_div.length){
        if(audio_synch.playing != null){
            audio_synch.playing.play(); 
        }
        $(".animationToPause").resume();
    }
});

var ele = [],delay;
$('.sub_modules').each(function(i){
    ele = $(this);
    animateIcons(ele, 300*i);
});

function animateIcons(element, delay){
    setTimeout(function () {
        element.addClass('swing_icons');
    },delay);
}
