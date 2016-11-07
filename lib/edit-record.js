const CFClient = require('cloudflare');
const immutable = require('object-path-immutable');

module.exports = (options, record) => {
    const client = new CFClient({
        email: options.email,
        key: options.key
    });

    const updatedRecord = immutable.set(record, 'content', options.ip);
    return client.editDNS(updatedRecord)
        .then(() => options.ip);
};
