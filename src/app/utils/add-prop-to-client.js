const addPropToClient = ({wss, client, prop, value}) => wss.clients.forEach((ws) => {
    if (client === ws) {
        client[prop] = value; // eslint-disable-line no-param-reassign
    }
});

export default addPropToClient;
