const { Deck } = require("./deck")


module.exports = {
    initGame
}

// A function to init the game state
function initGame() {
    const state = createGameState();    
    return state     
}
// Function to start to create the game state
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
// Function to change the card
function changeCard (state, player, position) {      
    if (player === 1) {
        const playerCard = state.playerOne.splice(position, 1)[0];
        const poolCard = state.poolDeck.shift();
        state.poolDeck.push(playerCard);
        state.playerOne.unshift(poolCard);        
        return state;
    } else if (player === 2) {
        const playerCard = state.playerTwo.splice(position, 1)[0];
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
// changeCardButton.addEventListener("click", () => {
//     console.log("cambiaste de carta")
//     changeCard(playerDeck);
//     parseCards()
//     victoryCondition();
//     turnOne = false;
// });

// pass.addEventListener("click", () =>{
//     console.log("Siguiente Turno")
//     if (!winner){
//         flipCard();
//     } else {
//         alert("Ganaste")
//     }
// });




