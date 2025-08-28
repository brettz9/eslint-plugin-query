/**
 * @file Add "rules" made of arbitrary selectors to choose source lines
 *   to be reported.
 * @author Brett Zamir
 */

// Requirements

import requireIndex from 'requireindex';

// Plugin Definition

// import all rules in lib/rules
export const rules = requireIndex(import.meta.dirname + '/rules');
