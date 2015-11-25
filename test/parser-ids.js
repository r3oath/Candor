var assert = require('assert');
var parser = require('../lib/candor.js');

describe('Parser', function() {
    describe('ID\'s', function() {
        it('Should add an id to a given tag.', function () {
            var actual   = parser.parse('div #app');
            var expected = '<div id="app">\n</div>\n';

            assert.equal(actual, expected);
        });
    });
});
