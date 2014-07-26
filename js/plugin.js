/*!
 * jQuery plugin
 * What does it do
 */
var loadScript = function(url){
　　　　var script = document.createElement("script");
　　　　script.type = "text/javascript";
　　　　script.src = url;
　　　　document.body.appendChild(script);
};

(function($) {
    $.fn.pluginName = function(opts) {
        // default configuration
        var config = $.extend({}, {
            opt1: null
        }, opts);
        // main function
        function initApp(object,plugin) {
            var dObj = $(object);
            var dPlugin =  $(plugin);
            dPlugin.css({
                'height':$( window ).height(),
                'border':'none',
                'box-shadow':'-2px 0px 0 0 rgba(0,0,0,0.2)'
            });


            dPlugin.animate({'width':420});

            //展示關掉的流hotfixed
            // dPlugin.css({'transition':'all 0.3s ease-in-out'});
            // dPlugin.css({
            //     'height':100,
            //     'width':80,
            //     'border':'none',
            //     'box-shadow':'none'
            // });

        }
        // initialize every element
        this.each(function() {
            var iframe = '<iframe id="cifAppPlugin" src="plugin_widget.html"></iframe>';
            var iframeObj = $(iframe);

            $(this).append(iframeObj);
            initApp($(this),iframeObj);

            iframeObj.addClass();
        });
        return this;
    };
    // start
    $(function() {
        $("html > body").pluginName();
    });
})(jQuery);
