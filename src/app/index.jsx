// import {ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/page';

const appRender = () => {
    ReactDOM.render(<Page />, document.getElementById('root')); // eslint-disable-line
};

appRender();

// const body = document.querySelector('body');
// const helloWorld = document.createElement('div');
// const startButton = document.querySelector('.server_start');
// const stopButton = document.querySelector('.server_stop');

// helloWorld.innerHTML = 'hello';

// body.appendChild(helloWorld);

// startButton.addEventListener('click', () => {
//     ipcRenderer.send('start_server', 'start_server');
// });

// stopButton.addEventListener('click', () => {
//     ipcRenderer.send('stop_server', 'stop_server');
// });

// ipcRenderer.on('server_is_started', (event, arg) => {
//     console.log('server is running');
// });

// ipcRenderer.on('server_is_stopped', (event, arg) => {
//     console.log('server_is_stopped');
// });

// console.log(ifaces.Ethernet.find(({family}) => family === 'IPv4').address);
