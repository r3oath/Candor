var assert = require('assert');
var parser = require('../lib/candor.js');

describe('Parser', function() {
    describe('Raw Content', function() {
        it('Should be untouched in the output HTML.', function () {
            var actual   = parser.parse(
                '-- $(function() {\n' +
                '--     alert(\'Hello World!\');\n' +
                '-- });\n'
            );
            var expected =
                '$(function() {\n' +
                '    alert(\'Hello World!\');\n' +
                '});\n'
            ;

            assert.equal(actual, expected);
        });
    });
});
