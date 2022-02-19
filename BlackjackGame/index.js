
let cards = [];
let sum = 0;

let hasBlackJack = false;
let isAlive = false;
let isGameOver = false;

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
document.getElementById("startGameButton").style.display = "block";
document.getElementById("newCardButton").style.display = "none";

function startGame()
{
    if(isGameOver === true)
    {
        window.location.reload("Refresh")
    }
    else
    {
        
        document.getElementById("startGameButton").style.display = "none";
        document.getElementById("newCardButton").style.display = "block";
        isAlive = true;
        hasBlackJack = false;
        let firstCard = getRandomInt();
        let secondCard = getRandomInt(); 
        cards.push(firstCard, secondCard);
        sum = firstCard + secondCard;
    
        renderGame();
    }
}

function renderGame()
{
    cardsEl.textContent = "Cards: ";

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] += " ";
    }

    sumEl.textContent = "Total: " + sum;

    if (sum <= 20)
    {
        message = "Do you want to draw a new card?";
    }
    else if (sum === 21)
    {
        message = "SHEESH! You've got Blackjack!";
        hasBlackJack = true;
        isAlive = false;
        isGameOver = true;
        document.getElementById("startGameButton").innerHTML = "NEW GAME";
        document.getElementById("startGameButton").style.backgroundColor = "Green";
        document.getElementById("startGameButton").style.display = "block";
        document.getElementById("newCardButton").style.display = "none";
        
    }
    else
    {
        message = "You're out of the game!";
        isAlive = false;
        isGameOver = true;
        document.getElementById("startGameButton").innerHTML = "TRY AGAIN";
        document.getElementById("startGameButton").style.backgroundColor = "DarkRed";
        document.getElementById("startGameButton").style.display = "block";
        document.getElementById("newCardButton").style.display = "none";
    }

    messageEl.textContent = message;
}


function newCard()
{
    if(isAlive === true && hasBlackJack === false)
    {
        var card = getRandomInt();
        cards.push(card);
        sum += card;
        renderGame();
    }

}

function getRandomInt() {

    var randomInt = Math.floor(Math.random() * 13) + 1;
    console.log(randomInt);
    if (randomInt === 1)
    {
        return 11;
    }
    else if (randomInt > 10)
    {
        return 10;
    }
    else
    {
        return randomInt;
    }
}
