
//game values
let min = '1',
    max = '10',
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

//listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    //validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    //check if won
    if(guess === winningNum) {
        gameOver(true, `You win! ${winningNum} is correct!`);
    }else {
        //wrong number
        guessesLeft -= 1;
        //alert(guessesLeft);
        if(guessesLeft === 0) {
            gameOver(false, `You lost! The correct number was ${winningNum}`);

        } else {
            //game continues
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red');

        }
    }
})

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
