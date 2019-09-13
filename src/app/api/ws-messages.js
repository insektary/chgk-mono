export const setIdMessage = (ws, id) => ws.send(JSON.stringify({type: 'SET_ID', payload: {id}}));

export const setTimer = (ws, time) => ws.send(JSON.stringify({type: 'SET_TIMER', payload: {time}}));

export const setGlobalStatus = (ws, payload) => ws.send(JSON.stringify({type: 'SET_GLOBAL_STATUS', payload}));
