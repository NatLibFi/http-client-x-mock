# HTTP client X Mock  [![NPM Version](https://img.shields.io/npm/v/http-client-x-mock.svg)](https://npmjs.org/package/http-client-x-mock) [![Build Status](https://travis-ci.org/NatLibFi/http-client-x-mock.svg)](https://travis-ci.org/NatLibFi/http-client-x-mock) [![Test Coverage](https://codeclimate.com/github/NatLibFi/http-client-x-mock/badges/coverage.svg)](https://codeclimate.com/github/NatLibFi/http-client-x-mock/coverage)

A mock for [HTTP client X](https://github.com/natlibfi/http-client-x). You can use the module to mock HTTP calls made by HTTP client X, [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) or Node.js's [http](https://nodejs.org/dist/latest-v4.x/docs/api/http.html)/[https](https://nodejs.org/dist/latest-v4.x/docs/api/https.html) modules.

## Usage

The module exports an object which has the following properties:

- **create**: This function creates a mock for a HTTP call. It either takes an object for an argument or multiple arguments: **url** (*string*), **method** (*string*), **status** (*number*), **headers** (*object*), **body** (*string*).
- **restore**: Restores original behaviour by removing all mocks set up with **create**.

Default options for **create** (*url* is mandatory): 
```js
{
  status: 200,
  method: 'GET',
  headers: {},
  body: ''
}
```


### Node.js

```js
var http_mock = require('http-client-x-mock/lib/nodejs/main');

http_mock.create({
  url: 'http://foo.bar',
  method: 'GET',
  status: 200,
  headers: {
    'X-Foo': 'bar'
  },
  'foobar'	
});

http_mock.restore();

```

### AMD
```js
define(['http-client-x-mock/lib/browser/main'], function(http_mock) {

  http_mock.create({
    url: 'http://foo.bar',
    method: 'GET',
    status: 200,
    headers: {
      'X-Foo': 'bar'
    },
    'foobar'	
  });

  http_mock.restore();

});
```

## Development 

Clone the sources and install the package using `npm`:

```sh
npm install
```

Run the following NPM script to lint, test and check coverage of the code:

```javascript

npm run check

```

## License and copyright

Copyright (c) 2016 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **GNU General Public License Version 3** or any later version.
