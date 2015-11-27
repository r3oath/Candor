var assert = require('assert');
var parser = require('../lib/candor.js');
var helper = require('./test-helpers.js');

describe('Parser', function() {
    describe('All together now', function() {
        it('Should output the correct, expected HTML.', function () {
            var actual = parser.parse(
                'head\n' +
                '    title = \'Hello World\'\n' +
                '    link rel\'stylesheet\' type\'text/css\' href\'foo.bar/app.css\'\n' +
                'body\n' +
                '    div #\'app\' .\'container\'\n' +
                '        div .\'row\'\n' +
                '            div .\'col-xs-12\'\n' +
                '                p @click.stop\'toggleTitle()\' = \'Welcome!\'\n'
            );
            var expected =
                helper.html5(
                    '<head>\n' +
                    '    <title>Hello World</title>\n' +
                    '    <link rel="stylesheet" type="text/css" href="foo.bar/app.css" />\n' +
                    '</head>\n' +
                    '<body>\n' +
                    '    <div id="app" class="container">\n' +
                    '        <div class="row">\n' +
                    '            <div class="col-xs-12">\n' +
                    '                <p @click.stop="toggleTitle()">Welcome!</p>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</body>\n'
                )
            ;

            assert.equal(actual, expected);
        });
    });
});
