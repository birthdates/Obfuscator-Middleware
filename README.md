# Obfuscator Middleware [![NPM Version](https://img.shields.io/npm/v/obfuscator-middleware.svg)](https://www.npmjs.com/package/obfuscator-middleware) ![node](https://img.shields.io/node/v/obfuscator-middleware.svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The way this middleware works is it's an express middleware for serving minified obfuscated Javascript files.
You can serve it at a certain path and method.

# Methods
The object obtained from requiring is the init function which will return the middleware.

* `obf(options)` (this will return a middleware of `req, res, next`)
* `options: {store, location, param}`

The default options are `options: {require('store'), './', 'fileName'}`

The param option refers to what parameter we are looking for i.e `:fileName` is the correct way to work with the default options.

# Example
```js
const obf = require("./obfuscator");
app.get('/scripts/:fileName.js', obf({location: './assets/scripts/'}));
```
In this example, anything requesting `GET` from `/scripts/*.js` will be found from `./assets/scripts/` and served obfuscated.

## Before
```js
console.log("Hello World");
```

## After
```js
var _0x3bd1=["1FhAdKg","736427PHdfOG","317622WXJmvL","8606ZVtrej","395851sodQMq","71312Afnxvx","427562qIquUR","2hxrSZa","84moaWHU","672326wHdSex","Hello World","log"],_0x2c3f2a=_0x3293;function _0x3293(r,a){return _0x3bd1[r-=319]}(function(a){for(var r=_0x3293;;)try{if(601688===parseInt(r(326))+-parseInt(r(322))+parseInt(r(330))+-parseInt(r(324))*parseInt(r(319))+parseInt(r(325))*parseInt(r(320))+-parseInt(r(323))*parseInt(r(329))+-parseInt(r(321)))break;a.push(a.shift())}catch(r){a.push(a.shift())}})(_0x3bd1),console[_0x2c3f2a(328)](_0x2c3f2a(327));
```
