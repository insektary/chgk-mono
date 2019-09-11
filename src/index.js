import {app, BrowserWindow} from 'electron';
import http from 'http';
import fs from 'fs';
import path from 'path';
// import getHtml from '../src/client/build/getHtml'; //PRODUCTION MODE

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

const contentTypeDetector = (extname) => {
    switch (extname) {
    case '.js':
        return 'text/javascript';
    case '.map':
        return 'text/javascript';
    case '.ico':
        return 'image/x-icon';
    case '.css':
        return 'text/css';
    case '.json':
        return 'application/json';
    case '.png':
        return 'image/png';
    case '.jpg':
        return 'image/jpg';
    case '.wav':
        return 'audio/wav';
    case '.svg':
        return 'image/svg+xml';
    default:
        return 'text/html; charset=utf-8';
    }
};

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

server.listen(80);
