import React, {PureComponent} from 'react';
import getIp from '../utils/get-ip';

class Page extends PureComponent {
    render() {
        return (
            <div>{getIp()}</div>
        );
    }
}

export default Page;
