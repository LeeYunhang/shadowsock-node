import { app, BrowserWindow, globalShortcut } from 'electron'
import path from 'path'
import debounce from 'debounce'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 433, height: 461})
  // and load the index.html of the app.
  win.loadURL(`file://${path.join(__dirname, '..')}/index.html`)

  //disable change the size of window
  win.setResizable(false)
  win.title = 'Shadowsocks'
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  win.on('resize', debounce((e) => console.log(win.getSize()), 200))

  let contentIsOpened = false
  const contents = win.webContents
  globalShortcut.register('F12', () => {
    if (contentIsOpened) {
      contents.closeDevTools()
    } else {
      contents.openDevTools()
    }
    contentIsOpened = !contentIsOpened
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.