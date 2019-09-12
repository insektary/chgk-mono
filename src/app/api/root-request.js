import {ipcRenderer} from 'electron';

const rootRequest = (channel, payload) => new Promise((res) => {
    ipcRenderer.once(channel, (event, response) => {
        res(response);
    });

    ipcRenderer.send(channel, payload);
});

export default rootRequest;
