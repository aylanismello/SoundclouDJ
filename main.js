const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const url = require('url')
const data = require('./data/data.json')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    console.log('deuces!')
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const soundscrapeCB = (path, url) => {
  // gett root directory here
  // process.chdir(path)
  console.log(`in callback downloading playlists into ${path}`)
  // when done, go back
}

ipcMain.on('download-playlists', event => {
  let {playlists} = data

  playlists.forEach(url => {
    let artistName = url.split('/').slice(-3)[0]
    let playlistName = url.split('/').slice(-1)[0]
    let folderName = `${artistName}_${playlistName}` || `balls`
    // console.log(`downloading from ${playlistName} by ${artistName}`)

    console.log(`folder called ${folderName}`)
    // console.log(`\n\n`)
    let path = `${data['rootFolderPath']}/${folderName}`

    fs.stat(path, (err, stats) => {
      // FOLDER DOESN'T EXIST
      if (err) {
        console.log(err)

        // Make directory here
        fs.mkdir(path, (err, info) => {
          if (err) {
            console.log(`error making directory: ${err}`)
          } else {
            console.log(`success making dir! ${data}`)
            soundscrapeCB(path, url)
          }
        })
      } else {
        console.log(`${path} has already been created!`)
        soundscrapeCB(path, url)
      }
    })
  })

  event.sender.send('receive-playlists', 'finished downloading playlists')
  // console.log('fetching playlists!')
})

ipcMain.on('load-data', event => {
  console.log('gonna load playlists')
  event.returnValue = data
})

ipcMain.on('update-data', (event, arg) => {
  console.log('gonna update playlist urls')

  const dataPath = `${process.cwd()}/data/data.json`

  let data = fs.readFileSync(dataPath, 'utf-8')

  data = JSON.parse(data)
  data['playlists'] = arg['playlists']
  data['rootFolderPath'] = arg['rootFolderPath']

  console.log(data)
  fs.writeFileSync(dataPath, JSON.stringify(data), 'utf-8')

  // return here should be json file after written

  event.returnValue = arg
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
