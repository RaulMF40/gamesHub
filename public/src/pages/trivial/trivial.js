import './trivial.css'

export const trivial = (array) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5)
  let questionIndex = 0
  let count = 0
  let intentos = 0
  const checkLoose = () => {
    if (intentos >= count * 2) {
      const app = document.querySelector('#app')
      app.innerHTML = ''
      const finalDiv = document.createElement('div')
      finalDiv.className = 'final'
      const loose = document.createElement('h2')
      loose.className = 'loose'
      loose.innerHTML = '¡Has perdido!'
      const reloadButton = document.createElement('button')
      reloadButton.className = 'reload'
      reloadButton.innerText = 'Reiniciar partida'
      reloadButton.addEventListener('click', () => {
        const app = document.querySelector('#app')
        app.innerHTML = ''
        trivial(array)
      })
      finalDiv.append(reloadButton, loose)
      app.append(finalDiv)
      return
    }
  }
  const printGame = (array) => {
    const currentQuestion = shuffledArray[questionIndex]

    const gameContainer = document.createElement('div')
    gameContainer.className = 'trivial-container'

    const questionContainer = document.createElement('div')
    questionContainer.className = 'question-container'

    const question = document.createElement('h3')
    question.className = 'question'
    question.innerText = currentQuestion.pregunta
    questionContainer.append(question)

    const answerContainer = document.createElement('div')
    answerContainer.className = 'answer-container'
    currentQuestion.respuestas.forEach((option) => {
      const options = document.createElement('h4')
      options.className = 'option'
      options.innerText = option.answer
      options.addEventListener('click', () => {
        if (option.value === true) {
          options.classList.add('correct')
          options.style.backgroundColor = 'green'
          setTimeout(() => {
            app.innerHTML = ''
            count++
            intentos++
            questionIndex++
            if (questionIndex < shuffledArray.length) {
              printGame(array)
            } else {
              app.innerHTML = ''
              const endMessage = document.createElement('p')
              endMessage.className = 'end'
              endMessage.innerText = '¡Fin del juego! ¡Enhorabuena!'
              app.appendChild(endMessage)
            }
          }, 1000)
        } else {
          setTimeout(() => {
            intentos++
            jugadas.innerHTML = `Intentos: ${intentos}`
            checkLoose()
          }, 1000)
          options.classList.add('error')
          options.style.backgroundColor = 'red'
        }
      })
      answerContainer.append(options)
    })
    const playerInfo = document.createElement('div')
    playerInfo.className = 'player-container'
    const jugadas = document.createElement('span')
    jugadas.innerHTML = `Intentos:` + ' ' + intentos
    const counter = document.createElement('span')
    counter.innerHTML = `Puntos:` + ' ' + count
    const reloadButton = document.createElement('button')
    reloadButton.className = 'reload'
    reloadButton.innerText = 'Reiniciar partida'
    reloadButton.addEventListener('click', () => {
      const app = document.querySelector('#app')
      app.innerHTML = ''
      trivial(array)
    })
    gameContainer.append(questionContainer, answerContainer)
    playerInfo.append(reloadButton, counter, jugadas)
    const app = document.querySelector('#app')
    app.append(playerInfo, gameContainer)
  }

  printGame(array)
}
