const {shell} = require('electron')

let content = '';
let currentDate = null;

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

const formatDate = () => {
  var d = new Date(),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  currentDate = [year, month, day].join('');
}

// Make request to nba api
  // loop through each game and render a block of code
    // if game hasnt started, show start time
    // if game has started, show scores and time left
    // if game has ended, show "final" and scores
const getScores = () => {
  fetch('http://data.nba.net/10s/prod/v1/20190213/scoreboard.json')
    .then(res => res.json())
    .then(data => data.games.map(game => updateView(game)))
}

const updateView = (game) => {
  console.log(game)
  // If the game is over
  if(currentDate > game.startDateEastern) {
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
  formatDate()
  getScores()
}

// // Refresh scores every 30 seconds
// const thirty = 30 * 1000
// setInterval(updateWeather, thirty)

// // Update initial scores when loaded
document.addEventListener('DOMContentLoaded', updateScores)