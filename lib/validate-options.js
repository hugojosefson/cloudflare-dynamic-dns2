const request = require('request-promise');
const _ = require('lodash');

const validateStringOption = (options, key) => new Promise(function (resolve, reject) {
    if (typeof options[key] !== 'string') {
        reject(new Error(key + ' must be a string'));
    } else if (options[key] === '') {
        reject(new Error(key + ' cannot be empty'));
    } else {
        resolve([key, options[key].trim()]);
    }
});

const getCurrentIp = () => request('http://ipecho.net/plain');

const validateOrLookupIp = ip => new Promise(function (resolve, reject) {
    if (typeof ip === 'undefined') {
        getCurrentIp().then(
            currentIp => resolve(currentIp),
            reason => reject(new Error(`Error when looking up this machine's IP address: ${reason}`))
        );
    } else {
        if (typeof ip !== 'string') {
            reject(new Error('ip must be a string or undefined'));
        } else if (ip === '') {
            reject(new Error('if ip is a string, it cannot be empty'));
        } else {
            resolve(ip.trim());
        }
    }
});

const validateOptions = options => Promise.all(Object.keys(options).map(key => key === 'ip' ? undefined : validateStringOption(options, key)))
    .then(pairs => _.compact(pairs))
    .then(pairs => _.fromPairs(pairs))
    .then(validOptionsExceptIp => validateOrLookupIp(options.ip).then(ip => {
        const validOptions = _.assign({}, validOptionsExceptIp, {ip});
        return validOptions;
    }));

module.exports = validateOptions;
