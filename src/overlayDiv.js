function overlayDiv (el){
	var self = this;
	
	this.div = el;
	this.display = false;
	
	this.resize = function(w,h){
		self.div.setAttribute("style","height: "+h+"px; width: "+w+"px;");
	}
	
	this.hide = function(){
		this.div.style.display = "none";
		this.display = false;
	}
	
	this.show = function(){
		this.div.style.display = "table";
		this.display = true;
	}
};