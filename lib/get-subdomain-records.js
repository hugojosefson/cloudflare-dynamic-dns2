const request = require('request-promise');

function getSubdomainRecords(options, offset = 0, recordsSoFar = []) {
    const requestOptions = {
        uri: 'http://www.cloudflare.com/api_json.html',
        qs: {
            'tkn': options.apiToken,
            'email': options.email,
            'a': 'rec_load_all',
            'z': options.domain,
            'o': offset
        },
        json: true,
        method: 'GET'
    };

    return request(requestOptions)
        .then(json => {
            if (json.result !== 'success') {
                return Promise.reject(new Error('Response does not contain result "success".\n\nRequest was:\n' + JSON.stringify(requestOptions, null, 2) + '\n\nResponse is: \n' + JSON.stringify(json, null, 2)));
            }

            const hasMore = json.response.recs.has_more;
            const records = json.response.recs.objs;

            if (hasMore) {
                return getSubdomainRecords(options, offset + 1, recordsSoFar.concat(records));
            } else {
                return recordsSoFar.concat(records);
            }
        })
        .catch(reason => Promise.reject(new Error('Could not retrieve domain records: ' + reason)));
}

module.exports = getSubdomainRecords;
