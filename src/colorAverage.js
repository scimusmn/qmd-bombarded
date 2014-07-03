var colAve = new function () {
	var samps = [];
	var blkCmp =[];
	
	var sampleLimit = 100;
	
	this.averaging = function(){
		return samps.length;
	}
	
	this.limit = function(){
		return samps.length>=sampleLimit;
	}
	
	this.addSample = function(col,blk){
		var newCol = new color("new");
		newCol.set(col);
		samps.push(newCol);
		blkCmp.push(blk);
	}
	
	this.clearSamples = function(){
		samps.length = 0;
		blkCmp.length =0;
	}
	
	this.averageColor = function(){
		var maxBlk = blkCmp.max();
		var minBlk = blkCmp.min();
		var aves = []
		for(var j=0; j<3; j++){
			aves[j] = 0;
		}
		var weight = 0;
		for(var i=0; i<samps.length; i++){
			//var wght = (maxBlk>minBlk)?((blkCmp[i]-minBlk)/(maxBlk-minBlk)):1;
			var wght =1;
			aves[0] += samps[i].r*wght;
			aves[1] += samps[i].g*wght;
			aves[2] += samps[i].b*wght;
			weight+=wght;
		}
		for(var j=0; j<3; j++){
			aves[j] /= weight;
			aves[j] = Math.round(aves[j]);
		}
		
		
		
		var aveCol = new color("ave");
		aveCol.set(aves[0],aves[1],aves[2]);
		return aveCol;
	}
}