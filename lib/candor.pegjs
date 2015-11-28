/*
    Copyright (c) 2015 Tristan Strathearn r3oath@protonmail.ch

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

{
    function Manager() {
        this.openTags  = [];
        this.ident     = '    ';
        this.identSize = 4; // How many spaces count as an ident.
        this.isPartial = false;

        this.voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    }

    Manager.prototype.identLevel = function(ident) {
        var cur = ident.length;

        return Math.floor(cur / this.identSize);
    }

    Manager.prototype.setIsPartial = function(ident) {
        this.isPartial = true;
    }

    Manager.prototype.partial = function(ident) {
        return this.isPartial === true;
    }

    Manager.prototype.genIdent = function(level) {
        var space = '';
        for(var i = 0; i < level; i++) {
            space += this.ident;
        }

        return space;
    }

    Manager.prototype.tryPushNewOpenTag = function(ident, name) {
        if(this.isVoidTag(name)) {
            return;
        }

        this.openTags.push({
            name: name,
            ident: this.identLevel(ident),
        });
    }

    Manager.prototype.isVoidTag = function(name) {
        return this.voidTags.indexOf(name) !== -1;
    };

    Manager.prototype.buildTag = function(ident, name, id, classes, props, mutators, inlined) {
        var tag   = '';
        var ident = this.genIdent(this.identLevel(ident));

        tag += ident + '<' + name;
        if(id !== null) {
            tag += this.buildTagId(id);
        }

        if(classes !== null) {
            tag += this.buildTagClasses(classes);
        }

        if(props.length > 0) {
            tag += this.buildTagProps(props);
        }

        if(mutators.length > 0) {
            tag += this.buildTagMutators(mutators);
        }

        if(this.isVoidTag(name)) {
            return tag + ' />';
        } else {
            tag += '>';
        }

        if(inlined !== null) {
            tag += inlined;
            tag += this.buildClosingTag({
                name: name,
                ident: this.identLevel(ident),
            }, true);
        }

        return tag;
    }

    Manager.prototype.buildTagId = function(val) {
        return ' id="' + val + '"';
    }

    Manager.prototype.buildTagClasses = function(val) {
        return ' class="' + val + '"';
    }

    Manager.prototype.buildTagProps = function(val) {
        var props = '';
        for(var i = 0; i < val.length; i++) {
            var name  = val[i][0];
            var value = val[i][1];

            props += ' ' + name + '="' + value + '"';
        }

        return props;
    }

    Manager.prototype.buildTagMutators = function(val) {
        var muts = '';
        for(var i = 0; i < val.length; i++) {
            var value = val[i];

            muts += ' ' + value;
        }

        return muts;
    }

    Manager.prototype.buildContent = function(ident, val) {
        return this.genIdent(this.identLevel(ident)) + val;
    }

    Manager.prototype.buildRawContent = function(ident, val) {
        return this.genIdent(this.identLevel(ident)) + val;
    }

    Manager.prototype.closeOpenTags = function(ident) {
        var content = '';
        var tag;

        var identLevel = ident !== null ? this.identLevel(ident) : 0;
        var numClosed = 0;

        for(var i = this.openTags.length - 1; i >= 0; i--) {
            tag = this.openTags[i];

            if(ident == null || identLevel <= tag.ident) {
                content += this.buildClosingTag(tag);
                numClosed++;
            } else {
                break;
            }
        }

        this.openTags.splice(-numClosed, numClosed);
        return content;
    }

    Manager.prototype.buildClosingTag = function(tag, noIdent) {
        if(typeof(noIdent) !== 'undefined') {
            return '</' + tag.name + '>';
        }

        return this.genIdent(tag.ident) + '</' + tag.name + '>\n';
    }

    Manager.prototype.fixEscapedChars = function(val) {
        return val
            .replace(/\\'/g, '\'')
            .replace(/\\\\/g, '\\');
    }

    var m = new Manager();
}

START
    = (DEF_PARTIAL)? lines:(LINE+)?
    {
        if(lines == null) {
            return '';
        }

        lines.push(m.closeOpenTags(null));
        lines = lines.filter(function(e) { return e !== null; }).join('\n');

        if(m.partial()) {
            return lines;
        } else {
            return (
                '<!DOCTYPE html>\n' +
                '<html lang="en">\n' +
                    lines +
                '</html>\n'
            );
        }
    }

DEF_PARTIAL
    = CHAR_EM 'partial' NL
    {
        m.setIsPartial();
    }

LINE
    = line:(TAG / COMMENT / CONTENT / RAW_LINE) NL*
    {
        return line;
    }
    / NL
    {
        return null;
    }

// Candor language constructs.

TAG
    = ident:$ (WS*)
      name:   (TAG_NAME)
      id:     (TAG_ID?)
      cb:     (TAG_CLASS_BLOCK?)
      prop:   (TAG_PROP*)
      mut:    (TAG_MUTATOR*)
      il:     (TAG_INLINED_CONTENT?)
              (_*)
    {
        var tag     = m.buildTag(ident, name, id, cb, prop, mut, il);
        var content = m.closeOpenTags(ident) + tag;

        if(il === null) {
            m.tryPushNewOpenTag(ident, name);
        }

        return content;
    }

COMMENT
    = WS* CHAR_QM _? UNICODE*
    {
        // Simply eats the comment.
        return null;
    }

CONTENT
    = ident:$ (WS*) CHAR_SQ string:$(STRING) CHAR_SQ
    {
        return m.closeOpenTags(ident) + m.buildContent(ident, m.fixEscapedChars(string));
    }

RAW_LINE
    = ident:$ (WS*) CHAR_DASH CHAR_DASH _? val:$(UNICODE*)
    {
        return m.closeOpenTags(ident) + m.buildRawContent(ident, val);
    }

// Tag attributes.

TAG_NAME =
    val:$(ID)
    {
        return val;
    }

TAG_ID =
    _ CHAR_POUND CHAR_SQ string:$(STRING) CHAR_SQ
    {
        return m.fixEscapedChars(string);
    }

TAG_CLASS_BLOCK =
    _ CHAR_DOT CHAR_SQ string:$(STRING) CHAR_SQ
    {
        return m.fixEscapedChars(string);
    }

TAG_MUTATOR =
    _ CHAR_PLUS val:$(ID)
    {
        return val;
    }

TAG_PROP =
    _ name:$(PROP_ASCII+) CHAR_SQ string:$(STRING) CHAR_SQ
    {
        return [name, m.fixEscapedChars(string)];
    }

TAG_INLINED_CONTENT
    = _ CHAR_EQ _ CHAR_SQ string:$(STRING) CHAR_SQ
    {
        return m.fixEscapedChars(string);
    }

// Reusable atoms.

STRING "string"
    = CHAR*

CHAR
    = (ESCAPE CHAR_SQ)
    / (ESCAPE ESCAPE)
    / !(CHAR_SQ) !(ESCAPE) .

ESCAPE
    = "\\"

UNICODE
    = !(NL) .

ID
    = LETTER+ LETTER_EXTRA*

LETTER "Letter A-Z"
    = [a-zA-Z]

LETTER_EXTRA "Letter A-Z or - _"
    = [a-zA-Z0-9-_]

ASCII
    = [ -~]

PROP_ASCII
    = [!-&(-<>-~]

PROP_ASCII_INNER
    = [ -&(-~]

_ "Whitespace"
    = WS

__ "Extended whitespace"
    = WS* NL?

WS "Whitespace"
    = [ \t]

LF "Line feed"
    = [\n]

CR "Carriage return"
    = [\r]

NL "Newline either windows or *nix"
    = CR LF / LF

CHAR_POUND "#"
    = '#'

CHAR_BT "Backtick character"
    = '`'

CHAR_PLUS
    = '+'

CHAR_EQ "Equals sign"
    = '='

CHAR_SQ "Single quote character"
    = '\''

CHAR_QM "Question mark"
    = '?'

CHAR_DASH
    = '-'

CHAR_EM "Exclamation mark."
    = '!'

CHAR_DOT
    = '.'