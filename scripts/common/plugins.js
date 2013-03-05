// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
(function($){
    $.fn.pulse = function(options) {  
        var opt = $.extend({}, $.fn.pulse.defaults, options);
        $(this).delay(opt.delayTime).animate({
            opacity:opt.startingOpacity
        }).delay(opt.delayTime).animate({
            opacity:opt.endingOpacity
        },function(){
            $(this).pulse.apply(this, [options])
        });
    }  
    $.fn.pulse.defaults = {
        startingOpacity : 1.0,
        endingOpacity : 0.6,
        delayTime : 50
    };
    $.fn.flipper = function (options) {
        var opt = $.extend({}, $.fn.flipper.defaults, options);
        var firstChild, secondChild;
        if(this.length == 2){
            firstChild = $('#'+$(this)[0].id);
            secondChild = $('#'+$(this)[1].id);
        }else{
            firstChild = $('#'+$(this).children().eq(0)[0].id);
            secondChild = $('#'+$(this).children().eq(1)[0].id);
        }                
        var firstChildHeight = firstChild.height();
        var secondChildHeight = secondChild.height();
        //TO DO : Horizontal flip
        //        var firstChildWidth = firstChild.width();
        //        var secondChildWidth = secondChild.width();
        
        var firstChildTop = firstChild.css('top');
        var secondChildTop = secondChild.css('top');
        var center = parseInt(firstChildTop) + (firstChildHeight/2)
        secondChild.hide().css({
            top:center,
            height:'0px'
        });
        
        firstChild.animate({            
            top : center + 'px',
            height : "-0px"
        },{
            duration : opt.duration,
            step:function(now){
            },
            complete : function(){
                firstChild.hide();
                secondChild.show().animate({
                    top : secondChildTop,
                    height : secondChildHeight+'px'                 
                },{
                    duration : opt.duration,
                    complete: function(){
                        opt.onComplete();
                    }
                })
            },
            step:function(now){
            }
        });            
    }
    $.fn.flipper.defaults = {
        duration : 1000,
        onComplete: function () {}
    };
})(jQuery);