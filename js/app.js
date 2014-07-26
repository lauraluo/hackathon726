
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
        var dPanel = dModule.find('> .panel');
        var loadingInTime = 500;
        var dContent = dModule.find('.content');
        var dCloseBtn = dModule.find('.closeBtn');
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
        //關閉
        dCloseBtn.click(function(e){
            //主內容淡出
            dPanel.hide();
            //Wedget最外面加上關閉狀態的CLASS
            dModule.addClass('closeStatus');
            //將LOGO變成打開鈕
        });
        //打開
        dModule.find('.panelLogoBtn').on('click',function(e){
            if(dModule.hasClass('closeStatus')){
                //Wedget最外面移除關閉狀態CLASS
                dModule.removeClass('closeStatus').delay(300);
                //主內容SHOW出 要等LOGO的特效跑
                dPanel.delay(300).show();
            }
        });





        
        dModule.niceScroll();

        $( window ).resize(function() {
            dContent.getNiceScroll().resize();
            dContent.css({
                'height': $(window).height() - 48,
                'overflow':'hidden'
            });


        });

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
    },
    fanList: function(dModule){
        var dModule = $(dModule);
        var dItem = dModule.find('.fanItem');
        var dWin = $('#areaID_widgetWindow');
        var dWinMask = dWin.find('> .mask');
        
        dModule.css({'height':$('body').height()});
        dWin.css({'height':$('body').height()});
        dWinMask.css({'height':$('body').height(),'width':$('body').width()});
        
        dModule.niceScroll();

        $( window ).resize(function() {
            dModule.css({'height':$('body').height()});
            dModule.getNiceScroll().resize();
            dWin.css({'height':$('body').height()});
            dWinMask.css({'height':$('body').height(),'width':$('body').width()});

        });


        dItem.each(function(index ,item){
            var dItem = $(item);
            var loadingBarHtml = '<div class="loadingBar"></div>';
            var dLoadingBar = $(loadingBarHtml);
            var loadValue = 0;
            var loadInter = setInterval(function(){
                loadingAni()}, 500);
            var dWave = dItem.find('.waveLoad');
            var dArrow = dItem.find('.arrowBlock'); 

            dItem.append(dLoadingBar);
            // dLoadingBar.css({'width':'100%'});

            var loadingAni = function(value) {
                //hotfixed 
                loadValue = loadValue+10;
                if (loadValue >= 100 ){
                    //下載完成 
                    clearInterval(loadInter);
                    dItem.find('.waveLoad').remove();
                    dArrow.show();
                    dArrow.css({'transition':'transform 0.3s ease-in-out'});
                    dArrow.css({'transform':'scale(1.0)'});
                    dArrow.addClass('active');
                    dItem.removeClass('disabled');
                    dLoadingBar.fadeOut().remove();
                    return;

                }else {
                    dLoadingBar.css({'transition':'width 0.3s ease-in-out'});
                    dLoadingBar.css({'width':loadValue+'%'});
                }
            }
        });

        dItem.on('click',function(e){
            dWinMask.show();
            dWin.find('.winWarp').animate({'width':420});
        });


    },
    indexhero:function(dModule){
        var dModule = $(dModule);
        dModule.css({'height':$('body').height()});
        dModule.niceScroll();
        $( window ).resize(function() {
            dModule.css({'height':$('body').height()});
            dModule.getNiceScroll().resize();
        });
    },
};
(function(){
    var doWhileExist = function(ModuleID,objFunction){
        var dTarget = document.getElementById(ModuleID);
        if(dTarget){
            objFunction(dTarget);
        }                
    };
    doWhileExist('pluginWidget',app.module.pluginWidget);
    doWhileExist('areaID_fanList',app.module.fanList);
    doWhileExist('areaID_hero',app.module.indexhero);
})();