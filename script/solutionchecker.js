define(["lodash"], function (_) {
    function pairwise(list) {
        if (list.length < 2) { return []; }
        var first = list[0],
            rest  = list.slice(1),
            pairs = rest.map(function (x) { return [first, x]; });
        return pairs.concat(pairwise(rest));
    }
    function overlaps(r1, r2) {
        return !(r2.left >= r1.left + width(r1) || 
                r2.left + width(r2) <= r1.left || 
                r2.top >= r1.top + height(r1) ||
                r2.top + height(r2) <= r1.top);
    }
    function width(e){
        return e.rotate ? e.height : e.width;
    }
    function height(e){
        return e.rotate ? e.width : e.height;
    }

    return {
        check:function(bins, packs){
            var result = {ok:true, problems:{outsideBin:[], overlaps:[], all:[]}, score:{packed:0, packedPt:0, usedBins:0, usedBinsPt:0, total:0}};
            var binById = _.keyBy(bins, 'binId');
            //var packById = _.keyBy(packs, 'packId');

            _.each(packs, function(p){
                if(p.bin === "")return;
                var b = binById[p.bin];
                if(p.left < 0 || p.top < 0 || p.left + width(p) > b.width || p.top + height(p) > b.height){
                    result.ok = false;
                    result.problems.outsideBin.push(p.packId);
                }
            });
            _.each(_.groupBy(packs, 'bin'), function(v, k){
                if(k === "")return;
                var pairs = pairwise(v);
                _.each(pairs, function(pair){
                    if(overlaps(pair[0], pair[1])){
                        result.ok = false;
                        result.problems.overlaps.push(pair[0].packId);
                        result.problems.overlaps.push(pair[1].packId);
                    }
                });
            });
            result.problems.all = _.uniq(_.concat(result.problems.overlaps, result.problems.outsideBin));
            if(result.ok){
                var packed = _.filter(packs, function(p){
                    return p.bin !== "" ;
                });
                result.score.packedPt = _.reduce(packed, function(a,v){
                    var score = v.height * v.width;
                    return a + score;
                }, 0);
                result.score.packed = packed.length;
                var usedBins = _.without(_.uniq(_.map(packs, 'bin')), '');
                result.score.usedBins = usedBins.length;
                result.score.usedBinsPt = _.reduce(usedBins, function(a,v){
                    var cost = (binById[v].height * 2) + (binById[v].width * 2) * 10;
                    return a + cost;
                }, 0);
            }
            result.score.total = Math.max(0, result.score.packedPt - result.score.usedBinsPt);
            return result;
        }

    };
});
