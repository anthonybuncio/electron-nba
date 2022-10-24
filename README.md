<div align="center">
  <img src="https://emojis.slackmojis.com/emojis/images/1643516237/22652/basketball.png" alt="Responsively Logo" width="50">
  
  <h1>Electron App</h1>
  <strong>A must-have devtool for web developers for quicker responsive web development. 🚀</strong>
  <h6>Save time by becoming 5x faster!</h6>
</div>
<br>

# [electron-nba](https://www.anthony.wiki/apps/run-it-up)

> An open-source, **live-updating** NBA scoring app

## Features:

- Scores for all games in any season
- Shows score in real-time for current NBA games.
- Refreshes every 15 sec. (manual refresh option)
- Dark mode/light mode switch

Tech used:

- [Electron](https://electronjs.org/), [moment](https://momentjs.com/), [Photon](http://photonkit.com), [NBA-API](http://data.nba.net/10s/prod/v1/today.json)

[Change log](https://github.com/AnthonyBuncio/electron-nba/issues/closed)

## Screenshots

![image](https://user-images.githubusercontent.com/19740119/52922234-61ba2700-32e5-11e9-8a2e-ac9ebc1bf78c.png)

---

## Installation

_If you want to self-host or help develop electron-nba._

### Local development

#### Requirements

- Node + npm/yarn, [nvm](https://github.com/creationix/nvm) is the preferred installation method.

#### Download electron-nba

`git clone https://github.com/AnthonyBuncio/electron-nba`

#### Install dependencies

```sh
cd electron-nba
npm install
```

#### Run electron-nba

```sh
npm start
```

---

## Bugs and feature requests

Have a bug or a feature request? If your issue isn't [already listed](https://github.com/AnthonyBuncio/electron-nba/issues), then open a [new issue here](https://github.com/AnthonyBuncio/electron-nba/issues/new).

## TODO

- [x] Add previous/next day toolbar header
- [x] Dark mode
- [x] Change text for days without games
- [x] Remove 0 score for games that haven't started
