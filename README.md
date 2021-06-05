# Obfuscator Middleware
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