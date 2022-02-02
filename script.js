'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const curScore0El = document.querySelector('#current--0');
const curScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const currentLabel0 = document.querySelector('.player--0');
const currentLabel1 = document.querySelector('.player--1');

const scores = [0, 0]; // Total scores which will be final
let curScore = 0;
let activePlayer = 0;
let playing = true;

//TO set initial scores to be zero
score0El.textContent = 0;
score1El.textContent = 0;

//TO remoce dice initially
diceEl.classList.add('hidden');

const switchPlayer = function () {
  curScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = curScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentLabel0.classList.toggle('player--active');
  currentLabel1.classList.toggle('player--active');
};

//TO roll the dice on clicking the roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random no.
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      curScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        curScore;
    } else {
      //3. Check for rolled for 1, if true switch the player
      switchPlayer();
    }
  }
});

//TO hold the score
btnhold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to total score
    scores[activePlayer] += curScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score >=100
    // if yes PLAYER WINS
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3. Else switch the player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  //TOTAL scores=0
  score0El.textContent = 0;
  score1El.textContent = 0;
  //Add dice again
  diceEl.classList.add('hidden');
  //Active label to player-1
  currentLabel0.classList.add('player--active');
  currentLabel1.classList.remove('player--active');
  //Remove winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playing = true;
  curScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  curScore0El.textContent = 0;
  curScore1El.textContent = 0;
});
