const fs = require('fs');
const info = (...params) => {
    const date = new Date().toISOString();
    const outputString = '[' + date + '] ' + params.join(' ') + '\n';
    console.log(outputString)
    fs.appendFile('info.log', outputString, function (err) {
        if (err) throw err;

    });
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}