const phrases = ['Lucius Seneca', 'Marcus Aurelius', 'Momento Mori', 'Friedrich Nietzsche', 'Amor Fati']
const startGame = document.querySelector('.btn__reset')
const overlay = document.querySelector('#overlay')
const keyBoard = document.querySelector('#qwerty')
const ul = phrase.querySelector('ul')
let missed = 0

startGame.addEventListener('click', () => {
  overlay.style.display = 'none'
})


// Returns a random phrase from the array //
// * @param {array} indicates to use an array as the argument
// * a random phrase is selected from the array of phrases 
// * after the random phrase is selected from the phrases array, its letters are split into an array 
const getRandomPhraseAsArray = (array) => {
  let randomPhrase = array[Math.floor(Math.random() * phrases.length)]
  let splitPhrase = randomPhrase.split('')  
  return splitPhrase
}


// Add the letters of a string to the display //
// * @param {array} indicates to use an array as the argument
// * phraseArray retrieves the array list of letters from the getRandomPhraseAsArray function
// * for each letter, each list items text content is set to a letter from the array
// * the list item is then append to the unordered list
// * if the list items textContent is not equal to a blank space, set the list items class to 'letter'
// * otherwise set the list items class to 'space'
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


// Check if a letter is in the phrase //
// * @param {button} indicates to use a button as an argument 
// * the letters variable selects all the elements with the class of 'letter' from the unordered list
// * if the text content of the button is relatively the same as the list items textContent set to lowercase
// * the list items add a class of 'show'
// * the list has a transition effect to reveal the letter 
// * the match variable is set to the buttons textContent
// * the match variable is then returned
const checkLetter = (button) => {
  let match = null
  const letters = ul.querySelectorAll('.letter')
  letters.forEach(function(li) {
    if (button.textContent == li.textContent.toLowerCase()) {
      li.classList.add('show')
      li.style.transition = '0.5s ease-in-out'
      match = button.textContent
    } 
  })
  return(match)
}

// Listens for the onscreen keyboard to be clicked //
// * a variable named 'button' is created for legibility purposes, which is also set as the target value 
// * if the target value (button) has a tag name of 'BUTTON' or the buttons class name is 'chosen'
// * the buttons class name is set to 'chosen'
// * the button is then disabled 
// * the checkLetter function is stored in the variable: letterFound, with the @param {button} variable as its parameter 
// * if the letter found is relatively equal to null or not equal to the textContent of the button
// * the lost variable selects each image with the class 'tries' 
// NOTE: because the missed variable is set to zero, the lost variable can be read as lost[0] each time the if statement is encountered
// * the source for the lost variable is  changed to a different image - a gray heart
// * the class name 'lost' is set to the lost variable ie: per image
// * the missed variable adds one to itself
keyBoard.addEventListener('click', (e) => {
  const button = e.target
  if (button.tagName === 'BUTTON' || button.className === 'chosen') {
    button.className = 'chosen'
    button.disabled = true
    const letterFound = checkLetter(button)
    if (letterFound == null || letterFound != button.textContent) { 
     const lost = document.querySelectorAll('.tries img')[missed]
     lost.src='images/lostHeart.png'
     lost.className = 'lost'
     missed++  
    }
    checkWin()
  }
})


// Check if the game has been won or lost //
// * the letterClass variable selects all elements with the class of 'letter'
// * the showClass variable selects all elements with the class of 'show'
// * headline variable selects the h2 element with a title attribute
// * a comparison is made if the length of the letterClass variable is the same as the showClass variables length 
// * depending on the outcome of the if statement will determine whether the game has been won or lost.
// * once determination of the outcome is established, a screen will overlay the one in viewing with a button:
//... 'Start Game' which will reset the game. Notice the function call at the end of both statements. 

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

// * Resets the game after the player has won or lost 
// * All settings are set back to their initial state before the game is played.
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