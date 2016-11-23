requirejs.config({
    baseUrl: 'script',
    paths: {
        d3: "d3.min",
        lodash: "lodash.min"
    }
});

requirejs(["d3", "animatebins", "dataloader", "packer", "solutionchecker"], function (d3, Anim, data, Packer, checker) {
    var animator = new Anim({});
    var packer = new Packer();
    var datasets = ["data/data", "data/data2"];

    var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
        .data(datasets);

    datasetpicker.enter()
        .append("input")
        .attr("value", function (d) { return "Dataset " + d })
        .attr("type", "button")
        .attr("class", "dataset-button")
        .on("click", function (d) {
            data.loadDataset(d,
                function (packs, bins) {
                    animator.setup(bins);
                    animator.showData(packs);
                    d3.select("button#play")
                        .on("click", function () {
                            var clonedBins = JSON.parse(JSON.stringify(bins));
                            var clonedPacks = JSON.parse(JSON.stringify(packs));
                            var packsById = {};
                            for (var i = 0; i < packs.length; i++) {
                                var pack = packs[i];
                                packsById[pack.packId] = pack;
                            }
                            var startTime = performance.now();
                            var packed = packer.pack(clonedBins, clonedPacks);
                            var endTime = performance.now();
                            
                            for (var i = 0; i < packed.length; i++) {
                                var pack = packed[i];
                                packsById[pack.packId].left = pack.left;
                                packsById[pack.packId].top = pack.top;
                                packsById[pack.packId].rotate = pack.rotate;
                                packsById[pack.packId].bin = pack.bin;
                            }
                            var result = checker.check(bins, packs);
                            result.timeSpent = endTime - startTime;

                            animator.showData(packs, result);
                        });
                });
        });

});
