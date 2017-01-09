define([], function () {
    function Packer(){
        var self = this;
        
	    self.pack = function (bins, packs) {

			//Container for keeping track of bin matrix
        	var binHandler = new Array();
        	for (var bin = 0; bin < bins.length; bin++) {

        		binHandler[bin] = new Array(bins[bin].height);
				for (var r = 0; r < bins[bin].height; r++) {

        			binHandler[bin][r] = new Array(bins[bin].width);
        			for (var c = 0; c < binHandler[bin][r].length; c++) {
				        binHandler[bin][r][c] = false;
			        }
				}
        	}

        	for (var packNumber = 0; packNumber < packs.length; packNumber++) {
        		var currentBin = -1;
		        var coordinates = [-1, -1];
        		for (var binNumber = 0; binNumber < bins.length; binNumber++) {
					
        			coordinates = placeAt(packs[packNumber], binHandler, binNumber);
        			if(coordinates[0] > -1 && coordinates[1] > -1) {
		        		currentBin = binNumber;
						break;
		        	}
		        }

				//If no bin assigned skip it
        		if (currentBin < 0) continue;

        		packs[packNumber].top = coordinates[0];
		        packs[packNumber].left = coordinates[1];
				packs[packNumber].bin = bins[currentBin].binId;
				
				//Block matrix for used space
		        blockAt(packs[packNumber], binHandler, currentBin);
	        }

            return packs;
	    }

	    function blockAt(pack, binHandler, number) {
		    for (var row = pack.top; row < pack.top + pack.height; row++) {
		    	for (var column = pack.left; column < pack.left + pack.width; column++) {
				    binHandler[number][row][column] = true;
			    }
		    }
	    }

		/// Should be able to not only traverse matrix based on rows but also columns should do. Second column should also accept packages
	    function placeAt(pack, binHandler, number) {
	    	for (var startColumn = 0; startColumn < binHandler[number][0].length; startColumn++) {

			    var rowsFree = 0;
			    for (var row = 0; row < binHandler[number].length; row++) {
				    
					rowsFree++;
					var columnsFree = 0;
				    for (var column = startColumn; column < binHandler[number][row].length; column++) {
					    if (binHandler[number][row][column] === false) {
					    	columnsFree++;

						    if (rowsFree === pack.height && columnsFree === pack.width) {
							    return [(row + 1) - pack.height, (column + 1) - pack.width];
						    }
					    } else {
						    columnsFree = 0;
						    rowsFree = 0;
					    }
				    }
			    }
		    }

		    return [-1, -1];
	    }
    }
    return Packer;
});