const {shell} = require('electron')

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

// Make request to nba api
  // loop through each game and render a block of code
    // if game hasnt started, show start time
    // if game has started, show scores and time left
    // if game has ended, show "final" and scores


// // Refresh scores every 30 seconds
// const thirty = 30 * 1000
// setInterval(updateWeather, thirty)

// // Update initial scores when loaded
// document.addEventListener('DOMContentLoaded', updateWeather)