var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Raw Content', function() {
        it('Should be untouched in the output HTML.', function () {
            var actual   = parser.parse(
                '-- $(function() {\n' +
                '--     alert(\'Hello World!\');\n' +
                '-- });\n'
            );
            var expected =
                helper.html5(
                    '$(function() {\n' +
                    '    alert(\'Hello World!\');\n' +
                    '});\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
