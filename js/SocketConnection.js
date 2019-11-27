var SocketConnection = function(attr) {

  this.ip = attr.ip;
  this.port = attr.port;

  this.socket;

  this.action = function(val){
  console.log(val);  
  };


  this.connect = function(){
    console.log('http://'+this.ip+':'+this.port);
    this.socket = io('http://'+this.ip+':'+this.port);

    this.socket.on('connect', function(){
      console.log("connected to server");
    });
    this.socket.on('disconnect', function(){
       console.log("disconnected from server");
    });
    this.socket.on('mes', function(data){
      console.log(data);
      data = JSON.parse(data);
      data = parseInt(data);
      this.action(data);
    });
  }
}
