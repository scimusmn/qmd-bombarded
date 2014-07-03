var colorTester = new function(){
	var sampCol = new color("default");
	var newCol = new color("new");
	var testCol = new color("test");
	var black = new color("black");
	
	black.set(1,1,1);
	sampCol.set(50,50,50);
	newCol.set(50,50,50);
	
	this.test = function (){
		testCol.set(124,126,163);
		var fndCol = colors.findColor(testCol);
		console.log(testCol.string());
		console.log(fndCol.name);
		if(fndCol.name!="default"){
			$("result").innerHTML = fndCol.name;
			$("result").setAttribute('style', "background-color:"+fndCol.string()) ;
		}
	}
	
	this.check = function(rd, gn, bl){
		sampCol.set(rd,gn,bl*.95);
		
		var blackSamp = sampCol.shadeFit(0,0,0);
		
		if(blackSamp>.3&&!colAve.limit()){
			$("swatch").setAttribute('style', "background-color:"+sampCol.string()) ;
			colAve.addSample(sampCol,sampCol.compare(black));
			$("swatch2").setAttribute('style', "background-color:"+colAve.averageColor().string()) ;
			newCol.set(colAve.averageColor());
		}
		else if(blackSamp<.3&&colAve.averaging()&&!colAve.limit()){
			colAve.clearSamples();
			var foundCol = colors.findColor(newCol);
			if(foundCol){
				console.log(foundCol.name);
				$("fndCol").innerHTML = foundCol.name;
				$("fndCol").setAttribute('style', "background-color:"+foundCol.string()) ;
				
				return foundCol;
			}
			
		}
		else if(colAve.limit()) colAve.clearSamples();
		return null;
	}
};