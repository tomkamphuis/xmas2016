define(['d3'], function (d3) {
    function animator() {
        var self = this;

        var margin = { top: 10, right: 0, bottom: 0, left: 10 },
            width = 960 - margin.left - margin.right,
            height = 430 - margin.top - margin.bottom;
        var topTrayHeight = 100;
        var gutterSize = 10;
        var rowHeight = 150;

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g");

        var binsById = {};

        self.setup = function (bins) {
            var collect = 0;
            var row = 0;
            for(var i = 0 ; i<bins.length; i++){
                var b = bins[i];
                binsById[b.binId] = b;
                if(collect + b.width > width){
                    row++;
                    collect = 0;
                }                
                b._left = collect;
                b._row = row;
                b._top = (b._row + 1) * (rowHeight + gutterSize) - gutterSize - b.height;
                collect += gutterSize + b.width;
            }

            var set = function(selection){
                selection
                    .transition()
                    .attr("x", function (d) {
                        return binsById[d.binId]._left + margin.left;
                    })
                    .attr("y", function (d) { return margin.top + gutterSize + topTrayHeight + d._top; })
                    .attr("width", function (d) { return d.width;})
                    .attr("height", function (d) { return d.height; })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("class", "bin bordered");
            }

            var rects = svg.selectAll(".bin")
                .data(bins, function (d) { return d.binId; });
            set(rects.enter().append("rect"));

            set(rects);

            rects.exit().remove();
         }

        self.showData = function (data, result) {
            result = result || {ok: true, score:{}, problems:{}};
            var errors = result.problems.all || [];
            var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
            var set = function(selection){
                selection
                    .transition()
                    .delay(function(e,i,c){
                        if(e.bin === "")return 0;
                        return (1500/c.length) * i;
                    })
                    .duration(200)
                    .attr("x", function (d, i) {
                        if(d.bin === ""){
                            return margin.left + i * 20;
                        }
                        return margin.left +  binsById[d.bin]._left +  d.left;
                    })
                    .attr("y", function (d, i) 
                    {
                        if(d.bin === ""){
                            return margin.top + ((i % 5) * 7);
                        } 
                        return margin.top + topTrayHeight + gutterSize + binsById[d.bin]._top + d.top; 
                    })
                    .attr("width", function (d) { return d.rotate ? d.height : d.width; })
                    .attr("height", function (d) { return d.rotate ? d.width : d.height; })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("class", function(d){
                        return "box bordered" + (errors.indexOf(d.packId) > -1 ? " error" : "");

                    } )
                    .style("fill", function (d) {
                        return colorScale(d.packId);
                    });
            }

            var cards = svg.selectAll(".box")
                .data(data, function (d) { return d.packId; });

            //update
            set(cards);

            //enter
            set(cards.enter().append("rect"));

            //exit
            cards.exit().remove();

            d3.select("#score")
                .attr("class", result.ok ? "ok" : "not-ok");
            d3.select("#score #val-time")
                .text(Number(result.timeSpent).toPrecision(5));
            d3.select("#score #val-packnr")
                .text(result.score.packed);
            d3.select("#score #val-packpt")
                .text(result.score.packedPt);
            d3.select("#score #val-binnr")
                .text(result.score.usedBins);
            d3.select("#score #val-binpt")
                .text(result.score.usedBinsPt);
            d3.select("#score #val-totalpt")
                .text(result.score.total);

        };
    }
    return animator;
});
