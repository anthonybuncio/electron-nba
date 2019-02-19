# Electron - NBA

NBA scoreboard app for the MacOS menubar using [Electron](https://electronjs.org/).

The app shows the score of current NBA games and refreshes every 15 seconds.

Built with [Photon](http://photonkit.com). Uses the [NBA API](http://data.nba.net/10s/prod/v1/today.json).

## Running

```sh
git clone https://github.com/AnthonyBuncio/electron-nba
cd electron-nba
npm install
npm start
```

![Screenshot](https://user-images.githubusercontent.com/19740119/52922234-61ba2700-32e5-11e9-8a2e-ac9ebc1bf78c.png)

### TODO
* [x] Add previous/next day toolbar header
* [x] Dark mode
* [x] Change text for days without games
* [x] Remove 0 score for games that haven't started