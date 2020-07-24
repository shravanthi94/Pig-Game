/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* DOM - Document Object Model - selecting the html document object
and manipulation of values using javascript code */

/* PRACTICE
let scores, current, activePlayer, dice;

scores = [0,0];
current = 0;
activePlayer = 1; //corresponds to 0,1 of scores array



For Generating random between 1 to 6
Math.random - generates between 0 - 1 (decimal)
(so multiply by 6 to get between 0 - 5)
Math.floor - removes decimal part
add 1 - to make it between 1 to 6 
dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#score-0').textContent = dice;

document.querySelector('#current-' + activePlayer).textContent = dice;

//to use html element
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//we can also read an element
var x = document.querySelector('#current-' + activePlayer).textContent;
console.log(x);

//to hide the dice - using CSS
document.querySelector('.dice').style.display = 'none';  

*/


let scores, current, activePlayer, playing, finalScore = 100;

//Challenge 3 - adding another dice
let DOMdisplayDice1 = document.querySelector('#dice-1').style.display;
let DOMdisplayDice2 = document.querySelector('#dice-2').style.display;

initialSetUp();

//let previous; //everytime function is called scope of last saved dice value
//would be lost.

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(playing) {
    let dice1, dice2;
    //1. get a random dice value
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the value on the dice
    //let diceDOM = document.querySelector('.dice');
    DOMdisplayDice1 = 'block';
    DOMdisplayDice2 = 'block';

    document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
    document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
    
    //Challenge 1
/*    if(previous === 6 && dice === 6) {
        //next player
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayerReset();
    }
*/
    //3. update the current score if dice is not 1
    if(dice1 > 1 && dice2 > 1) {
        //add score
        current += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = current;
    } else {
        //next player
        nextPlayerReset();
    }
    //previous = dice;
}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(playing) {
    //1. update the current score to the final score
    scores[activePlayer] += current;

    //2. update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //3. check if there's a winner
    //Challenge 2
    var finalScore = document.querySelector('.final-score').value;
    //console.log(finalScore);
    //Check if finalScore is valid - do this by checking for 0, undefined, "", null -> false
    // Anything else -> true
    if(finalScore) {
       var high = finalScore;
    } else {
        high = 100;
    }
    if(scores[activePlayer] >= high) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
        DOMdisplayDice1 = 'none';
        DOMdisplayDice2 = 'none';

        playing = false;
    } else {
    //4. Next Player
    nextPlayerReset();
    }
}
});

function nextPlayerReset() {
    activePlayer === 1? activePlayer = 0 : activePlayer = 1;
    current = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

// document.querySelector('.player-0-panel').classList.remove('active'); 
// document.querySelector('.player-1-panel').classList.add('active'); 

    //to change the grey background and red dot for current player display
    document.querySelector('.player-0-panel').classList.toggle('active'); 
    document.querySelector('.player-1-panel').classList.toggle('active'); 

    DOMdisplayDice1 = 'none';
    DOMdisplayDice2 = 'none';
    
}

document.querySelector('.btn-new').addEventListener('click', function() {
    initialSetUp();
});

function initialSetUp() {
    scores = [0,0]; //initial scores
    current = 0;    //current score for a player
    activePlayer = 0;   //0 - player1 and 1 - player2
    playing = true;

    //initializing all the values to 0 initially
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    
    //removing dice initially
    DOMdisplayDice1 = 'none';
    DOMdisplayDice2 = 'none';
}

