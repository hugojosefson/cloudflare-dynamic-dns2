module.exports = (subdomain, domain) => subdomain === '@' ? domain : `${subdomain}.${domain}`;
