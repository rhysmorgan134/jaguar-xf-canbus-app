const path = require('path');
const url = require('url');
const {app, BrowserWindow, ipcMain, ipcRenderer, globalShortcut, dialog} = require('electron');
const {channels} = require('../src/shared/constants');
const dns = require('dns');
const fs = require('fs')
const { Readable } = require('stream');
const isDev = require('electron-is-dev');
const WebSocket = require('ws');
const request = require('request');
const semver = require('semver')
const cp = require('child_process');

require('update-electron-app')()

const mp4Reader = new Readable({
    read(size) {
    }
});

const Carplay = require('node-carplay')
const bindings = ['n', 'v', 'b', 'm', ]
const keys = require('./bindings.json')


let wss;
wss = new WebSocket.Server({ port: 3002 });

wss.on('connection', function connection(ws) {
    console.log('Socket connected. sending data...');
    const wsstream = WebSocket.createWebSocketStream(ws);
    //lets pipe into jmuxer stream, then websocket
    mp4Reader.pipe(wsstream);
    ws.on('error', function error(error) {
        console.log('WebSocket error');
    });
    ws.on('close', function close(msg) {
        console.log('WebSocket close');
    });
});



let mainWindow;
let internetConnection = false;
let updateChecked = false
let version =  app.getVersion()
console.log(app.getAppPath())
console.log(version)
function createWindow() {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

    globalShortcut.register('f5', function () {
        console.log('f5 is pressed')
        mainWindow.webContents.openDevTools()
    })
    if(isDev) {
        mainWindow = new BrowserWindow({
            width: 1200, height: 600, frame: false, webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: false
            }
        });
    } else {
        mainWindow = new BrowserWindow({
            width: 800, height: 480, kiosk: true, webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                contextIsolation: false
            }
        });
    }

    mainWindow.loadURL(startUrl);

    let size = mainWindow.getSize()

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    const config = {
        dpi: 480,
        nightMode: 0,
        hand: 0,
        boxName: 'nodePlay',
        width: size[0],
        height: size[1],
        fps: 30,
    }
    console.log("spawning carplay", config)
    const carplay = new Carplay(config, mp4Reader)

    // switchHome = () => {
    //     mainWindow.webContents.send('quit')
    // }
    //require('./server')(mainWindow, isDev, switchHome)
   require('./server')(mainWindow, isDev, mp4Reader)
    carplay.on('status', (data) => {
        if(data.status) {
            mainWindow.webContents.send('plugged')
        } else {
            mainWindow.webContents.send('unplugged')
        }
        console.log("data received", data)

    })
    carplay.on('quit', () => {
        mainWindow.webContents.send('quit')
    })
    ipcMain.on('click', (event, data) => {
        carplay.sendTouch(data.type, data.x, data.y)
        console.log(data.type, data.x, data.y)
    })
    ipcMain.on('statusReq', (event, data) => {
        if(carplay.getStatus()) {
            mainWindow.webContents.send('plugged')
        } else {
            mainWindow.webContents.send('unplugged')
        }
    })

    for (const [key, value] of Object.entries(keys)) {
        if(isDev) {
            return
        }
        globalShortcut.register(key, function () {
            carplay.sendKey(value)
            if(value==="selectDown"){
                setTimeout(()=>{
                    carplay.sendKey("selectUp")
                }, 200)
            }
        })
    }
}

let connCheck = setInterval(() => {
    console.log("checking connection")
    checkConnection()
}, 10000)

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

const checkConnection = () => {
    dns.lookupService('8.8.8.8', 53, function(err, hostname, service){
        if(err) {
            internetConnection = false
            console.log(err)
        } else {
            console.log(hostname, service);
            if(!updateChecked) {
                checkIfUpdate()
            }
        }

        // google-public-dns-a.google.com domain
    });
}

const checkIfUpdate = () => {
    const options = {
        url: 'https://api.github.com/repos/rhysmorgan134/jaguar-xf-canbus-app/releases/latest',
        headers: {
            'User-Agent': 'request'
        },
        json: true
    };
    request(options, (err, res, body) => {
        if (err) { return console.log(err); }
        if(semver.valid(version) || semver.valid(body.tag_name)) {
            if(semver.lt(version, body.tag_name)) {
                console.log("update available")
                let updateQuestion = dialog.showMessageBoxSync({
                    message: "update available, do you wish to download",
                    type: "question",
                    buttons: ["Cancel", "update"],
                })
                if(updateQuestion) {
                    downloadUpdate(body.assets[0].browser_download_url).then(() => {
                        console.log("downloaded")
                        var child = cp.spawn('sleep 5 && mv temp.AppImage jag.AppImage && chmod +x jag.AppImage && ./jag.AppImage',  { detached: true, shell: true})
                        child.unref();
                        app.quit()
                    }).catch((err) => {
                        console.log("error downloading", err)
                    })
                }
            } else {
                console.log("on latest version")
            }
            clearInterval(connCheck)
        } else {
            console.log("versioning number error, please download manually")
        }

        updateChecked = true;
    });
}

const downloadUpdate = async (url) => {
    /* Create an empty file where we can save data */
    let file = fs.createWriteStream(`temp.AppImage`);
    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
        let stream = request({
            /* Here you should specify the exact link to the file you are trying to download */
            uri: url,
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            /* GZIP true for most of the websites now, disable it if you don't need it */
            gzip: true
        })
            .pipe(file)
            .on('finish', () => {
                console.log(`The file is finished downloading.`);
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            })
    })
        .catch(error => {
            console.log(`Something happened: ${error}`);
        });
}




//
// const { app, BrowserWindow, globalShortcut, session, ipcMain } = require('electron')
// const path = require('path')
// const isDev = require('electron-is-dev')
// const Ws = require('./Ws')
// const ws = Ws.ws()
// const Carplay = require('node-carplay')
// const bindings = ['n', 'v', 'b', 'm', ]
// const keys = require('./bindings.json')
// console.log(keys['m'])
// // let installExtension = require('electron-devtools-installer')
//
// // app.whenReady().then(() => {
// //     installExtension(REDUX_DEVTOOLS)
// //         .then((name) => console.log(`Added Extension:  ${name}`))
// //         .catch((err) => console.log('An error occurred: ', err));
// // });
//
// //session.loadExtension(path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.6.4.2101_0'))
//
//
// function createWindow () {
//     // Create the browser window.
//     const win = new BrowserWindow({
//         width: 800,
//         height: 480,
//         frame: false,
//         kiosk: true,
//         webPreferences: {
//             nodeIntegration: true,
//             enableRemoteModule:true,
//             preload: path.join(__dirname, 'preload.js'),
//             contextIsolation: false
//         }
//     })
//         //***//
//         globalShortcut.register('f5', function() {
//             console.log('f5 is pressed')
//             win.webContents.openDevTools()
//         })
//         globalShortcut.register('CommandOrControl+R', function() {
//             console.log('CommandOrControl+R is pressed')
//             win.reload()
//         })
//     let size = win.getSize()
//     const config = {
//         dpi: 240,
//         nightMode: 0,
//         hand: 0,
//         boxName: 'nodePlay',
//         width: 800,
//         height: 480,
//         fps: 30,
//     }
//     const carplay = new Carplay(config)
//    switchHome = () => {
// 	win.webContents.send('quit')
//    }
//    require('./server')(win, isDev, switchHome)
//
//     carplay.on('status', (data) => {
//         if(data.status) {
//             win.webContents.send('plugged')
//         } else {
//             win.webContents.send('unplugged')
//         }
//         console.log("data received", data)
//
//     })
//
//     carplay.on('quit', () => {
//
//     })
//
//     for (const [key, value] of Object.entries(keys)) {
//         globalShortcut.register(key, function () {
//             carplay.sendKey(value)
//         })
//     }
//
//     ipcMain.on('click', (event, data) => {
//         carplay.sendTouch(data.type, data.x, data.y)
//         console.log(data.type, data.x, data.y)
//     })
//
//     ipcMain.on('statusReq', (event, data) => {
//         if(carplay.getStatus()) {
//             win.webContents.send('plugged')
//         } else {
//             win.webContents.send('unplugged')
//         }
//     })
//
//     //load the index.html from a url
//     win.loadURL('http://localhost:3000');
//   //   installExtension.default(installExtension.REACT_DEVELOPER_TOOLS)
//     //     .then((name) => console.log(`Added Extension:  ${name}`))
//       //   .catch((err) => console.log('An error occurred: ', err));
//      //installExtension.default(installExtension.REDUX_DEVTOOLS)
//      //    .then((name) => console.log(`Added Extension:  ${name}`))
//      //    .catch((err) => console.log('An error occurred: ', err));
//      //Open the DevTools.
//
// }
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)
//
// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })
//
// app.on('activate', () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//     }
// })
//
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
