'use strict';

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0 = document.querySelector('.score--0');
const score1 = document.querySelector('.score--1');
const current0 = document.querySelector('.current--0')
const current1 = document.querySelector('.current--1')
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

let scores, activePlayer, currentScore, playing;

const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();


const switchPlayer = function () {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    document.querySelector(`.current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
}


btnRoll.addEventListener('click', function () {
    if (playing) {
        dice.classList.remove('hidden');
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        console.log(diceNum);
        dice.src = `img/dice-${diceNum}.png`;

        if (diceNum !== 1) {
            currentScore += diceNum;
            console.log(currentScore);
            document.querySelector(`.current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`.score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
});


btnNew.addEventListener('click', init);




