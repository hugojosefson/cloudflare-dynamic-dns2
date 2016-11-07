#!/usr/bin/env node
const config = require('/etc/cloudflare/config.json');
const immutable = require('object-path-immutable');
const cf = require('../lib');

Promise.all(
    config.subdomains.map(subdomain => {
        const subdomainConfig = immutable(config)
            .del('subdomains')
            .set('subdomain', subdomain)
            .value();
        return cf(subdomainConfig);
    })
)
    .catch(err => {
        console.error(err);
        process.exit(1); // eslint-disable-line no-process-exit
    });
