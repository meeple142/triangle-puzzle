const pretty = require('json-stringify-pretty-compact');
const fs = require('fs');

module.exports = function report(fileName, time, obj) {
    fs.writeFileSync(`${fileName}_${time}.json`, pretty(obj), 'utf8');;
}