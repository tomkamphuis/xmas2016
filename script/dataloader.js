define(["d3"], function (d3) {
    return {
        loadDataset: function (name, cb) {
            d3.csv(name + ".packs.tsv",
                function (d) {
                    d.height = Number(d.height);
                    d.width = Number(d.width);
                    d.top = Number(d.top);
                    d.left = Number(d.left);
                    d.rotate = Boolean(Number(d.rotate));
                    return d;
                },
                function (packs) {
                    d3.csv(name + ".bins.tsv",
                        function (d) {
                            d.height = Number(d.height);
                            d.width = Number(d.width);
                            return d;
                        },
                        function (bins) {
                            cb(packs, bins);
                        }
                    );
                });
        }
    };
});
