import {ipcRenderer} from 'electron';

const body = document.querySelector('body');
const helloWorld = document.createElement('div');
const startButton = document.querySelector('.server_start');
const stopButton = document.querySelector('.server_stop');

helloWorld.innerHTML = 'hello';

body.appendChild(helloWorld);

startButton.addEventListener('click', () => {
    ipcRenderer.send('start_server', 'start_server');
});

stopButton.addEventListener('click', () => {
    ipcRenderer.send('stop_server', 'stop_server');
});

ipcRenderer.on('server_is_started', (event, arg) => {
    console.log('server is running');
});

ipcRenderer.on('server_is_stopped', (event, arg) => {
    console.log('server_is_stopped');
});
