const {shell} = require('electron')
const moment = require('moment');

let content = '';
let currentDate = moment().format('YYYYMMDD');

document.addEventListener('click', (event) => {
  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault()
  } else if (event.target.classList.contains('js-refresh-action')) {
    // CHANGE THISS!!!
    console.log('REFRESH SCORES')
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close()
  }
})

const getScores = () => {
  fetch('http://data.nba.net/10s/prod/v1/20190213/scoreboard.json')
    .then(res => res.json())
    .then(data => data.games.map(game => updateView(game)))
}

const updateView = (game) => {
  console.log(game.endTimeUTC)
  // If the game is over
  if(game.endTimeUTC) {
    return gameOver(game)
  } 
  // If the game is in progress
  // If the game hasn't started
}

const gameOver = (game) => {
  content += `
  <div class="game-box">
    <div class="column">
      <img src="./assets/teams/${game.hTeam.triCode}.png" alt="...">
    </div>
    <div class="column">
      <div class="primary">${game.hTeam.score}</div>
      <div class="description">${game.hTeam.triCode}</div>
    </div>
    <div class="column">
      <div class="primary">FINAL</div>
    </div>
    <div class="column">
      <div class="primary">${game.vTeam.score}</div>
      <div class="description">${game.vTeam.triCode}</div>
    </div>
    <div class="column">
      <img src="./assets/teams/${game.vTeam.triCode}.png" alt="...">
    </div>
  </div>
  `
  document.querySelector('.pane').innerHTML = content
}

const updateScores = () => {
  getScores()
}

// // Refresh scores every 30 seconds
// const thirty = 30 * 1000
// setInterval(updateWeather, thirty)

// // Update initial scores when loaded
document.addEventListener('DOMContentLoaded', updateScores)