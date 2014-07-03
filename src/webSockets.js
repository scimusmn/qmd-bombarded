function wsClient(){
	var ws;
	var connectInterval;
    var msgCallback = null;
    var self = this;

	this.connect = function(){
        console.log("opening connection");
		if ("WebSocket" in window&&!ws) ws = new WebSocket("ws://"+ipAddress+":8080/"); //ws://echo.websocket.org is the default testing server
        if(ws){
            console.log("connection open");
            clearInterval(connectInterval);
            ws.onopen = function()
            {
                // Web Socket is connected, send data using send()
                ws.send("FIRST");
            };
            
            ws.onerror = function ( error ) {
                connectInterval = setInterval(self.connect,4000);
            }
            
            ws.onmessage = function (evt) {
            };
            
            
            ws.onclose = function(){
                connectInterval = setInterval(self.connect,2000);
            };
            
            if(msgCallback) ws.onmessage = msgCallback;
        }
	}	
	
    self.connect();
    connectInterval = setInterval(self.connect,2000);
    
    
    this.send = function(msg){
    	if(ws) ws.send(msg);
    }
	
	this.setMsgCallback = function(cb){
		if(ws) ws.onmessage = cb;
        else msgCallback =cb;
	}
	
    connectInterval = setInterval(self.connect(),4000);
}

var webSockClient = new wsClient();