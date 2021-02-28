const electron = require('electron')
const { 
  app,  
  dialog,
  Menu,
  MenuItem,
  ipcMain,
  globalShortcut, 
  BrowserWindow
} = electron

let mainWindow
const display = 'http://localhost';
const pengaturan = 'http://localhost/settings';
const ipcam = 'http://192.168.1.160:8080/jsfs.html';
const path = require('path')
//const modalPath = path.join('file://', __dirname, 'index.html')

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false
  })
  mainWindow.loadURL(display)
})

// Fungsi Menu klik kanan
const menu = new Menu()
menu.append(new MenuItem({
  label: 'Diplay (CTRL + X)',
  click() {
    mainWindow.loadURL(display)
    mainWindow.show()
  }
}))

menu.append(new MenuItem({
  label: 'Live Video (CTRL + L)',
  click() {
    mainWindow.loadURL(ipcam)
    mainWindow.show()
  }
}))

menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({
  label: 'Pengaturan (CTRL + P)',
  click() {
    mainWindow.loadURL(pengaturan)
    mainWindow.show()
  }
}))

menu.append(new MenuItem({
  label: 'Keluar (ESC)',
  click() {
    mainWindow.close();
  }
}))

app.on('browser-window-created', (event, winMenu) => {
  winMenu.webContents.on('context-menu', (e, params) => {
    menu.popup(winMenu, params.x, params.y)
  })
})

ipcMain.on('show-context-menu', (event) => {
  const winMenu = BrowserWindow.fromWebContents(event.sender)
  menu.popup(winMenu)
})

// Fungsi untuk keypress keyboard
app.on('ready', () => {
  globalShortcut.register('Esc', () => {
    mainWindow.close();
  })
})
app.on('ready', () => {
  globalShortcut.register('CommandOrControl+x', () => {
    mainWindow.loadURL(display)
  })
})
app.on('ready', () => {
  globalShortcut.register('CommandOrControl+l', () => {
    mainWindow.loadURL(ipcam)
  })
})
app.on('ready', () => {
  globalShortcut.register('CommandOrControl+p', () => {
    mainWindow.loadURL(pengaturan)
  })
})
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
