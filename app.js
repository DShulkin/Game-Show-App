const phrases = ['Lucius Seneca', 'Marcus Aurelius', 'Momento Mori', 'Friedrich Nietzsche', 'Amor Fati']
const keyBoard = document.querySelector('#qwerty')
const ul = phrase.querySelector('ul')
let missed = 0

const startGame = document.querySelector('.btn__reset')
startGame.addEventListener('click', () => {
   const overlay = document.querySelector('#overlay')
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
    if (button.textContent == li.textContent) {
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

    if (letterFound === null || letterFound != button.textContent) { 
      const tries = document.querySelector('.tries')
      tries.remove()
      missed++
      //console.log(letterFound, 'NOT INCLUDED')
    }
  }
})
