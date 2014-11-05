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

    jQuery.extend(initParams,params);



    var svgEl = document.getElementById(initParams.target);
    console.log(initParams.x);
    var paper = Raphael( svgEl, initParams.canvasWidth, initParams.canvasHeight );

    // Draw a rectangle with rounded corners

    //the axis

    var axis = initParams.alignment=="portrait"? paper.rect( 10, initParams.canvasHeight - 30,initParams.canvasWidth,1,0) :paper.rect( initParams.x, 10, 1, 800, 0 );
    axis.attr({
        stroke : 'rgba(0,0,255,0.5)',
        'stroke-width' : 1
    });

    $(initParams.data.arr1).each(function(i, value){
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
                paper.text(this_x, this_y, value);
            });
            rect.animate(animationObj.delay(150*i));
            //rect.animate({width: value}, 900,
        })(x,y, width_this, height_this, this_location);

        //attach events
        (function(value, i){
            rect.click(function(){
                console.log(value + ':' + i) ;
            })
        })(value,i);



    });


}
