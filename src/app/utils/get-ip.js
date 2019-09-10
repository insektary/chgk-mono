import os from 'os';
import {get} from 'lodash';

const getIp = () => {
    const ifaces = os.networkInterfaces();

    return get(get(ifaces, 'Ethernet', []).find(({family}) => family === 'IPv4'), 'address');
};

export default getIp;
