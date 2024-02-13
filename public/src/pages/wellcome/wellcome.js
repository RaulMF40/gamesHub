import './wellcome.css'
export const wellcome = () => {
  const wellcomeContainer = document.createElement('div')
  wellcomeContainer.className = 'container'
  const titleWellcome = document.createElement('h2')
  titleWellcome.id = 'titleWellcome'
  titleWellcome.innerHTML = 'Come play different games!'
  const bottonPlay = document.createElement('button')
  bottonPlay.id = 'bottonPlay'
  bottonPlay.innerText = 'PLAY'
  bottonPlay.addEventListener('click', () => {
    app.innerHTML = ''
    const chooseGameText = document.createElement('h2')
    chooseGameText.id = 'choose-text'
    chooseGameText.innerHTML = 'Escoge tu juego'
    app.append(chooseGameText)
  })
  wellcomeContainer.append(titleWellcome, bottonPlay)
  const containerGif = document.createElement('div')
  containerGif.id = 'containerGif'
  const gif = document.createElement('img')
  gif.id = 'gif'
  gif.src =
    'http://lafrikileria.com/blog/wp-content/uploads/2021/04/space-invaders.gif'
  containerGif.append(gif)
  const app = document.querySelector('#app')
  app.append(wellcomeContainer, containerGif)
}
