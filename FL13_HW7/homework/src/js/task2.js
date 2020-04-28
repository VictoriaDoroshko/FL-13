'use strict';

let choose = confirm('Do you want to play a game?'),
    ranNumber,
    globalStartPrize = 50,
    num,
    range = 0,
    newGame = false,
    itemPrize = 0,
    rangeStep = 5,
    prizeMultiplier = 2,
    attempts = 3,
    prizeReduce = 2,
    totalPrize = globalStartPrize;

if (choose === false) {
    alert('You did not become a billionaire, but can.');
}  

while(choose === true){ 
    range += rangeStep;
    totalPrize *= prizeMultiplier;
    let startPrize = totalPrize;
    let attemptsLeft = attempts;
    ranNumber = Math.round(Math.random() * range);
    choose = false;

    for (let i = 1; i <= attempts; i++) {    
        num = +prompt(`Choose a roulette pocket number from 0 to ${range}
Attempts left: ${attemptsLeft}
Total prize: ${itemPrize}$
Possible prize on current attempt: ${startPrize}$ `, ``);
        
        if (num === ranNumber) {
            itemPrize += startPrize;
            choose = confirm(`Congratulation, you won! Your prize is: ${itemPrize} $.
Do you want to continue?`);
           
            if (choose === false) {
                alert(`Thank you for your participation. Your prize is: ${itemPrize}$`)
                newGame = confirm(`Do you want to play again?`);
                if(newGame === true){
                    itemPrize = 0;
                    totalPrize = globalStartPrize;
                    range = 0;
                    attemptsLeft = attempts;
                    choose = newGame;
                }
            }
            break;
        }
        startPrize /= prizeReduce;
        attemptsLeft -= 1;
        
        if(i === attempts){
            alert(`Thank you for your participation. Your prize is: ${itemPrize}$`)
            newGame = confirm(`Do you want to play again?`);
            if(newGame === true){
                itemPrize = 0;
                totalPrize = globalStartPrize;
                range = 0;
                attemptsLeft = attempts;
                choose = newGame;
            }

        }
    }
}
