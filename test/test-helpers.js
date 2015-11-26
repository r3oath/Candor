var Helpers = module.exports = {
    html5: function(content) {
        return (
            '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
                content +
            '</html>'
        );
    },
};