import React, {PureComponent, Fragment} from 'react';
import {ipcRenderer} from 'electron';
import {SERVER, CONNECTION, MESSAGES} from '../constants/channels';
import rootRequest from '../api/root-request';
import getIp from '../utils/get-ip';

class Page extends PureComponent {
    constructor() {
        super();
        this.state = {
            serverIsRunning: false,
            connections: []
        };
        this.startServer = this.startServer.bind(this);
        this.stopServer = this.stopServer.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on(CONNECTION, (event, connections) => {
            // this.setState({connections});
            console.log(connections)
        });
    }

    startServer() {
        rootRequest(SERVER, {message: MESSAGES.MODE_ON})
            .then(() => {
                this.setState({serverIsRunning: true});
            });
    }

    stopServer() {
        rootRequest(SERVER, {message: MESSAGES.MODE_OFF})
            .then(() => {
                this.setState({serverIsRunning: false});
            });
    }

    render() {
        const {serverIsRunning, connections} = this.state;

        return (
            <Fragment>
                <div>{getIp()}</div>
                <div>{serverIsRunning ? 'RUN' : 'STOPPED'}</div>
                <button onClick={this.startServer}>start server</button>
                <button onClick={this.stopServer}>stop server</button>
                {connections.filter(({readyState}) => readyState === 1).map((connection) => <div>client</div>)}
            </Fragment>
        );
    }
}

export default Page;

