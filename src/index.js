import {app, BrowserWindow, ipcMain} from 'electron';
import express from 'express';

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const server = express();

let express_app;
let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

server.get('/', (req, res) => res.send('Hello World!'));

ipcMain.on('start_server', (event, arg) => {
    express_app = server.listen(80, () => console.log('Example app listening on port 80!'));
    event.sender.send('server_is_started', 'server_is_started')
});

ipcMain.on('stop_server', (event, arg) => {
    express_app.close(() => event.sender.send('server_is_stopped', 'server_is_stopped'));
});
