var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Mutators', function() {
        it('Should be added to end of tag.', function () {
            var actual   = parser.parse('input +disabled');
            var expected =
                helper.html5(
                    '<input disabled />\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should be added to end of tag, and support multiple mutators.', function () {
            var actual   = parser.parse('input +disabled +required');
            var expected =
                helper.html5(
                    '<input disabled required />\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
