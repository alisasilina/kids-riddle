import '../styles/index.scss';

console.log('webpack starterkit');
const word = document.getElementById('word');
const letters = document.querySelectorAll('.letter');
const hiddenLetters = document.querySelectorAll('.letter-hidden');
const cards = document.querySelectorAll('.card');
const h4 = document.querySelectorAll('h4');

// Sounds
// const success = new Audio('../assets/audio/success.mp3');
// const error = new Audio('../assets/audio/error.mp3');
const success = document.getElementById('success');
const error = document.getElementById('error');

let wordArray = [];
const hiddenLettersArray = [...hiddenLetters].map((hiddenLetter) => {
  wordArray.push(hiddenLetter.dataset.letter.toUpperCase());
});
console.log(wordArray);

const lettersArray = [...letters].map((letter) => {
  letter.addEventListener('click', (e) => {
    if (wordArray.includes(e.target.innerHTML)) {
      let counter = 0;
      while (wordArray.includes(e.target.innerHTML)) {
        let indexes = [];
        let idx = wordArray.indexOf(e.target.innerHTML);
        while (idx != -1) {
          indexes.push(idx);
          idx = wordArray.indexOf(e.target.innerHTML, idx + 1);
        }
        {
        }
        // Card flip
        hiddenLetters[indexes[counter]]
          .closest('.card')
          .classList.add('flipped');
        counter += 1;

        letter.style.backgroundColor = 'lightgreen';
        success.play();
        console.log('Found it!');

        const flipped = document.querySelectorAll('.flipped');

        // Winning
        if (cards.length - 1 === flipped.length) {
          console.log('You won!');
          setTimeout(function () {
            // Array.from(h4).map(l => l.classList.add('glow'))
            Array.from(h4).map((l) => (l.style.fontSize = '86px'));
            const backs = document.querySelectorAll('.back');
            Array.from(backs).map((card) => {
              card.style.backgroundColor = 'transparent';
              card.style.border = 'none';
            });
          }, 600);
        }
      }
    } else {
      // Wrong letter
      letter.disabled = true;
      error.play();
      console.log('Wrong letter!');
    }
  });
});

// Keyboard trigger
document.addEventListener('keyup', function (event) {
  const letter = document.getElementById(`${event.key}`);
  if (event.key === letter.id) {
    letter.click();
  }
});
