const { Deck } = require("./deck")

// init the game
function initGame() {
    const state = createGameState();
    return state;
}
// create the initial state
function createGameState() {
    const deck = new Deck();
    deck.shuffle();
    let state;
    state = {
        playerOne : [],
        playerTwo : [],
        poolDeck: []
    }
    for (let i=0; i < 5; i++ ){
        state.playerOne.push(deck.cards[i])
    }
    for (let i=5; i < 10; i++ ){
        state.playerTwo.push(deck.cards[i])
    }
    for (let i=10; i < 52; i++ ){
        state.poolDeck.push(deck.cards[i])
    }
    return state;
}
//
function changeCard (state, player, position) {
    if (player === 1) {
        const playerCard = state.playerOne.splice(position-1, 1)[0];
        const poolCard = state.poolDeck.shift();
        state.poolDeck.push(playerCard);
        state.playerOne.unshift(poolCard);
        return state;
    } else if (player === 2) {
        const playerCard = state.playerTwo.splice(position-1, 1)[0];
        const poolCard = state.poolDeck.shift();
        state.poolDeck.push(playerCard);
        state.playerTwo.unshift(poolCard);
        return state;
    }  else {
        console.log("No valid user")
        return;
    }
}
// check victory condition
function victoryCondition (player){
    const playerArr = [];
    let count = 0;
    let counts = [];
    let three = false;
    let two = false;
    let winner = false;
    
    for (let i = 0; i < player.length; i++){             
        playerArr.push(player[i].value)
    }
    for (let i = 0; i < playerArr.length; i++){
         for (let j = 0; j < (playerArr.length);j++){            
            if (playerArr[i]===playerArr[j]){
                count += 1                              
            }
         }         
         counts.push(count);
         count=0;         
    }   
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] === 3){
            three = true;
        } else if (counts[i]==2){
            two = true;
        }
    }  
    
    if (three && two){
        winner = true
    }
    return winner
}

// play proof
function gameLoop(state) {
    const winner1 = victoryCondition(state.playerOne);
    const winner2 = victoryCondition(state.playerTwo);
    if (winner1) {
        return 1;
    } else if (winner2) {
        return 2;
    } else {
        return false;
    }
}
function flipCard (state) {
    state.poolDeck.shift()
    return state
}

function changeTurn(number, turn){
    if (number === 1 & turn === 1){
        return 2;
    }
    if (number === 2 & turn === 2){
        return 1;
    }
    return turn
}
module.exports = {
    gameLoop,
    initGame,
    changeCard,
    flipCard,
    changeTurn
}
