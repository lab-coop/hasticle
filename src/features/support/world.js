'use strict';

import React from 'react';
import register from 'ignore-styles'
register(['.scss'])
const jsdom = require('jsdom').jsdom;
const tools = require('./tools');

module.exports = function() {
  this.World = World;
};

function World() {
  this.context = {};
  this.tools = tools;
  this.container = require('../../client/container');
  setupDOM();
}

function setupDOM() {
  const exposedProperties = ['window', 'navigator', 'document'];

  global.document = jsdom('');
  global.window = document.defaultView;
  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      exposedProperties.push(property);
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js'
  };
}
