/**
 * @file Add "rules" made of arbitrary selectors to choose source lines
 *   to be reported
 * @author Brett Zamir
 */
'use strict';

// Requirements

const {join} = require('path');
const requireIndex = require('requireindex');

// Plugin Definition

// import all rules in lib/rules
module.exports.rules = requireIndex(join(__dirname, '/rules'));
