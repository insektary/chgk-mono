import React, {PureComponent} from 'react';

class Page extends PureComponent {
    constructor() {
        super();
        this.sendData = this.sendData.bind(this);
    }
    componentDidMount() {
        this.socket = new WebSocket(`ws://${document.location.host}:8080`); // eslint-disable-line

        this.socket.onopen = () => {
            console.log('Соединение установлено');
        };
    }

    sendData() {
        console.log('Отправляю...');
        this.socket.send({id: null});
    }

    render() {
        return <button onClick={this.sendData}>Послать нахуй</button>;
    }
}

export default Page;
