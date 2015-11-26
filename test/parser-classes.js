var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Classes', function() {
        it('Should add a class to a given tag.', function () {
            var actual   = parser.parse('div `app`');
            var expected =
                helper.html5(
                    '<div class="app">\n' +
                    '</div>\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should add multiple classes to a given tag.', function () {
            var actual   = parser.parse('div `app app__dark`');
            var expected =
                helper.html5(
                    '<div class="app app__dark">\n' +
                    '</div>\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
