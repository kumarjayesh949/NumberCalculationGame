// 'use strict';
console.log(document.querySelector('.message').textContent);
var streakText = document.querySelector('.message');
var numEntry = document.querySelector('.guess');
var scText = document.querySelector('.score');
var time = document.querySelector('.between');
var highScoreText = document.querySelector('.highscore');
let result;
let highScore = 0;
let life = 3;
let st = 0;
let score = 0;
let tout = 10000;
var decreaseTime = 0;
var timeAllocated = 10;
streakText.textContent = 'Streak of';
highScoreText.textContent = 0;

//Setting the timer at the beggining
var timerLoop = setInterval(timer, 1000);

//Timer function to display remaining time.
function timer() {
    time.textContent = decreaseTime--;
    if (decreaseTime == -1) nextNumber();
}

//Creates new add sum based on random number generation
function nextNumber(fl = 0) {
    if (!fl) checkNumber(1);
    numEntry.value = '';
    numEntry.focus();
    let t = 1000;
    let a = Math.floor(Math.random() * 101);
    let b = Math.floor(Math.random() * 101);
    result = a + b;
    decreaseTime = timeAllocated;
    document.querySelector('.number').textContent = `${a} + ${b}`;
}

//check the input when pressed check or enter 
//or the time runs out
//flag == 1 i.e time has runout
//flag == 0 i.e check was pressed
function checkNumber(flag) {
    let calc = numEntry.value;
    compareResult(calc);
    Update();
    //if passed 1 it means that check or enter was pressed
    //else time has run out
    if (!flag) {
        
        if (st == 0) { 
            --life;
            if (life == 2)
                document.querySelector('.life').textContent = 'II';
            else if (life == 1)
                document.querySelector('.life').textContent = 'I';
            if (!life) {
                document.querySelector('.life').textContent = '';
                stopGame();
                return;
            }
        }
        nextNumber(1);

    }
}

function stopGame() {
    document.querySelector('.btnCheck').disabled = true;
    clearInterval(timerLoop);
    document.querySelector('.number').textContent = "GAME OVER";
    time.textContent = "Game Over";
    numEntry.value = ''
    numEntry.disabled = true;
}

//code to handle enter key press on numEntry
numEntry.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if(life)
        checkNumber(0);
    }
});

//Code to reset the game when pressed again
document.querySelector('.again').addEventListener('click', function (event) {
    score = 0;
    st = 0;
    life = 3;
    document.querySelector('.life').textContent = 'III';
    numEntry.disabled = false;
    document.querySelector('.btnCheck').disabled = false;
    Update();
    clearInterval(timerLoop);
    nextNumber();
    timerLoop = setInterval(timer, 1000);
    timer();
});

//Checks if the number is equal 
function compareResult(calc) {
    if (calc == result) {
        st++;
    } else
        st = 0;
}

//update the UI informations and scores
function Update() {
    streakText.textContent = 'Streak of ' + st;
    score += 1.5 * st;
    highScore = Math.max(score, highScore);
    highScoreText.textContent = highScore;
    scText.textContent = score;
}
