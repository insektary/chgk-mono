import fs from 'fs';
import getStat from './get-stat';

const readFolder = fullPath => new Promise((res, rej) => {
    fs.readdir(fullPath, (err, data) => {
        if (err) {
            rej();
        } else {
            Promise.all(data.map(path => new Promise((resolve) => {
                getStat(`${fullPath}\\${path}`)
                    .then(stat => resolve({
                        name: path,
                        isDirectory: stat.isDirectory()
                    }))
                    .catch(() => resolve({
                        name: path
                    }));
            })))
            .then(res);
        }
    });
});

export default readFolder;
