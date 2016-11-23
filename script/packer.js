/*
This is the file you are supposed to change. Good luck!!!
*/

define([], function () {
    function Packer(){
        var self = this;
        self.pack = function(bins, packs){
            // Naive implementation: place one pack in every bins
            for(var i = 0; i<bins.length; i++){
                if(packs.length > i){
                    packs[i].bin = bins[i].binId;
                }
            }
            return packs;

            // hardcoded solution
            // [[0,0,false], [80,0,true], [100,0,false], [120, 0, true], [100,30,false]].forEach(function(e, i){
            //     if(i>=packs.length)return;
            //     packs[i].left = e[0];
            //     packs[i].top = e[1];
            //     packs[i].rotate = e[2];
            //     packs[i].bin = bins[1].binId;
            // });
        }
    }
    return Packer;
});
