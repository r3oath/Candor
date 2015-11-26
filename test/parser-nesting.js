var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Nesting', function() {
        it('Should return correctly nested tags.', function () {
            var actual = parser.parse(
                'div\n' +
                '    img'
            );
            var expected =
                helper.html5(
                    '<div>\n' +
                    '    <img />\n' +
                    '</div>\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should return multiple correctly nested tags.', function () {
            var actual = parser.parse(
                'section\n' +
                '    div\n' +
                '        img'
            );
            var expected =
                helper.html5(
                    '<section>\n' +
                    '    <div>\n' +
                    '        <img />\n' +
                    '    </div>\n' +
                    '</section>\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should return multiple correctly nested tags, even at the same ident level.', function () {
            var actual = parser.parse(
                'section\n' +
                '    div\n' +
                '    span'
            );
            var expected =
                helper.html5(
                    '<section>\n' +
                    '    <div>\n' +
                    '    </div>\n' +
                    '    <span>\n' +
                    '    </span>\n' +
                    '</section>\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
