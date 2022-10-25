const {shell} = require('electron')
const moment = require('moment');
const dayjs = require('dayjs');
const data = require('./teams.json')

console.log(data)

let content = '';
let days = 0;

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
    days += -1
    getScores()
  } else if (event.target.classList.contains('js-next-scores')) {
    days += 1
    getScores()
  } else if (event.target.classList.contains('js-dark-mode')) {
    const body = document.querySelector('.window')
    if (body.classList.contains('light')) {
      body.classList.remove('light');
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
    }
  }
})

const getScores = async () => {
  let currentDate;
  content = ''

  if(days > 0) {
    currentDate = moment().add(days, 'days').format('YYYYMMDD')
  } else if (days < 0) {
    currentDate = moment().subtract(Math.abs(days), 'days').format('YYYYMMDD')
  } else {
    currentDate = moment().format('YYYYMMDD')
  }

  document.querySelector('.title').innerHTML = moment(currentDate).format('dddd, MMMM Do')

  await fetch(`http://data.nba.net/10s/prod/v1/${currentDate}/scoreboard.json`)
    .then(res => res.json())
    .then(data => {
      if(data.games.length === 0) {
        return document.querySelector('.pane').innerHTML = '<div class="primary only-text">No games today.</div>'
      } else {
        return data.games.map(game => updateView(game))
      }
    })
}

const updateView = (game) => {
  // If the game is over
  if(game.endTimeUTC || moment().format('YYYYMMDD') > game.startDateEastern) {
    return gameOver(game)
  } 
  // If the game is in progress
  else if(moment().isAfter(game.startTimeUTC) && game.period.current > 0) {
    return inProgress(game)
  }
  // If the game hasn't started
  else if(moment().isBefore(game.startTimeUTC) || moment().format('YYYYMMDD') < game.startDateEastern) {
    return notStarted(game)
  }

}

const notStarted = game => {
  content += `
  <div class="game-box">
    <div class="column">
      <img src="./assets/teams/${game.hTeam.triCode}.png" alt="${game.hTeam.triCode}">
    </div>
    <div class="column">
      <div class="description">${game.hTeam.triCode}</div>
    </div>
    <div class="column">
      <div class="description">${game.startTimeEastern}</div>
    </div>
    <div class="column">
      <div class="description">${game.vTeam.triCode}</div>
    </div>
    <div class="column">
      <img src="./assets/teams/${game.vTeam.triCode}.png" alt="${game.vTeam.triCode}">
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
  console.log(game)
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

// Refresh scores every 30 seconds
const refresh = 30 * 1000
setInterval(getScores, refresh)

// Update initial scores when loaded
document.addEventListener('DOMContentLoaded', getScores)