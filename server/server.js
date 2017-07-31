const path=require('path');
const http=require('http');
const publicpath =path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicpath);
const {generateMessage,generateLocationMessage}=require('./utils/message');
const express =require('express');
const socketIO=require('socket.io');

const port=process.env.PORT||3000;

var app=express();
var server =http.createServer(app);
var io=socketIO(server);

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));


  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

socket.on('createMessage',(message,callback)=>{
  console.log('createMessage',message);

io.emit('newMessage',generateMessage(message.from,message.text));
callback('');



});



  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

  });




  socket.on('disconnect',()=>{
    console.log('user was disconnect');
  });




});
app.use(express.static(publicpath));

server.listen(port,()=>console.log(`server is on port ${port}`));
