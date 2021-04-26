import Deck from "./deck.js"

const changeCardButton = document.getElementById("change-card");
const playerCardSlot1 = document.querySelector(".card1");
const playerCardSlot2 = document.querySelector(".card2");
const playerCardSlot3 = document.querySelector(".card3");
const playerCardSlot4 = document.querySelector(".card4");
const playerCardSlot5 = document.querySelector(".card5");
const flipCardSlot = document.querySelector(".flip");
const pass = document.getElementById("pass-turn");

let playerDeck, computerDeck, poolDeck ,winner, turnOne, number_of_deck;

changeCardButton.addEventListener("click", () => {
    console.log("cambiaste de carta")
    changeCard(playerDeck);
    parseCards()
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
    poolDeck = new Deck(deck.cards.slice(10));    
    console.log("player Deck:", playerDeck);
    console.log("computer Deck:", computerDeck);
    console.log("pool Deck:", poolDeck)
    parseCards();    
}

function changeCard (player) { 
    
    console.log(poolDeck)   
    let position = document.getElementById("card-id").value;
    position = parseInt(position);    
    const playerCard = player.cards.splice(position, 1);
    const poolCard = poolDeck.pop();    
    console.log("playercard",playerCard,"Takencard", poolCard);
    poolDeck.cards.push(playerCard);
    player.cards.push(poolCard); 
    console.log(player.cards);
}

function flipCard () {    
    flipCardSlot.innerHTML="" 
    const poolCard = poolDeck.shift();
    flipCardSlot.innerHTML=`${poolCard.suit} ${poolCard.value}`;
    poolDeck.push(poolCard)
    console.log("pool Deck flip: ", poolDeck);
    console.log("flip card:", poolCard); 
    
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

function parseCards(){    
    playerCardSlot1.innerHTML=`${playerDeck.cards[0].suit} ${playerDeck.cards[0].value}`
    playerCardSlot2.innerHTML=`${playerDeck.cards[1].suit} ${playerDeck.cards[1].value}`
    playerCardSlot3.innerHTML=`${playerDeck.cards[2].suit} ${playerDeck.cards[2].value}`
    playerCardSlot4.innerHTML=`${playerDeck.cards[3].suit} ${playerDeck.cards[3].value}`
    playerCardSlot5.innerHTML=`${playerDeck.cards[4].suit} ${playerDeck.cards[4].value}`
    
    
}

init();