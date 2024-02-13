import { GAMES } from '../../utils/data'
import './memory.css'

export const memory = (data) => {
  const cards = [
    'https://media.revistagq.com/photos/5cb725b0cd5468d970512e0c/16:9/w_1280,c_limit/ross_geller_friends_1863.jpg',
    'https://media.glamour.es/photos/616f906415e793e9437c64ca/master/w_1600%2Cc_limit/628182.jpg',
    'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/10/Chandler-Bing-scaled.jpg?fit=1200%2C675&quality=50&strip=all&ssl=1',
    'https://hips.hearstapps.com/hmg-prod/images/friends-joey-mejor-peor-personaje-1563950745.jpg',
    'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/05/22/15585378008049.jpg',
    'https://egoenigma.com/wp-content/uploads/2023/11/rachel-green-analisis-personalidad.jpg',
    'https://image.ondacero.es/clipping/cmsimages02/2021/10/25/C2481CE9-D489-4315-8A38-59CB128DE7FD/98.jpg?crop=720,405,x0,y0&width=1900&height=1069&optimize=high&format=webply',
    'https://64.media.tumblr.com/2cc212265a002c96acfc8349f1c78e2c/tumblr_psp3tvWZqe1x2rh0vo5_1280.jpg',
    'https://media.revistagq.com/photos/5cb725b0cd5468d970512e0c/16:9/w_1280,c_limit/ross_geller_friends_1863.jpg',
    'https://media.glamour.es/photos/616f906415e793e9437c64ca/master/w_1600%2Cc_limit/628182.jpg',
    'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/10/Chandler-Bing-scaled.jpg?fit=1200%2C675&quality=50&strip=all&ssl=1',
    'https://hips.hearstapps.com/hmg-prod/images/friends-joey-mejor-peor-personaje-1563950745.jpg',
    'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/05/22/15585378008049.jpg',
    'https://egoenigma.com/wp-content/uploads/2023/11/rachel-green-analisis-personalidad.jpg',
    'https://image.ondacero.es/clipping/cmsimages02/2021/10/25/C2481CE9-D489-4315-8A38-59CB128DE7FD/98.jpg?crop=720,405,x0,y0&width=1900&height=1069&optimize=high&format=webply',
    'https://64.media.tumblr.com/2cc212265a002c96acfc8349f1c78e2c/tumblr_psp3tvWZqe1x2rh0vo5_1280.jpg'
  ]
  let flipped = []
  let score = 0

  const createBoard = (array, data) => {
    const tablero = document.createElement('div')
    tablero.className = 'game-container'
    tablero.id = data.id

    array.forEach((card) => {
      const flipCard = document.createElement('div')
      flipCard.className = 'flip-card'
      flipCard.addEventListener('click', handleCardClick)

      const flipCardInner = document.createElement('div')
      flipCardInner.className = 'flip-card-inner'

      const flipCardFront = document.createElement('div')
      flipCardFront.className = 'flip-card-front'

      const imageCard = document.createElement('img')
      imageCard.className = 'image-card'
      imageCard.src =
        'https://cdn.iconscout.com/icon/free/png-256/free-friends-4-225967.png?f=webp'

      const flipCardBack = document.createElement('div')
      flipCardBack.className = 'flip-card-back'
      const imgBack = document.createElement('img')
      imgBack.className = 'img-back'
      imgBack.src = card

      flipCardBack.append(imgBack)
      flipCardFront.append(imageCard)
      flipCardInner.append(flipCardFront, flipCardBack)
      flipCard.append(flipCardInner)
      tablero.append(flipCard)
    })

    const app = document.querySelector('#app')
    app.append(tablero)
  }

  const handleCardClick = (event) => {
    const clickedCard = event.currentTarget
    if (flipped.length === 2 || clickedCard.classList.contains('flipped')) {
      return
    }

    clickedCard.classList.add('flipped')
    flipped.push(clickedCard)

    if (flipped.length === 2) {
      const [img1, img2] = flipped.map(
        (card) => card.querySelector('.img-back').src
      )

      if (img1 === img2) {
        flipped = []
        score++

        document.querySelector('#score').innerText = `Puntuación: ${score}`
        if (score === cards.length / 2) {
          const winMessage = document.createElement('h3')
          winMessage.innerText = '¡Ganaste!'
          winMessage.className = 'win-text'
          counterScore.append(winMessage)
        }
      } else {
        setTimeout(() => {
          flipped.forEach((card) => card.classList.remove('flipped'))
          flipped = []
        }, 700)
      }
    }
  }
  const divContainerApp = document.createElement('div')
  divContainerApp.className = 'container-app'
  const counterScore = document.createElement('h2')
  counterScore.className = 'counter-title'
  counterScore.id = 'score'
  counterScore.innerText = `Puntuación: ${score}`
  const reloadButton = document.createElement('button')
  reloadButton.className = 'reload'
  reloadButton.innerText = 'Reiniciar partida'
  divContainerApp.append(counterScore, reloadButton)
  const app = document.querySelector('#app')
  app.append(divContainerApp)

  reloadButton.addEventListener('click', () => {
    const app = document.querySelector('#app')
    app.innerHTML = ''
    memory(GAMES[0].id)
  })

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  shuffleArray(cards)
  createBoard(cards, data)
}
