const socket = io("http://localhost:8000/");

// socket conections
socket.on('init', handleInit);
socket.on('gameState', handleGamestate);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('gameTurn', handleGameTurn);
socket.on('gameTie', handleGameTie);
//Com constants
const changeCardButton = document.getElementById("change-card");
const playerCardSlot1 = document.querySelector(".card1");
const playerCardSlot2 = document.querySelector(".card2");
const playerCardSlot3 = document.querySelector(".card3");
const playerCardSlot4 = document.querySelector(".card4");
const playerCardSlot5 = document.querySelector(".card5");
const flipCardSlot = document.querySelector(".flip");
const pass = document.getElementById("pass-turn");
//
const gameScreen = document.getElementById( 'gameScreen' );
const initialScreen = document.getElementById( 'initialScreen');
const newGameBtn = document.getElementById( 'newGameButton');
const joinGameBtn = document.getElementById( 'joinGameButton');
const gameCodeInput = document.getElementById( 'gameCodeInput' );
const gameCodeDisplay = document.getElementById( 'gameCodeDisplay' );
// add event listeners
newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
changeCardButton.addEventListener('click', changeCard);
pass.addEventListener('click', nextTurn);
//
function newGame () {
    socket.emit('newGame');
    init();
}
function joinGame(){
    const code = gameCodeInput.value;    
    socket.emit('joinGame', code);
    init();
}
// client.on('changeCard', handleChangeCard);
// handleChangeCard (position, number)
function changeCard () {
    let position = document.getElementById("card-id").value;
    socket.emit('changeCard', position, playerNumber);
    return;
}
function nextTurn () {
    socket.emit('key', playerNumber)
    return;
}
// global variables
let gameActive = false;
let playerNumber;
// init
function init (){    
    initialScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    playerCardSlot1.innerHTML= "";
    playerCardSlot2.innerHTML= "";
    playerCardSlot3.innerHTML= "";
    playerCardSlot4.innerHTML= "";
    playerCardSlot5.innerHTML= "";

    gameActive = true;
}
// function take number

//


function paintCards(gameState, player){
    if (player === 1) {
        playerCardSlot1.innerHTML=`${gameState.playerOne[0].suit} ${gameState.playerOne[0].value}`;
        playerCardSlot2.innerHTML=`${gameState.playerOne[1].suit} ${gameState.playerOne[1].value}`;
        playerCardSlot3.innerHTML=`${gameState.playerOne[2].suit} ${gameState.playerOne[2].value}`;
        playerCardSlot4.innerHTML=`${gameState.playerOne[3].suit} ${gameState.playerOne[3].value}`;
        playerCardSlot5.innerHTML=`${gameState.playerOne[4].suit} ${gameState.playerOne[4].value}`;
    } else if (player === 2) {
        playerCardSlot1.innerHTML=`${gameState.playerTwo[0].suit} ${gameState.playerTwo[0].value}`;
        playerCardSlot2.innerHTML=`${gameState.playerTwo[1].suit} ${gameState.playerTwo[1].value}`;
        playerCardSlot3.innerHTML=`${gameState.playerTwo[2].suit} ${gameState.playerTwo[2].value}`;
        playerCardSlot4.innerHTML=`${gameState.playerTwo[3].suit} ${gameState.playerTwo[3].value}`;
        playerCardSlot5.innerHTML=`${gameState.playerTwo[4].suit} ${gameState.playerTwo[4].value}`;
    } else {
        playerCardSlot1.innerHTML= "";
        playerCardSlot2.innerHTML= "";
        playerCardSlot3.innerHTML= "";
        playerCardSlot4.innerHTML= "";
        playerCardSlot5.innerHTML= "";
    }  
  flipCardSlot.innerHTML=`${gameState.poolDeck[0].suit} ${gameState.poolDeck[0].value}`;  
}
//
function handleInit (number) {    
    playerNumber = number;      
}
//
function handleGamestate(gameState) {      
    if (!gameActive) {
        return;
    }      
    gameState = JSON.parse(gameState); 
    //paintCards(gameState);   
   paintCards(gameState, playerNumber);
  }
//
function handleGameOver (data) {
    if(!gameActive){
        return;
    }
    
    data = JSON.parse(data);
    console.log(data.winner, playerNumber)
    if (data.winner === playerNumber){
        alert("You Win!!!");
    } else {
        alert("You Lose!!!");
    }
    gameActive = false;
}
//
function handleGameCode (gameCode) {
    gameCodeDisplay.innerText = gameCode;
}
//
function reset() {
    playerNumber = null;
    gameCodeInput.value = " ";
    initialScreen.style.display = "block";
    gameScreen.style.display = "none";
}
//
function handleUnknownGame() {
    reset();
    alert("Unknown game code");
}
//
function handleTooManyPlayers() {
    reset();
    alert("This game is already in progress");
}

function handleGameTurn (playerturn) {
    gameCodeDisplay.innerText = playerturn;
}

function handleGameTie () {    
        alert("Tied Game!!!");   
   
}