function color(nm) {
	this.r=0;
	this.g=0;
	this.b=0;
	
	var handler = null;
	
	this.name = nm;
	
	this.message = "";
	
	var self = this;
	
	this.taught =false;
	
	this.value = 0;
	
	this.string = function (){
		return "rgb("+this.r+","+this.g+","+this.b+")";
	}
	
	this.set = function(rd,gn,bl){
		if(typeof rd == "object") this.r=rd.r,this.g=rd.g,this.b=rd.b;
		else this.r=rd,this.g=gn,this.b=bl;
	}
	
	this.shadeFit = function(rd,gn,bl){
		var redFit = Math.pow(Math.abs(this.r-rd)/255.,1);
		var greenFit = Math.pow(Math.abs(this.g-gn)/255.,1);
		var blueFit = Math.pow(Math.abs(this.b-bl)/255.,1);
		
		//console.log("Shade: r:"+redFit+"g: "+greenFit+"b: "+blueFit);
		//console.log("Shade: "+(redFit+greenFit+blueFit)/3);
		return (redFit+greenFit+blueFit)/3;
	}
	
	this.hueFit = function(rd,gn,bl){
		var selfScale =this.r+this.g+this.b;//Math.pow(this.r,2)+Math.pow(this.g,2)+Math.pow(this.b,2);
		var scale = Math.pow(rd,1.9)+Math.pow(gn,1.9)+Math.pow(bl,1.9);
		
		var redFit = Math.abs((this.r/selfScale)-Math.pow(rd,1.9)/scale);
		var greenFit = Math.abs((this.g/selfScale)-Math.pow(gn,1.9)/scale);
		var blueFit = Math.abs((this.b/selfScale)-Math.pow(bl,1.9)/scale);
		
		//console.log("Hue: r:"+redFit+"g: "+greenFit+"b: "+blueFit);
		//console.log("Hue: "+(redFit+greenFit+blueFit));
		return redFit+greenFit+blueFit;
	}
	
	this.compareFxn = function(rd,gn,bl){
		
		return (Math.pow(this.hueFit(rd,gn,bl),1)+Math.pow(this.shadeFit(rd,gn,bl),1))/2;
	}
	
	this.compare = function(rd,gn,bl){
		if(typeof rd == "object") return this.compareFxn(rd.r,rd.g,rd.b);
		else return this.compareFxn(rd,gn,bl);
	}
	
	this.teach = function(rd,gn,bl,val){
		this.value = val;
		this.set(rd,gn,bl);
		this.taught = true;
	}
	
}