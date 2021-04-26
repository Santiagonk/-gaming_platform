import Deck from "./deck.js"

const changeCardButton = document.getElementById("change-card");
const pass = document.getElementById("pass-turn");

let playerDeck, computerDeck, poolDeck ,winner, turnOne, number_of_deck;

changeCardButton.addEventListener("click", () => {
    console.log("cambiaste de carta")
    changeCard(playerDeck);
    victoryCondition();
    turnOne = false;
});

pass.addEventListener("click", () =>{
    console.log("Siguiente Turno")
    if (!winner){
        flipCard();
    } else {
        alert("Ganaste")
    }
});

function startGame() {
    const deck = new Deck();
    deck.shuffle();
    playerDeck = new Deck(deck.cards.slice(0, 5));
    computerDeck = new Deck(deck.cards.slice(5, 10));    
    poolDeck = new Deck(deck.cards.slice(11));    
    console.log("player Deck:", playerDeck);
    console.log("computer Deck:", computerDeck);
}

function changeCard (player) { 
    console.log(poolDeck)   
    let position = document.getElementById("card-id").value;
    position = parseInt(position);    
    const playerCard = player.cards.splice(position, 1);
    const poolCard = poolDeck.pop();    
    console.log("playercard",playerCard,"Takencard", poolCard);
    poolDeck.cards.push(playerCard);
    player.cards.unshift(poolCard); 
    console.log(player.cards);
}

function flipCard () {
    console.log(poolDeck) 
    const poolCard = poolDeck.pop();     
    //console.log(playerDeck)  
    console.log(poolCard);     
    poolDeck.push(poolCard);      
}

function victoryCondition (){
    const playerArr = [];
    let count = 0;
    let counts = [];
    let three = false;
    let two = false;
    
    for (let i = 0; i < playerDeck.numberOfCards; i++){             
        playerArr.unshift(playerDeck.cards[i].value)
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
}

function init () {
    winner = false;
    turnOne = true;
    startGame ();
    
    flipCard ();
    
    victoryCondition();    
}

init();