barChart-raphaelJS
==================

A simple barchart library using RaphaelJS

  - Create simple barcharts
  - Comparable view
  - Landscape or portrait modes
  - Tooltip for value on hover
  - Multi color support
  - Landscape/portrait mode
  - Easy configuration
  - Support for IE 6+




Installation
--------------

```sh
git clone https://github.com/rohitmisra/barChart-raphaelJS.git
cd barChart-raphaelJS
npm install


##### for an illustration:

grunt connect:example

```
Now the example page can be accessed via http://localhost:9001/barChart.html


Usage
-----

```
var chart = new barChart({
                canvasWidth: 1000,
                canvasHeight: 600,
                width: 0,
                target: 'graph',
                height: 20,
                data: {
                    arr1: [400,344,23,124,1,2,10,12,324]
                    arr2: [134,223,14,110,1,2,10,12,323]
                },
                alignment: $('input[name="alignment"]:checked').val() //Pickup from Radio button
            });


.
.
.
<div id="graph">
</div>

```

Watch a live demo [here](http://rohitmisra.de/barChart.html)

License
----

MIT


