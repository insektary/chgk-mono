import fs from 'fs';

const getStat = fullPath => new Promise((res, rej) => {
    fs.stat(fullPath, (err, data) => {
        if (err) {
            rej(err);
        } else {
            res(data);
        }
    });
});

export default getStat;
