import {app, BrowserWindow} from 'electron';
import http from 'http';
import getHtml from '../src/client/build/getHtml';

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

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

const server = http.createServer((request, response) => {
    const requestUrl = request.url;

    // PRODUCTION MODE
    // if (requestUrl === '/') {
    //     response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //     response.end(getHtml(), 'utf-8');
    // }
});

server.listen(80);
