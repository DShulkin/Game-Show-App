const phrases = ['Lucius Seneca', 'Marcus Aurelius', 'Momento Mori', 'Friedrich Nietzsche', 'Amor Fati']
const startGame = document.querySelector('.btn__reset')
const overlay = document.querySelector('#overlay')
const keyBoard = document.querySelector('#qwerty')
const ul = phrase.querySelector('ul')
let missed = 0


startGame.addEventListener('click', () => {
  // if (resetGame === 1) { resetGame() }
  overlay.style.display = 'none'
})


const getRandomPhraseAsArray = (array) => {
  let randomPhrase = array[Math.floor(Math.random() * phrases.length)]
  let splitPhrase = randomPhrase.split('')  
  return splitPhrase
}

const addPhraseToDisplay = (array) => {
  const phraseArray = getRandomPhraseAsArray(array)
  phraseArray.forEach(function(letter) {
    const li = document.createElement('li')
    li.textContent = letter
    ul.appendChild(li)
    if (li.textContent !=' ') {li.className = 'letter'} else {li.className = 'space'} 
  })
}
addPhraseToDisplay(phrases)


const checkLetter = (button) => {
  let match = null
  const letters = ul.querySelectorAll('.letter')
  letters.forEach(function(li) {
    if (button.textContent == li.textContent.toLowerCase()) {
      //console.log(li, 'LI')
      li.classList.add('show')
      li.style.transition = '0.5s ease-in-out'
      match = button.textContent
    } 
  })
  return(match)
}


keyBoard.addEventListener('click', (e) => {
  const button = e.target
  if (button.tagName === 'BUTTON' || button.className === 'chosen') {
    button.className = 'chosen'
    button.disabled = true
    const letterFound = checkLetter(button)
    //console.log(button.textContent, 'CLICKED')
    //console.log(letterFound, 'FOUND')
    if (letterFound == null || letterFound != button.textContent) { 
     const lost = document.querySelectorAll('.tries img')[missed]
     lost.src='images/lostHeart.png'
     lost.className = 'lost'
     console.log(lost)
      missed++  
      //console.log(letterFound, 'NOT INCLUDED')
    }
    checkWin()
  }
})


const checkWin = () => {
  const letterClass = document.querySelectorAll('.letter')
  const showClass = document.querySelectorAll('.show')
  const headline = document.querySelector('h2', '.title')
  if (letterClass.length === showClass.length) {
    overlay.className = 'win'
    overlay.style.display = 'flex'
    headline.textContent = 'You won!'  
    resetGame()
  } else if (missed >= 5) {
      overlay.className = 'lose'
      overlay.style.display = 'flex'
      headline.textContent = 'Try Again'
      resetGame()
  }
}



const resetGame = () => {
missed = 0
ul.textContent = ''

const chosenLetters = Array.from(document.querySelectorAll('.chosen'))
chosenLetters.forEach(function(letter) {
  letter.classList.remove('chosen')
  letter.disabled = false
})

const lifeLost = document.querySelectorAll('.lost')
lifeLost.forEach(function(restoreLife){
   restoreLife.src='images/liveHeart.png'
})

getRandomPhraseAsArray(phrases)
addPhraseToDisplay(phrases)

}




























// const resetGame = () => {
// missed = 0
// resetGame = 0
// ul.textContent = ''

// const chosenLetters = Array.from(document.querySelectorAll('.chosen'))
// chosenLetters.forEach(function(letter,) {
//   letter.classList.remove('chosen')
//   letter.disabled = false
// })

// const lives = document.querySelectorAll('.tries img').src='images/lostHeart.png'
// lives.forEach(function(life) {
//   life.src='images/liveHeart.png'
// })


// getRandomPhraseAsArray(phrases)
// addPhraseToDisplay(phrases)
//  }