
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
                    pointLabelFontSize : 16,
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
                    pointLabelFontSize : 16,
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
                scaleFontFamily: "'Verdana','微軟正黑體','儷黑 Pro','Arial','Helvetica','sans-serif','STHeiti Light','LiHei Pro','Microsoft Yahei','Microsoft JhengHei','新細明體'",
                // Number - Tooltip label font size in pixels
                tooltipFontSize: 16,
                // String - Tooltip font weight style
                tooltipFontStyle: "'Verdana','微軟正黑體','儷黑 Pro','Arial','Helvetica','sans-serif','STHeiti Light','LiHei Pro','Microsoft Yahei','Microsoft JhengHei','新細明體'",
            });

        });
        dModule.find('.content').delay(loadingInTime).addClass('activeSence');


        //Bar chart
        var lvtext = ["ok","safe","bad"];
        var matrix = [
            {
                val:[40],
                avg:15,
                domainX:[10,15,100],
                lv:3.2
            },
            {
                val:[0.5],
                avg:0.2,
                domainX:[0,0.4,0.6],
                lv:9.1
            },
            {
                val:[40],
                avg:15,
                domainX:[10,15,100],
                lv:6.2
            },
            {
                val:[0.5],
                avg:0.2,
                domainX:[0,0.4,0.6],
                lv:9.1
            },
            {
                val:[40],
                avg:15,
                domainX:[10,15,100],
                lv:3.2
            },
            {
                val:[0.5],
                avg:0.2,
                domainX:[0,0.4,0.6],
                lv:9.1
            }

        ];

        //layout
        var layout = {
            w: 360,
            h:43,
            barH: 31,
            paddingTop: 10,
            paddingLeft:20,
        };
        var dBarField = dModule.find('.barfield');

        dBarField.each(function(index,item){
            var lv = matrix[index].lv;
            var dThis = $(item);
            var statustext = "";
            var domainX = matrix[index].domainX;
            var dataset = matrix[index].val;
            var thisAvg = matrix[index].avg;
            var rangeX = [];
            var filedsName = dThis.data('name');

            for(var i= domainX.length ; i > 0;i--){
                rangeX.push(Math.round(layout.w/i));
            };

            if(lv>=8){
                statustext = 'ok';
            }else if(lv>=6){
                statustext = 'safe';
            }else {
                statustext = 'bad';
            }


            var tipHtml = [
            '   <ul class="chartInfo tipinfo">',
            '       <li class="barSquare"><span class="block"></span>'+filedsName+'<span class="number">555</span></li>',
            '       <li class="avg"><span class="block"></span>平均<span class="number">'+thisAvg+'</span></li>',
            '       <li class="range"><span class="block"></span>級距<span class="number">'+domainX[0]+'-'+domainX[domainX.length-1]+'</span></li>',
            '       <li class="order">排序<span class="number">11111</span></li>',
            '   </ul>'
            ].join('');


            dThis.addClass(statustext);
            //tooltips
            dThis.find('.barChart').tooltipster({
               animation: 'fade',
               delay: 300,
               theme: 'tooltipster-default customtip '+statustext,
               touchDevices: false,
               trigger: 'hover',
               content:'testword',
               content:tipHtml,
               minWidth:150,
               contentAsHTML:true
            });

            //Create SVG element
            var svg = d3.select(item).selectAll('.barChart')
                .append("svg")
                .attr('class','barSence')
                .attr("width", layout.w)
                .attr("height", layout.h);

            var rangeX = d3.scale.linear()
                .domain(domainX)
                .range(rangeX).nice();

            var warp = svg.append("rect")
                .attr("class", "warp")
                .attr("x", function() {
                        return 0;
                })
                .attr("y", function() {
                        return 10;
                })
                .attr("width", function(){
                        return layout.w;
                })
                .attr("height", function() {
                        return layout.barH;
                });



            var mySquare = svg.selectAll(".barSence")
               .data(dataset)
               .enter()
               .append("rect")
               .attr('class','barObj')
               .attr("x", function(d, i) {
                    return 0;
               })
               .attr("y", function(d) {
                    return 10;
               })
               .attr("width", function(d){
                    return 0;
               })
               .attr("height", function(d) {
                    return layout.barH;
               });


            mySquare
                .transition()
                .attr("width", function(d){
                    return rangeX(d);
                })

            dThis.find('.avg').animate({left:rangeX(thisAvg)-8},500);
        });
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