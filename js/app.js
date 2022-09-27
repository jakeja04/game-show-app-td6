const keyboard = document.getElementById('qwerty');
const phrasesUL = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
let missed = 0;
const startGame = document.getElementById('overlay');

const phrases = [
  'front end web development',
  'react or vue',
  'patience is power',
  'take the risk',
  'see the good'
]

// Listen for start button to hide overlay and begin game
startButton.addEventListener('click', () => {
  startGame.style.display = 'none';
  phrasesUL.style = 'opacity: 100; transition: 1.5s'
});

// Returns random phrase as array of characters
const getRandomPhraseAsArray = arr => {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split('');
}

// Calls and stores getRandomPhraseAsArray function
const callRandomPhrase = getRandomPhraseAsArray(phrases);

// Displays array of letters as li's
const addPhraseToDisplay = arr => {
  for (i = 0; i < arr.length; i++) {
    const characterLI = document.createElement('li');
    characterLI.textContent = arr[i];
    phrasesUL.append(characterLI);

    if (characterLI.textContent === ' ') {
      characterLI.className = 'space';
    } else {
      characterLI.className = 'letter';
    }
  }
}

// Calls addPhraseToDisplay function on random phrase
addPhraseToDisplay(callRandomPhrase);

// Checks if a letter is in the phrase
const checkLetter = (keyboardBtn) => {
  let randomLetter = document.querySelectorAll('li');
  let letterMatch = null;

  for (i = 0; i < randomLetter.length; i++) {
    if (keyboardBtn.textContent === randomLetter[i].textContent) {
      randomLetter[i].classList.add('show');
      letterMatch = keyboardBtn.textContent;
    }
  }
  return letterMatch;
}

// Check if the game has been won or lost
const checkWin = () => {
  const letter = document.getElementsByClassName('letter');
  const show = document.getElementsByClassName('show');
  const result = document.querySelector('.title');

  if (letter.length === show.length) {
      startGame.className = 'win';
      startGame.style.display = 'flex';
      result.textContent = "Excellent job, you've won!";
      startButton.textContent = 'Play again?'
      startButton.addEventListener('click', () => {
          location.reload();
      });
     
  } 
  
  else if (missed >= 5) {
      startGame.className = 'lose';
      startGame.style.display = 'flex';
      result.textContent = "You've lost! Better luck next time.";
      startButton.textContent = 'Play again?'
      startButton.addEventListener('click', () => {
          location.reload();
      });
  }
}

// Listen for onboard keyboard to be clicked
qwerty.addEventListener('click', e => {
  if (event.target.tagName === 'BUTTON') {
    event.target.className = 'chosen';
    event.target.disabled = true;
    let matchFound = checkLetter(event.target);
    if (matchFound === null) {
        const notFound = document.querySelectorAll('.tries img')[missed];
        notFound.src = 'images/lostHeart.png';
        missed++;
    };
} checkWin();
});