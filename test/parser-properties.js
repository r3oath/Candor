var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('Properties', function() {
        it('Should return properties as expected.', function () {
            var actual   = parser.parse('img src\'foo.bar/img.png\'');
            var expected =
                helper.html5(
                    '<img src="foo.bar/img.png" />\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should return multiple properties as expected.', function () {
            var actual   = parser.parse('input type\'text\' name\'username\'');
            var expected =
                helper.html5(
                    '<input type="text" name="username" />\n'
                )
            ;

            assert.equal(actual, expected);
        });

        it('Should support all 3rd party ASCII properties (like Vue.js bindings).', function () {
            var actual   = parser.parse('a href\'foo.bar\' @click.stop\'handleLink()\' = \'Click me.\'');
            var expected =
                helper.html5(
                    '<a href="foo.bar" @click.stop="handleLink()">Click me.</a>\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
