/**
 * cloudflare-dynamic-dns2
 * Copyright © 2014 Michael Kourlas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const cloudflareddns = require('../lib');

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

// Manually specify IP address
cloudflareddns({
    email: 'jsmith@example.com',
    key: 'abcde12235',
    domain: 'example.com',
    subdomain: 'boo',
    ip: '203.0.113.0'
}).then(
    ip => console.log(`Updated boo.example.com to ${ip}`),
    reason => console.error(reason)
);
