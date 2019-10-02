const fs = require('fs');
const { println } = require('./general.utils');

const saveFile = (filedata, filename) => new Promise((resolve, reject) => {
    fs.writeFile(`../wad/${filename}.json`, filedata, (error) => {
        if (error) {
            reject(error)
        } else {
            println(`File saved: ${filename}.json`);
            resolve();
        }
    });
});

module.exports = {
    saveFile,
};