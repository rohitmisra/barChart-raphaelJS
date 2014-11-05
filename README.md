barChart-raphaelJS
==================

A simple barchart library using RaphaelJS

  - Create simple barcharts
  - Multi color support
  - Landscape/portrait mode
  - Easy configuration
  - 




Installation
--------------

```sh
git clone https://github.com/rohitmisra/barChart-raphaelJS.git
cd barChart-raphaelJS
npm install


##### for an illustration:

grunt connect:example

```

Usage
-----

```
var chart = new barChart({
                canvasWidth: 1400,
                canvasHeight: 600,
                width: 0,
                target: 'graph',
                height: 20,
                data: {
                    arr1: [400,344,23,124,1,2,10,12,324]
                },
                alignment: 'portrait'
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


