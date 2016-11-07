const CFClient = require('cloudflare');
const combinedName = require('./combined-name');

module.exports = options => {
    const client = new CFClient({
        email: options.email,
        key: options.key
    });

    return client.browseZones([{name: options.domain}])
        .then(({result: zones}) => zones[0])
        .then(zone => client.browseDNS(zone, {
                type: 'A',
                name: combinedName(options.subdomain, options.domain)
            })
                .then(({result: dnsRecords}) => dnsRecords[0])
        );
};
