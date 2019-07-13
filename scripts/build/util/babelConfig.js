const frontBabelConfig = require('../../../src/front/babel.config');
const apiBabelConfig = require('../../../src/api/babel.config');

// Transform config to reflect the fact we're invoking babel from inside the `scripts` directory and not where the config is
frontBabelConfig.extends = '../src/front/' + frontBabelConfig.extends;
apiBabelConfig.extends   = '../src/api/' + apiBabelConfig.extends;

module.exports = {
    front: frontBabelConfig,
    api: apiBabelConfig,
};
