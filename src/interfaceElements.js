var gameTimer = new function(){
	var self =  this;
	
	this.running = false;
	var timer =null;
	
	this.startTime =60;
	this.time = 6;
	
	this.endCB = null;
	
	this.begin = function(){
		$("timerBox").style.display="table";
		this.running=true;
		this.time = this.startTime;
		$("timer").innerHTML = self.time;
		clearInterval(timer);
		timer = setInterval(self.update,1000);
	}
	
	this.end = function(){
		if(this.endCB) this.endCB();
		this.running = false;
		$("timerBox").style.display="none";
		clearInterval(timer);
		arduino.digitalWrite(12,0);
	}
	
	this.update = function(){
		self.time--;
		$("timer").innerHTML = self.time;
		if(self.time<=0) self.end();
	}
}

var countdown = new function(){
	var self = this;

	var cDown = new overlayDiv($("countdown"));
	var timer=null;

	var tweenTime=750;
    //var step=0;
    //var steps=10;
    var count =3;
    this.started = false;
    
    /*function tween(){
    	$("cdText").setAttribute("style","opacity: "+step/steps+";");
    	step--;
    	if(step>0) setTimeout(tween,tweenTime/steps);
    }*/
    
    this.start = function(){
    	count=3;
    	$("cdText").innerHTML = count;
    	//step=10;
    	//setTimeout(tween,tweenTime/steps);
		$("skipNote").style.display = "none";
        $("instruct").style.display="none";
        $("scorebox").style.display="block";
    	self.started =true;
    	clearTimeout(timer);
    	timer = setTimeout(self.updateCountdown,tweenTime);
    	arduino.digitalWrite(12,1);
    }
    
    this.updateCountdown = function(){
    	if(count>0){
			count--;
			$("cdText").innerHTML = ((count)?count:"GO!");
			timer = setTimeout(self.updateCountdown,tweenTime);
		}
		else {
			console.log("hiding screen");
    		cDown.hide();
    		$("cdText").innerHTML = "Get Ready!"
    		gameTimer.begin();
    		clearTimeout(timer);
    		self.started = false;
    	}
    }
    
    this.resize = function(w,h){
    	cDown.resize(app.width,app.height);
    }
    
    this.delayStart = function(time){
    	cDown.show();
		timer=setTimeout(self.start,time);
		$("skipNote").style.display = "block";
    }
}