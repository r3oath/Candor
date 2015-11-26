var assert = require('assert');
var parser = require('../lib/candor.js');

describe('Parser', function() {
    describe('Comments', function() {
        it('Should not be present in the output HTML.', function () {
            var actual   = parser.parse(
                '? The app title\n' +
                'title = \'Hello!\''
            );
            var expected = '<title>Hello!</title>\n';

            assert.equal(actual, expected);
        });
    });
});
