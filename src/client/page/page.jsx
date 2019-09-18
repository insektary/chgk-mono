import React, {PureComponent, Fragment} from 'react';
import RegistrationForm from './registration-form/registration-form';

class Page extends PureComponent {
    constructor() {
        super();
        this.signIn = this.signIn.bind(this);
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

    signIn(formValues) {
        this.sendData({type: 'REGISTRATION', payload: {formValues}});
    }

    render() {
        const {connectionIsActive} = this.state;

        return (
            <Fragment>
                <div>{connectionIsActive ? 'Подключено' : 'Отключено'}</div>
                <button onClick={this.sendData}>Отправить сообщение</button>
                <RegistrationForm signIn={this.signIn} />
            </Fragment>
        );
    }
}

export default Page;
