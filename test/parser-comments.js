var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Comments', function() {
        it('Should not be present in the output HTML.', function () {
            var actual   = parser.parse(
                '? The app title\n' +
                'title = \'Hello!\''
            );
            var expected =
                helper.html5(
                    '<title>Hello!</title>\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
