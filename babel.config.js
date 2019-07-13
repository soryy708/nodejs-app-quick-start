'use strict';
/* eslint-disable import/no-commonjs */
// eslint-disable-next-line no-undef
module.exports = {
    presets: [
        ['@babel/preset-env', {
            modules: 'commonjs'
        }]
    ],
    plugins: [
        '@babel/transform-runtime'
    ],
    ignore: [
        'src/api/node_modules'
    ]
};
