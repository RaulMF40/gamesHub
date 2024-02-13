import './TresEnRaya.css'

export const tresEnRaya = () => {
  const players = ['X', 'O']
  const arrayBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  let currentPlayer = ''
  let pcPlayer = ''
  const winningCombinations = [
    ['00', '01', '02'], // Primera fila
    ['00', '02', '01'], // Primera fila
    ['01', '00', '02'], // Primera fila
    ['01', '02', '00'], // Primera fila
    ['02', '00', '01'], // Primera fila
    ['02', '01', '00'], // Primera fila

    ['10', '11', '12'], // Segunda fila
    ['10', '12', '11'], // Segunda fila
    ['11', '10', '12'], // Segunda fila
    ['11', '12', '10'], // Segunda fila
    ['12', '10', '11'], // Segunda fila
    ['12', '11', '10'], // Segunda fila

    ['20', '21', '22'], // Tercera fila
    ['20', '22', '21'], // Tercera fila
    ['21', '20', '22'], // Tercera fila
    ['21', '22', '20'], // Tercera fila
    ['22', '20', '21'], // Tercera fila
    ['22', '21', '20'], // Tercera fila

    // Columnas
    ['00', '10', '20'], // Primera columna
    ['00', '20', '10'], // Primera columna
    ['10', '00', '20'], // Primera columna
    ['10', '20', '00'], // Primera columna
    ['20', '00', '10'], // Primera columna
    ['20', '10', '00'], // Primera columna

    ['01', '11', '21'], // Segunda columna
    ['01', '21', '11'], // Segunda columna
    ['11', '01', '21'], // Segunda columna
    ['11', '21', '01'], // Segunda columna
    ['21', '01', '11'], // Segunda columna
    ['21', '11', '01'], // Segunda columna

    ['02', '12', '22'], // Tercera columna
    ['02', '22', '12'], // Tercera columna
    ['12', '02', '22'], // Tercera columna
    ['12', '22', '02'], // Tercera columna
    ['22', '02', '12'], // Tercera columna
    ['22', '12', '02'], // Tercera columna

    // Diagonales
    ['00', '11', '22'], // Diagonal principal
    ['00', '22', '11'], // Diagonal principal
    ['11', '00', '22'], // Diagonal principal
    ['11', '22', '00'], // Diagonal principal
    ['22', '00', '11'], // Diagonal principal
    ['22', '11', '00'], // Diagonal principal

    ['02', '11', '20'], // Diagonal secundaria
    ['02', '20', '11'], // Diagonal secundaria
    ['11', '02', '20'], // Diagonal secundaria
    ['11', '20', '02'], // Diagonal secundaria
    ['20', '02', '11'], // Diagonal secundaria
    ['20', '11', '02'] // Diagonal secundaria
  ]
  const clicked = []

  const clickedPlayer = (e) => {
    const playerChosen = e.target
    console.log(playerChosen)

    document.querySelectorAll('.player').forEach((player) => {
      player.classList.remove('focus')
    })
    playerChosen.classList.add('focus')
    currentPlayer = playerChosen.innerText
  }
  const getEmptyBoxes = () => {
    return document.querySelectorAll('.box:not(.clicked)')
  }

  const pcMovement = (pcPlayer) => {
    const emptyBoxes = getEmptyBoxes()
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length)
    const randomBox = emptyBoxes[randomIndex]
    const pc = document.createElement('span')
    pc.innerText = pcPlayer
    randomBox.append(pc)
    randomBox.classList.add('clicked')
    return randomBox
  }

  const checkWinner = () => {
    for (const combination of winningCombinations) {
      const [box1, box2, box3] = combination
      const elem1 = document.querySelector(
        `[data-row="${box1.charAt(0)}"][data-col="${box1.charAt(1)}"]`
      )
      const elem2 = document.querySelector(
        `[data-row="${box2.charAt(0)}"][data-col="${box2.charAt(1)}"]`
      )
      const elem3 = document.querySelector(
        `[data-row="${box3.charAt(0)}"][data-col="${box3.charAt(1)}"]`
      )

      if (
        elem1.innerText === currentPlayer &&
        elem2.innerText === currentPlayer &&
        elem3.innerText === currentPlayer
      ) {
        const winMessage = document.createElement('h3')
        winMessage.innerText = '¡Ganaste!'
        winMessage.className = 'win'
        const buttonContainer = document.querySelector('.button-container')
        buttonContainer.append(winMessage)
        return true
      }
    }
    return false
  }

  const boxClicked = (e) => {
    const clickedBox = e.target
    const getCoords = () => {
      const row = clickedBox.getAttribute('data-row')
      const col = clickedBox.getAttribute('data-col')
      const result = `${row}${col}`
      return result
    }
    const coords = getCoords()
    clicked.push(coords)

    console.log(clicked)
    const moveChosen = () => {
      if (clickedBox.classList.contains('clicked')) {
        return
      }
      if (clicked.length >= 3) {
        checkWinner()
      }
      if (currentPlayer === 'X') {
        const Xmove = document.createElement('span')
        Xmove.innerHTML = 'X'
        clickedBox.appendChild(Xmove)
        clickedBox.classList.add('clicked')
        pcPlayer = 'O'
        setTimeout(() => {
          pcMovement(pcPlayer)
        }, 500)
      } else if (currentPlayer === 'O') {
        const Omove = document.createElement('span')
        Omove.innerHTML = 'O'
        clickedBox.appendChild(Omove)
        clickedBox.classList.add('clicked')
        pcPlayer = 'X'
        setTimeout(() => {
          pcMovement(pcPlayer)
        }, 500)
      }
    }
    moveChosen()
    console.log(pcPlayer)
  }

  const printGame = (array) => {
    const divContainerGame = document.createElement('div')
    divContainerGame.className = 'container-game'
    const board = document.createElement('div')
    board.className = 'board'
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'button-container'
    const reloadButton = document.createElement('button')
    reloadButton.className = 'reload'
    reloadButton.innerText = 'Reiniciar partida'

    players.forEach((player) => {
      const buttonPlayer = document.createElement('button')
      buttonPlayer.className = 'player'
      buttonPlayer.innerText = player
      buttonContainer.append(buttonPlayer)
      buttonPlayer.addEventListener('click', clickedPlayer)
    })
    buttonContainer.append(reloadButton)
    divContainerGame.append(buttonContainer, board)
    const app = document.querySelector('#app')
    app.append(divContainerGame)
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      const rowBoard = document.createElement('div')
      board.append(rowBoard)
      for (let j = 0; j < row.length; j++) {
        const box = row[j]
        const boxBoard = document.createElement('div')
        boxBoard.className = 'box'
        boxBoard.setAttribute('data-row', i)
        boxBoard.setAttribute('data-col', j)
        rowBoard.append(boxBoard)
        boxBoard.addEventListener('click', boxClicked)
      }
    }
  }

  printGame(arrayBoard)
}
