var assert = require('assert');
var parser = require('../lib/candor.js');

describe('Parser', function() {
    describe('Inline content', function() {
        it('Should be correctly nested inside of tag.', function () {
            var actual   = parser.parse('title = \'Hello World!\'');
            var expected = '<title>Hello World!</title>\n';

            assert.equal(actual, expected);
        });
    });
});
