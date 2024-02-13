import { createHeader } from './public/src/components/header/header'
import { memory } from './public/src/pages/memory/memory'
import { tresEnRaya } from './public/src/pages/tresEnRaya/tresEnRaya'
import { wellcome } from './public/src/pages/wellcome/wellcome'
import { GAMES } from './public/src/utils/data'
import './style.css'
createHeader(GAMES)
wellcome()
const gameButton = document.querySelector('.game-btn')
gameButton.addEventListener('click', () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''
  memory(GAMES[0].id)
})
const secondButtongame = document.querySelector('#TresEnRaya')
secondButtongame.addEventListener('click', () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''
  tresEnRaya()
})
const thirdButtongame = document.querySelector('#Trivial')
thirdButtongame.addEventListener('click', () => {
  const app = document.querySelector('#app')
  app.innerHTML = ''
})
