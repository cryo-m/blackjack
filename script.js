let playerName = prompt("Введіть ім'я")
const playerNameLabel = document.getElementById('player-name');
if(playerName !== null && playerName.trim() !== ''){
    playerNameLabel.textContent = playerName;
}


let balance = 1000;
let playerHand = []
let dealerHand = []
let playerScore = 0;
let dealerScore = 0;
let deck = []
let bet = 0;

class Card{
    constructor(value, name, suit){
        this.value = value;
        this.name = name;
        this.suit = suit;
    }
}

function startGame() {
    const betInput = document.getElementById('bet-amount');
    bet = parseInt(betInput.value);

    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert('Некоректна ставка!');
        return;
    }

    playerHand = []
    dealerHand = []
    playerScore = 0;
    dealerScore = 0;

    document.getElementById('player-score').innerText = 0;
    document.getElementById('dealer-score').innerText = 0;
    balance -= bet;
    document.getElementById('balance').innerText = balance;

    document.getElementById('betting-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    document.getElementById('dealer-cards').innerHTML = '';
    document.getElementById('player-cards').innerHTML = '';

    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;

    deck = [
        new Card(2, "2", "hearts"),
        new Card(2, "2", "diamonds"),
        new Card(2, "2", "clubs"),
        new Card(2, "2", "spades"),
        new Card(3, "3", "hearts"),
        new Card(3, "3", "diamonds"),
        new Card(3, "3", "clubs"),
        new Card(3, "3", "spades"),
        new Card(4, "4", "hearts"),
        new Card(4, "4", "diamonds"),
        new Card(4, "4", "clubs"),
        new Card(4, "4", "spades"),
        new Card(5, "5", "hearts"),
        new Card(5, "5", "diamonds"),
        new Card(5, "5", "clubs"),
        new Card(5, "5", "spades"),
        new Card(6, "6", "hearts"),
        new Card(6, "6", "diamonds"),
        new Card(6, "6", "clubs"),
        new Card(6, "6", "spades"),
        new Card(7, "7", "hearts"),
        new Card(7, "7", "diamonds"),
        new Card(7, "7", "clubs"),
        new Card(7, "7", "spades"),
        new Card(8, "8", "hearts"),
        new Card(8, "8", "diamonds"),
        new Card(8, "8", "clubs"),
        new Card(8, "8", "spades"),
        new Card(9, "9", "hearts"),
        new Card(9, "9", "diamonds"),
        new Card(9, "9", "clubs"),
        new Card(9, "9", "spades"),
        new Card(10, "10", "hearts"),
        new Card(10, "10", "diamonds"),
        new Card(10, "10", "clubs"),
        new Card(10, "10", "spades"),
        new Card(10, "J", "hearts"),
        new Card(10, "J", "diamonds"),
        new Card(10, "J", "clubs"),
        new Card(10, "J", "spades"),
        new Card(10, "Q", "hearts"),
        new Card(10, "Q", "diamonds"),
        new Card(10, "Q", "clubs"),
        new Card(10, "Q", "spades"),
        new Card(10, "K", "hearts"),
        new Card(10, "K", "diamonds"),
        new Card(10, "K", "clubs"),
        new Card(10, "K", "spades"),
        new Card(11, "A", "hearts"),
        new Card(11, "A", "diamonds"),
        new Card(11, "A", "clubs"),
        new Card(11, "A", "spades"),
    ];

    setTimeout(() => deal(dealerHand), 100);
    setTimeout(() => deal(playerHand), 600);
    setTimeout(() => deal(dealerHand), 1100);
    setTimeout(() => deal(playerHand), 1600);
    setTimeout(() => {
        if (dealerScore === 21) {
            endGame("dealer");
        } else if (playerScore === 21) {
            endGame("player");
        } else {
            document.getElementById('hit-btn').disabled = false;
            document.getElementById('stand-btn').disabled = false;
        }
    }, 1800);
}

function createCard(handId, cardName) {
    const hand = document.getElementById(handId);
    const card = document.createElement('div');
    card.style.backgroundImage = `url('img/${cardName}.png')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
    card.className = 'card';
    hand.appendChild(card);
}

function deal(hand){
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];

    const cardName = `${card.suit}_${card.name}`;
    hand.push(card);

    let handId;
    if(hand == dealerHand){
        handId = 'dealer-cards';
        dealerScore = calculateScore(dealerHand);
        document.getElementById('dealer-score').innerText = dealerScore;
    } else {
        handId = 'player-cards';
        playerScore = calculateScore(playerHand);
        document.getElementById('player-score').innerText = playerScore;
    }

    createCard(handId, cardName);
}

function hit() {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;

    deal(playerHand);
    
    setTimeout(() => {
        if (playerScore > 21) {
            endGame("dealer");
        } else if (playerScore === 21) {
            endGame("player");
        } else {
            document.getElementById('hit-btn').disabled = false;
            document.getElementById('stand-btn').disabled = false;
        }
    }, 300);
}

function stand() {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;
    
    const drawInterval = setInterval(() => {
        if (dealerScore <= playerScore && dealerScore < 21){
            deal(dealerHand);
        } else {
            clearInterval(drawInterval);
            if (dealerScore > 21){
                endGame("player");
            } else {
                endGame("dealer")
            }
        }
    }, 800);

    
}

function endGame(winner) {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;

    setTimeout(() => {
        const resultScreen = document.getElementById('result-screen');
        const resultMessage = document.getElementById('result-message');
        const balanceDisplay = document.getElementById('balance');

        if (winner === 'player') {
            resultMessage.innerText = `Ви виграли! (+$${bet * 2})`;
            resultMessage.style.color = "#4CAF50"; 
            balance += bet * 2; 
        } else {
            resultMessage.innerText = "Ви програли!";
            resultMessage.style.color = "#F44336"; 
        }

        balanceDisplay.innerText = balance;
        resultScreen.classList.remove('hidden');
        resultScreen.style.display = 'flex'; 
    }, 1000);
}

function restartGame() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('betting-screen').classList.remove('hidden');
}

function calculateScore(hand) {
    let score = 0;
    let acesCount = 0;

    for (let i = 0; i < hand.length; i++) {
        score += hand[i].value;
        if (hand[i].name === "A") {
            acesCount++;
        }
    }

    while (score > 21 && acesCount > 0) {
        score -= 10;
        acesCount--;
    }

    return score;
}