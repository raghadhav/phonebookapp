const fs = require('fs');
const stream = fs.createWriteStream("info.log", { flags: 'a' });
const info = (...params) => {
    const date = new Date().toISOString();
    const outputString = '[' + date + '] ' + params.join(' ') + '\n';
    stream.write(outputString)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}