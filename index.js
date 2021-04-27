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
const { gameLoop, changeCard, initGame, flipCard, changeTurn} = require("./games/3and2/game");
const { makeId } = require("./utils/makeId");
const state = {};
const turn = {};
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
  client.on('changeCard', handleChangeCard);
  //function to handle join of other player
  function handleJoinGame (roomName) {    
    const { rooms } = client;
    let numClients;
    if (rooms){
      numClients = rooms.size;
    }
    // if (numClients == 0) {
    //   client.emit('unknownCode');
    //   console.log('unknownCode');
    //   return;
    // } else if (numClients > 1) {
    //   client.emit('tooManyPlayers');
    //   console.log('tooManyPlayers');
    // }
    clientRooms[client.id] = roomName;
    client.join(roomName);    
    console.log("Player 2: Join to the play");
    client.number = 2;
    client.emit('init',2);
    turn[roomName] = 1;
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
    const roomName = clientRooms[client.id];    
    if (!roomName){
      return;
    }
    if(keyCode === turn[roomName]){
      state[roomName] = flipCard(state[roomName])
      turn[roomName] = changeTurn(keyCode, turn[roomName]);      
    } else {
      console.log("turno equivocado")
    }
    console.log(turn[roomName])
    return;
  }
  function  handleChangeCard (position, number){
    const roomName = clientRooms[client.id];    
    if (!roomName){
      return;
    }
    if(turn[roomName] === number){      
      state[roomName] = changeCard(state[roomName], number, position);      
      turn[roomName] = changeTurn(number, turn[roomName]); 
      emitGameState(roomName, state[roomName]); 
    } else {
      console.log("Turno equivocado")
    }   
    return;
  }
});
//connection functions
// Interval handling function
function startGameInterval (roomName){
  
  const intervalId = setInterval(() =>{
    const winner = gameLoop(state[roomName]);
    if (turn[roomName] === 1) {
      emitTurnPlayer(roomName, turn[roomName])
    } else if (turn[roomName] === 2) {
      emitTurnPlayer(roomName, turn[roomName])
    }
    
    if (state[roomName].poolDeck.length === 0){
      console.log("Empate !!!")
      emitTie(roomName);
      state[roomName] = null;
      clearInterval(intervalId);
    } else if (!winner) {    
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
function emitTurnPlayer (roomName, number) {
  io.sockets.in(roomName)
    .emit('gameTurn', `Turn Player ${number}`);
}
function emitTie (roomName) {
  io.sockets.in(roomName)
    .emit('gameTie');
}
//io.listen(8000);
httpServer.listen(8000, () => {
    console.log('listening on *:8000');
  });