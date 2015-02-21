/**
 * Created by rohit.misra on 30/10/2014.
 */
function barChart(params){
    var initParams = {
        height: null,
        canvasHeight: null,
        canvasWidth: null,
        alignment: null,
        axes: null,
        colorScheme: null,
        data: null,
        dataSource: null,
        onClick: null,
        target: null,
        x: 50,
        y: 50,
        zeroPadding: 5
    };

    var defaultParams = {
        height: null,
        canvasHeight: null,
        canvasWidth: null,
        alignment: null,
        axes: null,
        colorScheme: null,
        data: null,
        dataSource: null,
        onClick: null,
        target: null,
        x: 50,
        y: 50,
        zeroPadding: 5
    };


    var paper;

    this.clearFunc = function (){
        paper.remove();
        initParams = defaultParams;
    };

    function init(){
        (function (Raphael, ko) {
            function setAttrBinding(el, attr, obs) {
                if (ko.isSubscribable(obs)) {
                    if (!el.subscriptions)
                        el.subscriptions = [];

                    var sub = obs.subscribe(function (value) {
                        var paramArr = [];
                        //var paramAArr
                        paramArr [attr] = value;
                        var animationObj = Raphael.animation(paramArr, 1200, "bounce");
                        el.animate(animationObj);
                        //el.attr(attr, value);
                    });
                    el.subscriptions.push(sub);
                }

                el.attr(attr, ko.utils.unwrapObservable(obs));
            }

            Raphael.el.bind = function (attr, obs) {
                if (attr === Object(attr)) {
                    for (var key in attr)
                        setAttrBinding(this, key, attr[key]);
                }
                else
                    setAttrBinding(this, attr, obs);
            };

            Raphael.el.dispose = function (attr, obs) {
                if (this.subscriptions && this.subscriptions.length) {
                    var len = this.subscriptions.length;
                    for (var i = 0; i < len; i++)
                        this.subscriptions[i].dispose();

                    this.subscriptions = [];
                }
            };
        })(window.Raphael, window.ko);




        jQuery.extend(initParams,params);

        var tip = $("#tip").hide();
        var tipText = "";
        var over = false;

        Raphael.el.tooltip = function (tp) {
            this.tp = tp;
            this.tp.ox = 0;
            this.tp.oy = 0;
            this.tp.hide();
            this.hover(
                function(event) {
                    this.mousemove(function(event) {
                        this.tp.translate(event.clientX -
                            this.tp.ox,event.clientY - this.tp.oy);
                        this.tp.ox = event.clientX;
                        this.tp.oy = event.clientY;
                    });
                    this.tp.show().toFront();
                },
                function(event) {
                    this.tp.hide();
                    this.unmousemove();
                }
            );
            return this;
        };

        function addTip(node, txt){
            $(node).mouseenter(function(){
                tipText = txt;
                tip.fadeIn(10);
                over = true;
            }).mouseleave(function(){
                tip.fadeOut(200);
                over = false;
            });
        }




        var svgEl = document.getElementById(initParams.target);
        console.log(initParams.x);
        paper = Raphael( svgEl, initParams.canvasWidth, initParams.canvasHeight );

        // Draw a rectangle with rounded corners

        //the axis

        var axis = initParams.alignment=="portrait"? paper.rect( 10, initParams.canvasHeight - 30,initParams.canvasWidth,1,0) :paper.rect( initParams.x, 10, 1, 800, 0 );
        axis.attr({
            stroke : 'rgba(0,0,255,0.5)',
            'stroke-width' : 1
        });
        var masterSet = paper.set();
        var barSet1 = paper.set();
        var barSet2 = paper.set();

        //var viewModel = ko.mapping.fromJS(data);


        if(initParams.data.arr1.length == initParams.data.arr2.length){
            for(var i = 0; i < initParams.data.arr1.length; i++){
                var temp_rect1 = createRect(initParams.data.arr1[i],i);
                var temp_rect2 = createRect(initParams.data.arr2[i],i);
                var tempSet = paper.set();
                tempSet.push(temp_rect1);
                tempSet.push(temp_rect2);
                masterSet.push(tempSet);
            }
        }



        function createRect(value, i) {
            var radius = 1;
            var y = initParams.y+i*30;
            var x = initParams.x;
            var height = initParams.height;
            var width = initParams.zeroPadding; //initial width for animation

            if(initParams.alignment == 'portrait'){
                height = [width, width = height][0];
                y = initParams.canvasHeight - [x, x = y][0] + 15;
            }



            var vm = {
                x: ko.observable(x),
                y: ko.observable(y),
                width: ko.observable(width),
                height: ko.observable(height),
                fill: ko.observable('rgba(' + value + ',150,255,0.5)')
            };

            //var paper = Raphael(document.getElementById("_doc"), 400, 400);

            var rect = paper.rect();
            rect.bind("x", vm.x);
            rect.bind("y", vm.y);
            rect.bind("width", vm.width);
            rect.bind("height", vm.height);
            rect.bind("fill", vm.fill);

            rect.id = "rect"+i;

            var start = {x: 0, y: 0},
                pos = { x: 0, y: 0 };
            //isMouseDown = false;
            ko.applyBindings(vm);






            if(initParams.alignment == 'portrait'){
                y = initParams.canvasHeight + 150 - [x,x=y][0] + 15;
                height = [width,width=height][0];
            }


            //var rect = paper.rect(x, y, width, height - 2, radius);

            rect.attr({
                stroke: 'rgba(0,0,255,0.5)',
                'stroke-width': 1,
                fill: 'rgba(' + value + ',150,255,0.5)'
            });
            var width_this = value + initParams.zeroPadding;
            var height_this = initParams.height;
            var this_location = y + 10;
            var this_shift = y;
            if (initParams.alignment == 'portrait') {
                height_this = [width_this, width_this = height_this][0];
                this_location = x + 10;
                this_shift = y - height_this + 5;
            }


            var this_x = (initParams.alignment == "portrait") ? (this_location) : (width_this + 15 + initParams.x);
            var this_y = (initParams.alignment == "portrait") ? (initParams.canvasHeight - (height_this + initParams.x) + 20) : (this_location);
            if (initParams.alignment == 'portrait') {
                vm.y(this_y);
            }

            vm.height(height_this);
            vm.width(width_this);


            /*//assign labels
             (function (x, y, width_this, height_this, this_location) {
             var animationObj = Raphael.animation({width: width_this, height: height_this, y: this_shift}, 900, "bounce", function () {
             var this_x = (initParams.alignment == "portrait") ? (this_location) : (width_this + 15 + initParams.x);
             var this_y = (initParams.alignment == "portrait") ? (initParams.canvasHeight - (height_this + initParams.x) + 5) : (this_location);
             //paper.text(this_x, this_y+6, value);
             });
             rect.animate(animationObj.delay(150 * i));
             //rect.animate({width: value}, 900,
             })(x, y, width_this, height_this, this_location);*/


            $(rect.node).qtip({
                content: {
                    text: "Value = "+value
                },
                show: {
                    effect: function() {
                        $(this).slideDown();
                    }
                },
                position: {
                    target: 'mouse', // Track the mouse as the positioning target
                    adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
                }
            });





            //attach events
            (function(value, i){
                rect.click(function(){
                    console.log(value + ':' + i) ;
                })
            })(value,i);



            return rect;
        }







        /*$(initParams.data.arr1).each(function(i, value){
         //var value1 = initParams.data.arr1[i];
         var radius = 1;
         var y = initParams.y+i*30;
         var x = initParams.x;
         var height = initParams.height;
         var width = initParams.zeroPadding; //initial width for animation

         if(initParams.alignment == 'portrait'){
         y = initParams.canvasHeight - [x,x=y][0] + 15;
         height = [width,width=height][0];
         }

         var rect = paper.rect( x, y, width, height, radius );

         rect.attr({
         stroke: 'rgba(0,0,255,0.5)',
         'stroke-width': 1,
         fill: 'rgba('+value+',150,255,0.5)'
         });
         var width_this = value+initParams.zeroPadding;
         var height_this = initParams.height;
         var this_location = y + 10;
         var this_shift = y;
         if(initParams.alignment == 'portrait'){
         height_this = [width_this,width_this=height_this][0];
         this_location = x + 10;
         this_shift = y-height_this + 5;
         }

         //assign labels
         (function(x, y, width_this, height_this, this_location) {
         var animationObj = Raphael.animation({width: width_this, height: height_this, y: this_shift}, 900, "bounce", function (){
         var this_x = (initParams.alignment=="portrait") ? (this_location) : (width_this + 15 + initParams.x);
         var this_y = (initParams.alignment=="portrait") ? (initParams.canvasHeight - (height_this + initParams.x) + 5) : (this_location);
         //paper.text(this_x, this_y-6, value);
         });
         rect.animate(animationObj.delay(150*i));
         //rect.animate({width: value}, 900,
         })(x,y, width_this, height_this, this_location);


         $(rect.node).qtip({
         content: {
         text: "Value = "+value
         },
         show: {
         effect: function() {
         $(this).slideDown();
         }
         },
         position: {
         target: 'mouse', // Track the mouse as the positioning target
         adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
         }
         });





         //attach events
         (function(value, i){
         rect.click(function(){
         console.log(value + ':' + i) ;
         })
         })(value,i);



         });*/



        /*$(initParams.data.arr2).each(function(i, value){
         //var value1 = initParams.data.arr1[i];
         var radius = 1;
         var y = initParams.y+i*30;
         var x = initParams.x;
         var height = initParams.height;
         var width = initParams.zeroPadding; //initial width for animation

         if(initParams.alignment == 'portrait'){
         y = initParams.canvasHeight - [x,x=y][0] + 15;
         height = [width,width=height][0];
         }

         var rect = paper.rect( x, y, width, height-2, radius );

         rect.attr({
         stroke: 'rgba(0,0,255,0.5)',
         'stroke-width': 1,
         fill: 'rgba('+value+',150,255,0.5)'
         });
         var width_this = value+initParams.zeroPadding;
         var height_this = initParams.height;
         var this_location = y + 10;
         var this_shift = y;
         if(initParams.alignment == 'portrait'){
         height_this = [width_this,width_this=height_this][0];
         this_location = x + 10;
         this_shift = y-height_this + 5;
         }

         //assign labels
         (function(x, y, width_this, height_this, this_location) {
         var animationObj = Raphael.animation({width: width_this, height: height_this, y: this_shift}, 900, "bounce", function (){
         var this_x = (initParams.alignment=="portrait") ? (this_location) : (width_this + 15 + initParams.x);
         var this_y = (initParams.alignment=="portrait") ? (initParams.canvasHeight - (height_this + initParams.x) + 5) : (this_location);
         //paper.text(this_x, this_y+6, value);
         });
         rect.animate(animationObj.delay(150*i));
         //rect.animate({width: value}, 900,
         })(x,y, width_this, height_this, this_location);


         $(rect.node).qtip({
         content: {
         text: "Value = "+value
         },
         show: {
         effect: function() {
         $(this).slideDown();
         }
         },
         position: {
         target: 'mouse', // Track the mouse as the positioning target
         adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
         }
         });




         //attach events
         (function(value, i){
         rect.click(function(){
         console.log(value + ':' + i) ;
         })
         })(value,i);

         //createRectangle

         }

         });*/
    }


    var1 = setTimeout(init(),5000);

    return this;



}
