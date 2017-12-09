# cloudflare-dynamic-dns2 #

[![Greenkeeper badge](https://badges.greenkeeper.io/hugojosefson/cloudflare-dynamic-dns2.svg)](https://greenkeeper.io/)

## Overview ##

`cloudflare-dynamic-dns2` is a Node.js module that updates a Cloudflare DNS address record with an
IP address. See [CHANGES.md](CHANGES.md) for difference from original, and reason for this fork.

## Command-line program ##

### Installation of command-line program ###

```bash
npm install -g cloudflare-dynamic-dns2
```

### Usage via cli ###

Create a `/etc/cloudflare/config.json` for example like this:

```json
{
  "email": "hugo@josefson.org",
  "key": "17b8137B813b585c",
  "domain": "hugojosefson.com",
  "subdomains": [
    "www",
    "@"
  ]
}
```

The properties are described for the API below.

Run the built-in command-line tool:

```bash
update-cloudflare-dns
```

If the program exits with exit code `0` and prints nothing, all went well. Otherwise it will print
whatever error occurred and exit with a non-zero exit code.

## API ##

### Installation for API use ##

```bash
npm install --save cloudflare-dynamic-dns2
```

### Usage via API

The `cloudflare-dynamic-dns2` module is a function which takes one argument, an options object, with
the following properties:

* `email` - the email associated with your Cloudflare account (string, mandatory)
* `key` - the API key associated with your Cloudflare account (string, mandatory)
* `domain` - the domain corresponding to the DNS address record you wish to change (string, mandatory)
* `subdomain` - the subdomain corresponding to the DNS address record you wish to change; `"@"` to
update the apex record (string, mandatory)
* `ip` - the new IP address for the address record; if no IP address is specified, the external IP
address of the current machine is used (string, optional)

The function returns a `Promise` which resolves to the actual IP address if the request was
successful, or rejects with an `Error` if it was not.

### Example ##

The following example illustrates the basic usage of `cloudflare-dynamic-dns2`, updating the A
record for `boo.example.com`:

```js
const cloudflareddns = require('cloudflare-dynamic-dns2');

// Use external IP address of current machine
cloudflareddns({
    email: 'jsmith@example.com',
    key: 'abcde12235',
    domain: 'example.com',
    subdomain: 'boo'
}).then(
    ip => console.log(`Updated boo.example.com to ${ip}`),
    reason => console.error(reason)
);
```

## License ##

`cloudflare-dynamic-dns2` is licensed under the [MIT license](http://opensource.org/licenses/MIT). Please see the
`LICENSE.md` file for more information.
