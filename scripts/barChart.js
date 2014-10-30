/**
 * Created by rohit.misra on 30/10/2014.
 */
function barChart(params){
    var initParams = {
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
        y: 50
    };

    jQuery.extend(initParams,params);



    var svgEl = document.getElementById(initParams.target);
    console.log(initParams.x);
    var paper = Raphael( svgEl, initParams.canvasWidth, initParams.canvasHeight );

    // Draw a rectangle with rounded corners

    //the axis
    var axis = paper.rect( initParams.x, 10, 1, 800, 0 );
    axis.attr({
        stroke : 'rgba(0,0,255,0.5)',
        'stroke-width' : 1
    });

    initParams.data.arr1.forEach(function(value, i){
        //var value1 = initParams.data.arr1[i];
        var radius = 1;
        var y = initParams.y+i*30;
        var rect = paper.rect( initParams.x, y, 0, initParams.height, radius );

        rect.attr({
            stroke: 'rgba(0,0,255,0.5)',
            'stroke-width': 1,
            fill: 'rgba('+value+',150,255,0.5)'
        });

        (function(y) {
            var animationObj = Raphael.animation({width: value}, 900, "bounce", function () {
                console.log(y);
                paper.text(initParams.x + value + 15, y + 10, value);
            });
            rect.animate(animationObj.delay(150*i));
            //rect.animate({width: value}, 900,
        })(y);
    });


    console.log(rect);


}
