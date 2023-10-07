const { exec } = require("child_process");
const config = require('../src/config')
const host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

process.exit(0);