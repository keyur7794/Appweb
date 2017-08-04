const path=require('path');
const http=require('http');
const {isRealString}=require('./utils/validate');
const {Users}=require('./utils/users');
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
var users=new Users();

io.on('connection',(socket)=>{
  console.log('new user connected');


socket.on('join',(param,callback)=>{

if(!isRealString(param.name) || !isRealString(param.room) )
{
  return callback('name and room are required');
}

socket.join(param.room);
users.removeUser(socket.id);
users.addUser(socket.id,param.name,param.room);

io.to(param.room).emit('updateUserList',users.getUserList(param.room));
socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
socket.broadcast.to(param.room).emit('newMessage',generateMessage('Admin',`${param.name} has joined`));



  callback();
});
socket.on('createMessage',(message,callback)=>{
  console.log('createMessage',message);

io.emit('newMessage',generateMessage(message.from,message.text));
callback('');



});



  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

  });




  socket.on('disconnect',()=>{
    var user =users.removeUser(socket.id);
if(user){
io.to(user.room).emit('updateUserList',users.getUserList(user.room));
io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left`));

}

  });




});
app.use(express.static(publicpath));

server.listen(port,()=>console.log(`server is on port ${port}`));
