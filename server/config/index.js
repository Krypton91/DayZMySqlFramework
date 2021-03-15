'use strict';
const {readFileSync,writeFileSync} = require('fs');
let config = {};

try{
    config = JSON.parse(readFileSync('server-config.json'));
  } catch (err){
    console.log(err);
  }

module.exports = config;