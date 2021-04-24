const express = require('express');
const path = require("path");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const helmet = require("helmet");
var cors = require('cors');
const io = new Server(server);
// Middlewares
// This sets custom options for the `referrerPolicy` middleware.
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// static files
app.use("/",express.static(path.join(__dirname, "/")));
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000/socket.io/?EIO=3&transport=polling&t=Na6Arf5"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//redirect
app.get('/', function(req, res){
  res.redirect('/');   
});

io.on('connection', (socket) => {
  socket.emit('init', { data: 'hello world'});
});
// io.on('connection', client => {
//   client.emit('init', {data: "Hi!!!"});
// });

server.listen(8000, () => {
  console.log('listening on *:8000');
});