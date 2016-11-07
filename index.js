'use strict';

require('babel-register')({
  presets: ['react-native'],
  ignore: path => {
    return path.indexOf('babel') !== -1;
  }
});

require('./app');
