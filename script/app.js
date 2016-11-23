requirejs.config({
    baseUrl: 'script',
    paths: {
        d3: "d3.min"
    }
});

requirejs(["d3"], function(d3) {

      var margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = 960 - margin.left - margin.right,
          height = 430 - margin.top - margin.bottom,
          datasets = ["data/data.tsv", "data/data2.tsv"];

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      var heatmapChart = function(tsvFile) {
        d3.csv(tsvFile,
        function(d) {
            d.height = Number(d.height);
            d.width = Number(d.width);
            d.top = Number(d.top);
            d.left = Number(d.left);
          return d;
        },
        function(error, data) {
          var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

          var cards = svg.selectAll(".box")
              .data(data, function(d) {return d.blockId;});
          //update
          cards
              .transition()
              .attr("x", function(d) { 
                return d.left; 
                })
              .attr("y", function(d) { return d.top; });

          //enter
          cards.enter().append("rect")
              .transition()
              .attr("x", function(d) { 
                return d.left; 
                })
              .attr("y", function(d) { return d.top; })
              .attr("width", function(d){return d.width;})
              .attr("height", function(d){return d.height;})
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "box bordered")
              .style("fill", function(d) { 
                  return colorScale(d.blockId); 
                  });

          
          //exit
          cards.exit().remove();
        });  
      };

      heatmapChart(datasets[0]);
      
      var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
        .data(datasets);

      datasetpicker.enter()
        .append("input")
        .attr("value", function(d){ return "Dataset " + d })
        .attr("type", "button")
        .attr("class", "dataset-button")
        .on("click", function(d) {
          heatmapChart(d);
        });


});
