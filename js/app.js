
var app = {};
app.module = {
    version: '0.1',
    namespace: function(ns_string){
        var parts = ns_string.split('.'),
            parent = app,
            i;
        if (parts[0] === 'app'){
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
    pluginWidget: function(dModule){
        var dModule = $(dModule);
        var loadingInTime = 500;
        var dContent = dModule.find('.content');
        var radarChartData = {
            labels: ["活躍度", "熱門度", "專業度", "原創度"],
            datasets: [
                {
                    label: "參考值",
                    fillColor: "rgba(220,220,220,0.6)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [5, 5, 5, 5]
                },
                {
                    label: "粉絲團體檢器",
                    fillColor: "rgba(255,255,255,0.0)",
                    strokeColor: "rgba(255,255,255,0.5)",
                    pointColor: "rgba(250,133,100,1.0)",
                    pointStrokeColor: "rgba(250,133,100,1.0)",
                    pointHighlightFill: "rgba(250,133,100,1)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [10,8,7,5]
                }       
            ]
        };
        dContent.css({
            'height': $(window).height() - 48,
            'overflow':'hidden'
        });

        dContent.niceScroll();

        dModule.find('.loadingBanr').fadeOut(loadingInTime,function(){
            window.myRadar = new Chart(document.getElementById("radarCanvas").getContext("2d")).Radar(radarChartData, {
                responsive: true,
                pointDotRadius : 5,
                scaleLineWidth: 1,
                scaleFontFamily: "'Verdana','微軟正黑體','儷黑 Pro','Arial','Helvetica','sans-serif','STHeiti Light','LiHei Pro','Microsoft Yahei','Microsoft JhengHei','新細明體'"
            });

        });
        dModule.find('.content').delay(loadingInTime).addClass('activeSence');
    }   
};
(function(){
    var doWhileExist = function(ModuleID,objFunction){
        var dTarget = document.getElementById(ModuleID);
        if(dTarget){
            objFunction(dTarget);
        }                
    };
    doWhileExist('pluginWidget',app.module.pluginWidget);
})();