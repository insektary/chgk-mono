import React, {PureComponent, Fragment} from 'react';

class Page extends PureComponent {
    constructor() {
        super();
        this.sendData = this.sendData.bind(this);
        this.state = {
            connectionIsActive: false,
            id: null
        };
    }

    componentDidMount() {
        const {id} = this.state;

        this.socket = new WebSocket(`ws://${document.location.host}:8080`); // eslint-disable-line

        this.socket.onopen = () => {
            this.setState({connectionIsActive: true});

            this.sendData({type: 'REGISTRATION', payload: {id}});
        };

        this.socket.onclose = () => {
            this.setState({connectionIsActive: false});
        };

        this.socket.onmessage = ({data}) => {
            console.log(data);
        };

        // this.socket.onerror = () => {
        //     this.setState({connectionIsActive: false});
        // };
    }

    sendData(data) {
        this.socket.send(JSON.stringify(data));
    }

    render() {
        const {connectionIsActive} = this.state;

        return (
            <Fragment>
                <div>{connectionIsActive ? 'Подключено' : 'Отключено'}</div>
                <button onClick={this.sendData}>Отправить сообщение</button>
            </Fragment>
        );
    }
}

export default Page;
