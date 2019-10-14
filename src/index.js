import {app, BrowserWindow, ipcMain} from 'electron';
import {get} from 'lodash';
import http from 'http';
import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';
import {SERVER, CONNECTION, MESSAGES} from './app/constants/channels';
import parseMessage from './app/utils/parse-message';
import contentTypeDetector from './app/utils/content-type-detector';
import addPropToClient from './app/utils/add-prop-to-client';
import {setIdMessage} from './app/api/ws-messages';
import {sendConnectionsToRender} from './app/api/render-request';
// import getHtml from '../src/client/build/getHtml'; //PRODUCTION MODE

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 1000,
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
    const extname = path.extname(requestUrl);
    const contentType = contentTypeDetector(extname);
    const filePath = requestUrl === '/' ? 'src/client/index.html' : `src/client${requestUrl}`;

    // DEVELOPMENT MODE
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', (e, c) => {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(c, 'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
                response.end();
            }
        } else {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf-8');
        }
    });

    // PRODUCTION MODE
    // if (requestUrl === '/') {
    //     response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //     response.end(getHtml(), 'utf-8');
    // }
});

const wss = new WebSocket.Server({port: 8080});

const recieveMessage = ws => (message) => {
    const {type, payload} = parseMessage(message);

    if (type === 'REGISTRATION') {
        if (!connections.find(({id}) => id === get(payload, 'id'))) {
            const newId = Date.now();
            connections = [...connections, {id: newId}];

            setIdMessage(ws, newId);
        }
    }
};

wss.on('connection', (client, req) => {
    // ws.on('message', recieveMessage(ws));

    addPropToClient({
        wss,
        client,
        prop: 'tempId',
        value: Math.random()
    });

    sendConnectionsToRender(mainWindow, wss.clients);

    client.on('close', () => sendConnectionsToRender(mainWindow, wss.clients));
});

ipcMain.on(SERVER, (event, {message}) => {
    if (message === MESSAGES.MODE_ON) {
        server.listen(80, null, null, () => event.sender.send(SERVER, {message: 'server is running'}));
    } else if (message === MESSAGES.MODE_OFF) {
        server.close(() => event.sender.send(SERVER, {message: 'server is stopped'}));
    }
});

ipcMain.on('SEND_TO_CLIENTS', (event, {message}) => wss.clients.forEach(client => client.send(message)));
