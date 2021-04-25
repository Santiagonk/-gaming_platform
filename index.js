const express = require('express');
const path = require("path");
const app = express();
const httpServer = require('http').createServer(app);
//const server = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:8000/"],
    methods: ["GET", "POST"]
  }
});
const { gameLoop, getUpdatedVelocity, initGame} = require("./games/snake/game");
const { FRAME_RATE } = require("./games/snake/utils/constanst");
const { makeId } = require("./utils/utils")
const state = {};
const clientRooms = {};

const helmet = require("helmet");
var cors = require('cors');
// const io = new Server(server);
// Middlewares
// This sets custom options for the `referrerPolicy` middleware.
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

io.on('connection', client => {
 

 client.on('keydown', handleKeydown);
 client.on('newGame', handleNewGame);
 client.on('joinGame', handleJoinGame);

function handleJoinGame (roomName){
  
  const { rooms } = client;
  let numClients;
  if (rooms){
    numClients = rooms.size;
  }

  if (numClients === 0){
    console.log("Unknown game")
    return;
  } else if (numClients > 1) {
    console.log("Too Many Players")
    return;
  }


  

  clientRooms[client.id] = roomName;
 

  client.join(roomName);  
  console.log("Player 2: Join to the play"); 
    
  client.number = 2;
  client.emit('init',2);

  

  startGameInterval(roomName);
}
 
function handleNewGame (){
  let roomName = makeId(5);
  clientRooms[client.id]=roomName;
  
  // io.of("/").adapter.on("create-room", (room) => {
  //   console.log(`room ${room} was created`)
  // });
  client.emit('gameCode', roomName);  
  state[roomName] = initGame();
  // io.of("/").adapter.on("join-room", (room, id) => {
  //   console.log(`Player1: socket ${id} has joined room ${room}`);
  // });  
  client.join(roomName);
  console.log("Player 1: Join to the play");
  client.number = 1;
  client.emit('init', 1);
  gamers = 1;
} 

function handleKeydown (keyCode){
  const roomName = clientRooms[client.id]

  if (!roomName) {
    return;
  }

  try {
    keyCode = parseInt(keyCode);
  } catch(e) {
    console.error(e);
    return;
  }

  const vel = getUpdatedVelocity(keyCode);

  if (vel){
    state[roomName].players[client.number - 1].vel = vel;
    
  }

}
 
});

function startGameInterval(roomName) {
  
  const intervalId = setInterval(()=>{
    const winner = gameLoop(state[roomName]);
    
    if (!winner) {
      emitGameState(roomName, state[roomName]);      
      //client.emit( 'gameState', JSON.stringify(state));
      
    } else {
      emitGameOver(roomName, winner);
      //client.emit('gameOver');
      state[roomName] = null;
      clearInterval(intervalId);
      
    }
  }, 2000 / FRAME_RATE);
}

function emitGameState (roomName, state) {
  io.sockets.in(roomName)
    .emit('gameState', JSON.stringify(state));
    
}

function emitGameOver (roomName, winner) {
  io.sockets.in(roomName)
    .emit('gameOver', JSON.stringify({ winner }));
}

//io.listen(8000);
httpServer.listen(8000, () => {
  console.log('listening on *:8000');
});