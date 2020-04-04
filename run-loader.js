const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');

runLoaders({
    resource: path.join(__dirname, './src/example.json'),
    loaders: [{
        loader: path.join(__dirname, './src/modify-json-loader.js'),
        options: {
            name: 'dist.json',
            key: 'name',
            value: 'thluo'
        }
    }],
    context: {
        emitFile: () => {}
    },
    readResource: fs.readFile.bind(fs)
},(err, result) => {
    err ? console.log(err) : console.log(result)
})