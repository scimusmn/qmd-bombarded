function palette(){
	var colors = [];
	
	var rgbRef = null;
	
	this.color = function (i){
		return colors[i];
	}
	
	this.init = function(){
		colors.length=0;
		var cols = $(".color");
		for(var i=0; i<cols.length; i++){
			var newCol = new color(cols[i].id);
			newCol.message = cols[i].innerHTML;
			var rgb = cols[i].getAttribute("color").split(',');
			newCol.teach(getNum(rgb[0]),getNum(rgb[1]),getNum(rgb[2]),getNum(cols[i].getAttribute("value")));
			colors.push(newCol);
		}
	}
	
	this.init();
	
	this.newColor = function(colorName){
		var newCol = new color(colorName);
		var newPos = colors.push(newCol)-1;
	}
	
	this.findColor = function(col){
		var compVal = 1;
		var found = 0;
		for(var i=0; i<colors.length; i++){
			if(colors[i].taught){
				var comp = colors[i].compare(col);
				//console.log(colors[i].name+":" + comp);
				if(!isNaN(comp)){
					if(comp<=compVal) {
						compVal=comp;
						found=i+1;
						//console.log(colors[i].name+":"+comp);
					}
				}
			}
		}
		if(found&&compVal<.5){
			return colors[found-1];
			
		}
		else return null;
	}
}

var colors = new palette();

