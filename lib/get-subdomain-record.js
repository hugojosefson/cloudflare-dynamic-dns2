const getSubdomainRecords = require('./get-subdomain-records');
const findSubdomainRecord = require('./find-subdomain-record');

module.exports = options =>
    getSubdomainRecords(options)
        .then(records => findSubdomainRecord(options, records));
