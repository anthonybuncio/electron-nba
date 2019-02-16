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
    getScores()
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close()
  } else if (event.target.classList.contains('js-previous-scores')) {
    console.log('show previous day')
  } else if (event.target.classList.contains('js-next-scores')) {
    console.log('show next day')
  } else if (event.target.classList.contains('js-dark-mode')) {
    console.log('dark mode')
  }
})

const getScores = () => {
  fetch('http://data.nba.net/10s/prod/v1/20190213/scoreboard.json')
    .then(res => res.json())
    .then(data => data.games.map(game => updateView(game)))
}

const updateView = (game) => {
  // If the game is over
  if(game.endTimeUTC || currentDate > game.startDateEastern) {
    return gameOver(game)
  } 
  // If the game is in progress
  else if(moment().isAfter(game.startTimeUTC) && game.period.current > 0) {
    return inProgress(game)
  }
  // If the game hasn't started
  else if(moment().isBefore(game.startTimeUTC) || currentDate < startDateEastern) {
    return notStarted(game)
  }
}

const notStarted = game => {
  content += `
  <div class="game-box">
    <div class="column">
      <img src="./assets/teams/${game.hTeam.triCode}.png" alt="...">
    </div>
    <div class="column">
      <div class="primary">0</div>
      <div class="description">${game.hTeam.triCode}</div>
    </div>
    <div class="column">
      <div class="description">${game.startTimeEastern}</div>
    </div>
    <div class="column">
      <div class="primary">0</div>
      <div class="description">${game.vTeam.triCode}</div>
    </div>
    <div class="column">
      <img src="./assets/teams/${game.vTeam.triCode}.png" alt="...">
    </div>
  </div>
  `
  document.querySelector('.pane').innerHTML = content
}

const inProgress = game => {
  let quarterCheck;
  if(game.period.isHalfime) {
    quarterCheck = 'HALFTIME'
  } else {
    quarterCheck = `Q${game.period.current}`
  }

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
      <div class="primary">${game.clock}</div>
      <div class="description">${quarterCheck}</div>
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

const gameOver = game => {
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
      <div class="description">FINAL</div>
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

// // Refresh scores every 30 seconds
// const thirty = 30 * 1000
// setInterval(getScores, thirty)

// // Update initial scores when loaded
document.addEventListener('DOMContentLoaded', getScores)