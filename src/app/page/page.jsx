import React, {PureComponent, Fragment} from 'react';
import {ipcRenderer} from 'electron';
import rootRequest from '../api/root-request';
import getIp from '../utils/get-ip';

class Page extends PureComponent {
    constructor() {
        super();
        this.state = {serverIsRunning: false};
        this.startServer = this.startServer.bind(this);
        this.stopServer = this.stopServer.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('CONNECTION', () => {
            console.log('new connection');
        });
    }

    startServer() {
        rootRequest('SERVER', {type: 'MODE_ON'})
            .then(() => {
                this.setState({serverIsRunning: true});
            });
    }

    stopServer() {
        rootRequest('SERVER', {type: 'MODE_OFF'})
            .then(() => {
                this.setState({serverIsRunning: false});
            });
    }

    render() {
        const {serverIsRunning} = this.state;

        return (
            <Fragment>
                <div>{getIp()}</div>
                <div>{serverIsRunning ? 'RUN' : 'STOPPED'}</div>
                <button onClick={this.startServer}>start server</button>
                <button onClick={this.stopServer}>stop server</button>
            </Fragment>
        );
    }
}

export default Page;

