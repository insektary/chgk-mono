const parseMessage = (message) => {
    let parsedMessage;

    try {
        parsedMessage = JSON.parse(message);
    } catch (e) {
        parsedMessage = {type: null};
    }

    return parsedMessage;
};

export default parseMessage;
