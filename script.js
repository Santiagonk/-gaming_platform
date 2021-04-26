import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const poolCardSlot = document.querySelector(".pool-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const poolDeckElement = document.querySelector(".pool-deck");
const text = document.querySelector(".text");
const changeCard = document.getElementById("change-card");


let gameDeck, playerDeck, computerDeck, poolDeck ,inRound, stop, number_of_deck;

changeCard.addEventListener("click", () => {
  const playerCard = playerDeck.pop();
  const poolCard = poolDeck.pop();

  poolDeck.cards.unshift(playerCard);
  playerDeck.cards.unshift(poolCard);

  console.log("player Card ",playerCard);
  console.log(poolDeck.cards);
  console.log("pool Card ",poolCard);
  console.log(playerDeck.cards);

})

document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  
  playerDeck = new Deck(deck.cards.slice(0, 5));
  computerDeck = new Deck(deck.cards.slice(5, 10));
  gameDeck = new Deck(deck.cards.slice(12,52));
  poolDeck = new Deck(deck.cards.slice(11, 12));

  number_of_deck = 12;
  inRound = false;
  stop = false;  
  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  poolCardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;  
  poolDeckElement.innerText = poolDeck.numberOfCards; 
  const poolCard = poolDeck.pop();
  poolDeck.cards.unshift(poolCard);
  poolCardSlot.appendChild(poolCard.getHTML()); 
}


function flipCards() {
  inRound = true;
  
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();
  const poolCard = gameDeck.pop();
  
  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML());
  poolCardSlot.appendChild(poolCard.getHTML());
  
  poolDeck.cards.unshift(poolCard);
  playerDeck.cards.unshift(playerCard);
  computerDeck.cards.unshift(computerCard);

  number_of_deck +=1
  

  updateDeckCount()

  // if (isRoundWinner(playerCard, computerCard)) {
  //   text.innerText = "Win"
  //   playerDeck.push(playerCard)
  //   playerDeck.push(computerCard)
  // } else if (isRoundWinner(computerCard, playerCard)) {
  //   text.innerText = "Lose"
  //   computerDeck.push(playerCard)
  //   computerDeck.push(computerCard)
  // } else {
  //   text.innerText = "Draw"
  //   playerDeck.push(playerCard)
  //   computerDeck.push(computerCard)
  // }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }

  
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
  return deck.numberOfCards === 0
}