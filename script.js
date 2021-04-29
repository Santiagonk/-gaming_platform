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
const InitialScreen = document.getElementById( 'initialScreen');
const IdScreen = document.getElementById( 'idScreen');
const signUpScreen = document.getElementById( 'signUpScreen');
const gameScreen = document.getElementById( 'gameScreen' );
const signUpBtn = document.getElementById( 'SignUp');
const sendForm = document.getElementById( 'SendForm');
const newGameBtn = document.getElementById( 'newGameButton');
const joinGameBtn = document.getElementById( 'joinGameButton');
const gameCodeInput = document.getElementById( 'gameCodeInput' );
const gameCodeDisplay = document.getElementById( 'gameCodeDisplay' );
const login = document.getElementById("login");
// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded',
    },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
signUpBtn.addEventListener('click', registerForm);
sendForm.addEventListener('click', sendFormValidation);
newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
changeCardButton.addEventListener('click', changeCard);
pass.addEventListener('click', nextTurn);
login.addEventListener('click', on);
//
function on () {
    const url = 'http://localhost:8000/login';
    const usern = document.getElementById("user").value;
    const passn = document.getElementById("pass").value;
    let data = {
        "username": usern,
        "password": passn
    }
    postData(url, data)
    .then(data => {
        if(data.data){
            InitialScreen.style.display = 'none';
            IdScreen.style.display = 'block';
        } else {
            alert("Not valid user")
        }
    });
}
// sendFormValidation
function sendFormValidation (){
    signUpScreen.style.display = 'none';
    IdScreen.style.display = 'block';
}
function sendFormValidation () {
    const url = 'http://localhost:8000/sign-up';
    const uname = document.getElementById("sgname").value;
    const usern= document.getElementById("sgusername").value;
    const uemail = document.getElementById("sgemail").value;
    const passn = document.getElementById("sgpassword").value;
    let data = {
        "name": uname,
        "username": usern,
        "email": uemail,
        "password": passn
    }
    postData(url, data)
    .then(data => {
        if(data.message){
            signUpScreen.style.display = 'none';
            InitialScreen.style.display = 'block';
        } else {
            alert("Not valid user")
        }
    });
}
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
    IdScreen.style.display = 'none';
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
    gameScreen.style.display = 'none';
    IdScreen.style.display = 'block';
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
    if (playerturn == playerNumber){
        gameCodeDisplay.innerText = "Your Turn";
    } else {
        gameCodeDisplay.innerText = "Wait for your turn";
    }
}

function handleGameTie () {
        alert("Tied Game!!!");
        gameScreen.style.display = 'none';
        IdScreen.style.display = 'block';
}


function registerForm (){
    InitialScreen.style.display = 'none';
    signUpScreen.style.display = 'block';
}