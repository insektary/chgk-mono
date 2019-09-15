import {CONNECTION} from '../constants/channels';

export const sendConnectionsToRender = (mainWindow, connections) =>
    mainWindow.webContents.send(CONNECTION, [...connections].map(({tempId}) => ({tempId})));
