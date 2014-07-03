(function (app) {
	var intervalId, canvas, canvasCtx, ascii, btnStart, btnStop;

	var loopSpeed = 20;
	var width = 160;
	var height = 120;
	
	app.width = window.innerWidth;
	app.height = window.innerHeight;
 
    var winner = new overlayDiv($("winBox"));
	
	var timer =null;
	
	app.resize = function (){
		app.width = window.innerWidth;
		app.height = window.innerHeight;
		
		countdown.resize(app.width,app.height);
		
		frame.resize(app.width,app.height);
		frame.drawFrame();
 
        winner.resize(app.width,app.height);
	}
	

    app.init = function () {
    	app.resize();
		canvas = document.getElementById("main");
		canvasCtx = canvas.getContext("2d");
        
        intervalId = setInterval(app.loop, loopSpeed);
    };
    
	function newBall(color){
		var ball = document.createElement("div");
		ball.setAttribute('class',"ball");
		ball.setAttribute('style',"background-color:"+color.string());
		var symb = (color.value>=0)?"+":"";
		ball.innerHTML = symb+color.value;
		$(color.name+"Div").appendChild(ball);
		$("footer").innerHTML = color.message;
		$("score").innerHTML=parseInt($("score").innerHTML)+color.value;
		$("score").style = "";
	}

    app.loop = function () {
		var gray;
		var character, line = "";

		//clear canvas
		canvasCtx.clearRect (0, 0, width, height);

		//draw the video frame
		canvasCtx.drawImage(cam.img, 0, 0, width, height);
		
		var pixels = canvasCtx.getImageData(0, 0, width, height);
		var colordata = pixels.data;
		
		
		var pos = 4*(width/2+width*height/2);
		
		if(gameTimer.running){
			var ballColor = colorTester.check(colordata[pos],colordata[pos+1],colordata[pos+2]);
			if(ballColor) newBall(ballColor);
		}
		
		//frame.drawFrame();
    };
    
    app.reset = function(){
    	var divs = $("balls").childNodes;
    	for(var i=0; i<divs.length; i++){
    		divs[i].innerHTML="";
    	}
		$("score").innerHTML=0;
		$("footer").innerHTML="";
    }
    
    app.startGame = function(){
    	if(!gameTimer.running){
			if($("intro").paused){
				$("intro").play();
                $("instruct").style.display="block";
                $("scorebox").style.display="none";
				countdown.delayStart(($("intro").duration-4)*1000);
				app.reset();
			}
			else if(!countdown.started){
				$("intro").currentTime=$("intro").duration-4;
				countdown.start();
			}
		}
    }
 
    app.endGame = function(){
        webSockClient.send("c|"+clientID+"|score="+parseInt($("score").innerHTML));
        $("outro").play();
    }
 
    gameTimer.endCB = app.endGame.bind(app);
 
    var handleMsg = function(evt){
		var data = evt.data.split("|");
		console.log(evt.data);
		if(data[0]=="r") arduino.onMessage(data[1]);
		else if(data[0]=='c'){
			switch(data.last().split("=")[0]){
				case "reset":
					app.startGame();
					break;
				case "score":
                    if(data[1]!=clientID){
                        var oppScore = data.last().split("=")[1]
                        if(oppScore>parseInt($("score").innerHTML)) $("winText").innerHTML = "Opponent Wins!";
                        else if(oppScore<parseInt($("score").innerHTML)) $("winText").innerHTML = "You Win!";
                        else $("winText").innerHTML = "It's a tie!";
                        winner.show();
                        setTimeout(winner.hide.bind(winner),7000);
                    }
					break;
				default:
					break;
			}
		}
	}
	
	webSockClient.setMsgCallback(handleMsg);
    
    document.onkeydown = function(e) {
		switch (e.which) {
			// key code for left arrow
			case charCode('A'):
				if(!winner.display&&$("outro").paused) webSockClient.send("c|reset");
				//app.startGame();
				break;
			case charCode('T'):
				test();
				break;
		}
	}
 
    app.init();
    setTimeout(app.resize,500);
	window.onresize = app.resize;
	
}(window.app = window.app || {}));