import { autoUpdater } from "electron-updater"
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const Menu = electron.Menu;
const Tray = electron.Tray;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1030, 
    height: 670, 
    transparent: true, 
    frame: false,
    icon: path.join(__dirname, 'assets/images/favicon.icon')
  })
  //系统托盘右键菜单
  var trayMenuTemplate = [
    {
      label: '打开',
      click: function () {
        mainWindow.show();
      } //打开相应页面
    },
    {
      label: '退出',
      click: function () {
        //ipc.send('close-main-window');
        app.quit();
      }
    }
  ];
  //系统托盘图标目录
  trayIcon = path.join(__dirname, 'assets/images');
  appTray = new Tray(path.join(trayIcon, 'favicon.ico'));
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('豆瓣电影');
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //debuger;
  // mainWindow.loadURL('http://localhost:8083')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle(){
    let message={
      error:'检查更新出错',
      checking:'正在检查更新……',
      updateAva:'检测到新版本，正在下载……',
      updateNotAva:'现在使用的就是最新版本，不用更新',
    };
    const os = require('os');
    autoUpdater.setFeedURL('http://www.xxx.com/');
    autoUpdater.on('error', function(error){
      sendUpdateMessage(message.error)
    });
    autoUpdater.on('checking-for-update', function() {
      sendUpdateMessage(message.checking)
    });
    autoUpdater.on('update-available', function(info) {
        sendUpdateMessage(message.updateAva)
    });
    autoUpdater.on('update-not-available', function(info) {
        sendUpdateMessage(message.updateNotAva)
    });
    
    // 更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
        mainWindow.webContents.send('downloadProgress', progressObj)
    })
    autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, arg) => {
            //some code here to handle event
            autoUpdater.quitAndInstall();
        })
        mainWindow.webContents.send('isUpdateNow')
    });
    
    //执行自动更新检查
    autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
// mainWindow = new BrowserWindow()
function sendUpdateMessage(text){
    mainWindow.webContents.send('message', text)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('hide', function() {
  mainWindow.setSkipTaskbar(true);
});
app.on('show', function() {
  mainWindow.setSkipTaskbar(false);
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
