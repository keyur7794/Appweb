
   var socket=io();

   socket.on('connect',function(){
     console.log('connected to server');

     socket.emit('createMessage',
   {
     from:'keyur',
     text:'hello',
     createAt:'123456'
   });

   });
  socket.on('disconnect',function(){
    console.log('disconnect');
  });

  socket.on('newMessage',function(message){
    console.log('new message',message);
  });
