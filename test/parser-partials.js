var assert = require('assert');
var parser = require('../lib/candor.js');

describe('Parser', function() {
    describe('Partials', function() {
        it('Should not return HTML5 document specification.', function () {
            var actual   = parser.parse(
                '!partial\n' +
                'title = \'Hello!\''
            );
            var expected =
                '<title>Hello!</title>\n'
            ;

            assert.equal(actual, expected);
        });
    });
});
