import React, {PureComponent, Fragment} from 'react';
import {ipcRenderer} from 'electron';
import {SERVER, CONNECTION, MESSAGES} from '../constants/channels';
import FileInspector from './file-inspector/file-inspector';
import rootRequest from '../api/root-request';
import getIp from '../utils/get-ip';

class Page extends PureComponent {
    constructor() {
        super();
        this.state = {
            serverIsRunning: false,
            connections: []
        };
        this.sendBroadcast = this.sendBroadcast.bind(this);
        this.startServer = this.startServer.bind(this);
        this.stopServer = this.stopServer.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on(CONNECTION, (event, connections) => this.setState({connections}));
    }

    startServer() {
        rootRequest(SERVER, {message: MESSAGES.MODE_ON})
            .then(() => this.setState({serverIsRunning: true}));
    }

    sendBroadcast() {
        rootRequest('SEND_TO_CLIENTS', {message: 'всем хуй!'});
    }

    stopServer() {
        rootRequest(SERVER, {message: MESSAGES.MODE_OFF})
            .then(() => this.setState({serverIsRunning: false}));
    }

    render() {
        const {serverIsRunning, connections} = this.state;

        return (
            <Fragment>
                <div>{getIp()}</div>
                <div>{serverIsRunning ? 'RUN' : 'STOPPED'}</div>
                <button onClick={this.startServer}>start server</button>
                <button onClick={this.stopServer}>stop server</button>
                <button onClick={this.sendBroadcast}>Отправить всем</button>
                {connections.map(({tempId}) => <div>{`client ${tempId}`}</div>)}
                <FileInspector onSelect={res => console.log(res)} />
            </Fragment>
        );
    }
}

export default Page;

