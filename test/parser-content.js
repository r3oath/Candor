var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Content', function() {
        it('Should be correctly nested in output HTML.', function () {
            var actual   = parser.parse(
                'div\n' +
                '    \'Nulla vitae elit libero, a pharetra augue.\''
            );
            var expected =
                helper.html5(
                    '<div>\n' +
                    '    Nulla vitae elit libero, a pharetra augue.\n' +
                    '</div>\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
