const express = require('express');
const path = require("path");
const app = express();
const httpServer = require('http').createServer(app);
// Init the io 
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:8000/"],
    methods: ["GET", "POST"]
  }
});
// modules uses
const { gameLoop, getUpdated, initGame } = require("./games/3and2/game");
const { makeId } = require("./utils/utils");
const state = {};
const clientRooms = {};
//middlewares
const helmet = require("helmet");
const cors = require('cors');
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({
     extended: true
   }));
//static files
app.use("/",express.static(path.join(__dirname, "/")));
//redirect
app.get('/', function(req, res){
    res.redirect('/');   
  });
// Put a io connection
io.on('connection', client =>{
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('key', handleKey);
  //function to handle join of other player
  function handleJoinGame (roomName) {
    const { rooms } = client;
    let numClients;
    if (rooms){
      numClients = rooms.size;
    }
    if (numClients == 0) {
      client.emit('unknownCode');
      console.log('unknownCode');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      console.log('tooManyPlayers');
    }
    clientRooms[client.id] = roomName;
    client.join(roomName);
    console.log("Player 2: Join to the play");
    client.number = 2;
    client.emit('init',2);
    startGameInterval(roomName);
  } 
  //function to handle new game
  function handleNewGame (){
      let roomName = makeId(5);
      clientRooms[client.id] = roomName;
      client.emit('gameCode', roomName);
      state[roomName] = initGame();
      client.join(roomName);
      console.log("Player 1: Join to the play");
      client.number = 1;
      client.emit('init', 1); 
  }
  function handleKey (keyCode){

  }
});
//connection functions
// Interval handling function
function startGameInterval (roomName){
  const intervalId = setInterval(() =>{
    const winner = gameLoop(state[roomName]);
    if (!winner){
      emitGameState(roomName, state[roomName]);
    } else {
      emitGameOver(roomName, winner);
      state[roomName] = null;
      clearInterval(intervalId);
    }
  });
}
//
function emitGameState (roomName, state){
  io.sockets.in(roomName)
    .emit('gameState', JSON.stringify(state));
}
//
function emitGameOver (roomName, winner) {
  io.sockets.in(roomName)
    .emit('gameOver', JSON.stringify({ winner }));
}
//io.listen(8000);
httpServer.listen(8000, () => {
    console.log('listening on *:8000');
  });