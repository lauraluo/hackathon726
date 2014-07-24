
/*!
 * jQuery plugin
 * What does it do
 */


(function($) {
    $.fn.pluginName = function(opts) {
        // default configuration
        var config = $.extend({}, {
            opt1: null
        }, opts);
        // main function
        function doSometing(object) {
            var dObj = $(object);
            var dFixedLink = dObj.find('.navList .item > a'); 

            dFixedLink.each(function(index,item){
                var dThis = $(item);
                dThis.attr('target','_blank');
            });
        }
        // initialize every element
        this.each(function() {
            doSometing($(this));
        });
        return this;
    };
    // start
    $(function() {
        $(".indexFixedLink").pluginName();
    });
})(jQuery);







var app = {};
app.module = {
    version: '0.1',
    namespace: function(ns_string){
        var parts = ns_string.split('.'),
            parent = lhz,
            i;
        if (parts[0] === 'lhz'){
            parts = parts.slice(1);
        }
        for (i = 0; i < parts.length; i += 1){
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    },
    inherit: function(Child, Parent){
        Child.prototype = new Parent();
    },
    trBannerVair: function(dModule){
    }	
};
(function(){
    var doWhileExist = function(ModuleID,objFunction){
        var dTarget = document.getElementById(ModuleID);
        if(dTarget){
            objFunction(dTarget);
        }                
    };
    doWhileExist('trBannerVair',lhz.module.trBannerVair);
})();