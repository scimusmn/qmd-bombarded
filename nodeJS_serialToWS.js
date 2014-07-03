/*******************************************
// For websockets, require 'ws'.Server
********************************************/


var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

//Tell the wsServer what to do on connnection to a client; 

var webSock = null;
var sp = null;

wss.on('connection', function(ws) {
	
	webSock = ws;
	
    ws.on('message', function(message) {
    	var data = message.split("|");
        switch(data[0]){
        	case "c":
        		for(var i in wss.clients){
        			wss.clients[i].send(message);
        			console.log(i);
        		}
        		break;
        	case "r":
        		if(sp) sp.write(data[1]+"|");		
        		break;
			default:
				
				break;
		}
		console.log(message);
    });
	
	ws.on('close',function(){
		webSock=null;
	});

	ws.on('error',function(error){
		webSock=null;
		console.log("Error: "+error);
	});
	
});

////////////////////////////////////////////////////////
// Use the library                                    //
// git://github.com/voodootikigod/node-serialport.git //
// to read the serial port where arduino is sitting.  //
////////////////////////////////////////////////////////               
var com = require("serialport");
var bufSize = 512;

sp = new com.SerialPort("/dev/cu.usbmodemfd121", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n'),
    buffersize:bufSize
  });

sp.on('open',function() {
  sp.on('data', function(data) {
    if(webSock) webSock.send("r|"+data);
  });

  /*function writeThenDrainThenWait(duration) {
    console.log('Calling write...');
    sp.write(message, function() {
      console.log('...Write callback returned...');
      // At this point, data may still be buffered and not sent out from the port yet (write function returns asynchrounously).
      console.log('...Calling drain...');
      sp.drain(function() {
        console.log('...Drain callback returned...');
        console.log('...Waiting', duration, 'milliseconds...');
        setInterval(writeThenDrainThenWait, duration);
      });
    });
  };



  // Stuff starts happening here
  writeThenDrainThenWait(1000);*/
  //writeThenWait(1000);

});