var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Opening and closing', function() {
        it('Should return correct opening and closing tags.', function () {
            var actual   = parser.parse('body');
            var expected =
                helper.html5(
                    '<body>\n' +
                    '</body>\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should return a correct self-closing tag.', function () {
            var actual   = parser.parse('img');
            var expected =
                helper.html5(
                    '<img />\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
