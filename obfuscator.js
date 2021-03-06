const fs = require('fs');
const path = require('path');
const defaultOptions = {store: require('store'), location: './', param: 'fileName'};
const UglifyJS = require("uglify-js");
const obfuscator = require("javascript-obfuscator");

/**
 * Read a file from given path
 * @param {string} path 
 * @returns The files content in UTF-8 encoding
 */
const readFile = path => {
    if(!fs.existsSync(path)) return null;
    return fs.readFileSync(path, 'utf-8');  
};

/**
 * Obfsucate and minify a string
 * @param {string} content 
 * @returns A new string that's obfuscated and minfied
 */
const obfuscateAndMinifyContent = content => {
    const obfuscatedContents = obfuscator.obfuscate(content).getObfuscatedCode();
    return UglifyJS.minify(obfuscatedContents).code;
};

/**
 * Validates the option object and adds the appropriate fields if they are absent
 * @param {object} options 
 */
const validateOptions = options => {
    for(var property in defaultOptions) {
        if(options.hasOwnProperty(property)) {
            continue;
        }
        options[property] = defaultOptions[property];
    }
};

/**
 * The main init function, our only export
 * @param {object} options 
 * @returns A middleware for Express servers (or whoever else can use it)
 */
const init = options => {
    if(!options) {
        options = defaultOptions;
    }
    validateOptions(options);
    return (req, res, next) => {
        if(!req.params) {
            next();
            return;
        }
        const fileName = req.params[options.param];
        if(!fileName) {
            next();
            return;
        }
        var output = options.store.get(fileName);
        if(!output) {
            const filePath = path.join(options.location, `${fileName}.js`);
            const fileContents = readFile(filePath);
            if(!fileContents) {
                next();
                return;
            }
            options.store.set(fileName, output = obfuscateAndMinifyContent(fileContents));
        } 
        res.send(output);
    };
};


module.exports = init;
