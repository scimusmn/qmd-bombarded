var frame = new function(){
	var self = this;

	var canvas = document.getElementById("frame");
	var ctx = canvas.getContext("2d");
	
	var bgCnvs = $("bgSpiral");
	var bgCtx = bgCnvs.getContext("2d");
	
	var wid=0;
	var hgt=0;
	
	var corner = new Image();
	corner.onload = function(){
	};
	corner.src = "imgs/corner.png";
	
	var border = new Image();
	border.onload = function(){
		self.resize();
	};
	border.src = "imgs/border.png";
	
	var borderSide = new Image();
	borderSide.onload = function(){
		self.resize();
	};
	borderSide.src = "imgs/borderSide.png";
	
	var spiral = new Image();
	spiral.onload = function(){
		self.resize();
	};
	spiral.src = "imgs/bgSpiral.png";
	
	var cWid = 0;
	var cHgt = 0;
	var bWid = 0;
	var bHgt = 0;
	
	this.resize = function(w,h){
		wid=w;
		hgt=h;
		
		canvas.width = w;
		canvas.height = h;
		bgCnvs.width =w;
		bgCnvs.height = h;
		
		cWid = wid/4;
		cHgt = corner.height*cWid/corner.width;
		bWid = wid/10;
		bHgt = border.height*bWid/border.width;
		
		var score = $("scorebox");
		score.setAttribute("style",
			"height: "+Math.floor(cHgt-20)+"px; width: "+Math.floor(wid/2)+"px; top: "+Math.floor(hgt-cHgt)+"px; left: "+ Math.floor(cWid)+"px;");
		$("balls").setAttribute('style',"position: absolute; top:"+(cHgt*2/3)+"px; left:"+(cWid/3)+"px; width:"+(wid-2*cWid/3)+"px; height: "+(hgt-5*cHgt/3)+"px;");
		$("title").setAttribute('style',"position: absolute; top:0px; left:"+(cWid-20)+"px; width:"+(wid/2)+"px; min-height: "+(cHgt/2.5-40)+"px; padding-top:"+(bHgt*.75)+"px;");
		$("footer").setAttribute('style',"font-size:"+cHgt/6+"px;");
		$("timerBox").setAttribute('style',"top: "+(hgt-cHgt)+"px; width:"+cWid+"px; height: "+cHgt+"px;");
		$("$body")[0].setAttribute('style',"font-size:"+(hgt/40)+"px;");
        $("instruct").setAttribute("style","height: "+h+"px; width: "+w+"px;");
	}
	
	this.drawFrame = function(){
		canvas.width=canvas.width;
		
		ctx.save();
		ctx.translate(wid/2,hgt/2);
		for(var i=0; i<wid-cWid*2; i+=bWid){
			ctx.drawImage(border,-wid/2+cWid+i,hgt/2-bHgt,bWid,bHgt);
		}
		for(var i=0; i<wid-cWid*2; i+=bWid){
			ctx.drawImage(border,-wid/2+cWid+i,-(hgt/2),bWid,bHgt);
		}
		for(var i=0; i<hgt-cHgt*2; i+=bWid){
			ctx.drawImage(borderSide,-wid/2,-hgt/2+cHgt+i,bHgt,bWid);
		}
		for(var i=0; i<hgt-cHgt*2; i+=bWid){
			ctx.drawImage(borderSide,wid/2-bHgt,-hgt/2+cHgt+i,bHgt,bWid);
		}
		ctx.drawImage(corner,-wid/2,hgt/2-cHgt,cWid,cHgt);
		
		ctx.scale(1, -1);
		ctx.drawImage(corner,-wid/2,hgt/2-cHgt,cWid,cHgt);
		ctx.scale(-1, 1);
		ctx.drawImage(corner,-wid/2,hgt/2-cHgt,cWid,cHgt);
		ctx.scale(1, -1);
		ctx.drawImage(corner,-wid/2,hgt/2-cHgt,cWid,cHgt);
		ctx.restore();
	}
	
	var rotAmnt =0;
	
	this.drawSpiral = function(){
		bgCtx.save();
		bgCtx.translate(wid/2,hgt);
		bgCtx.rotate(degToRad(rotAmnt));
		bgCtx.drawImage(spiral,-spiral.width/2,-spiral.height/2);
		bgCtx.restore();
	}
	
	this.rotateSpiral = function(){
		rotAmnt+=.1;
		if(rotAmnt>=360) rotAmnt=0;
		self.drawSpiral();
	}
	
	var rotTimer = setInterval(this.rotateSpiral,50);
};
