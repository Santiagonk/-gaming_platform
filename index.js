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
const { createGameState, gameLoop, getUpdatedVelocity} = require("./games/snake/game");
const { FRAME_RATE } = require("./games/snake/utils/constanst");
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
 const state = createGameState();
 client.on('keydown', handleKeydown);
 
function handleKeydown (keyCode){
  try {
    keyCode = parseInt(keyCode);
  } catch(e) {
    console.error(e);
    return;
  }

  const vel = getUpdatedVelocity(keyCode);

  if (vel){
    state.player.vel = vel;
  }

}

 startGameInterval(client, state); 
});

function startGameInterval(client, state) {
  
  const intervalId = setInterval(()=>{
    const winner = gameLoop(state);
    
    if (!winner) {
      
      client.emit( 'gameState', JSON.stringify(state));
      
    } else {
      client.emit('gameOver');
      clearInterval(intervalId);
      
    }
  }, 1000 / FRAME_RATE);
}

//io.listen(8000);
httpServer.listen(8000, () => {
  console.log('listening on *:8000');
});