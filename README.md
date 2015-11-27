# Candor
A new way to write HTML, elegantly.

[![Build Status](https://travis-ci.org/r3oath/candor.svg?branch=master)](https://travis-ci.org/r3oath/candor)

# Example
```
head
    title = 'Hello World'

body
    div #'app' .'container'
        div .'row'
            div .'col-xs-12 text-center'
                img src'images/sick.png'
                p = 'This is pretty sick!'
```

Transforms into the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Hello World</title>
</head>
<body>
    <div id="app" class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <img src="images/sick.png" />
                <p>This is pretty sick!</p>
            </div>
        </div>
    </div>
</body>
</html>
```

# Installation

In your project directory, run the following command.

```bash
npm install candor --save
```

then simply call the following where necessary 

```javascript
var candor = require('candor');
var html = candor.parse(...) // Parse the candor syntax here.
```

# Usage

#### HTML Tags
```
name #'id' .'classes' key'value' +mutator = 'Inline content'
```

The only required section above is `name`. 

Tag properties are added as `key'value'`. 

Mutators, which are really just properties without values, such as `disabled` are denoted as `+disabled`. 

Inline content is optional, but if needed is simply specified as ` = 'content'` at the end of a tag. If this section is present, the opening and closing tags generated will be placed onto a single line instead of separate lines. 

Eg:

```
div #'app' .'app app__dark' @click.stop'toggle()' +disabled = 'Hello!'
```

the above will produce the following rendered HTML:

```html
<div id="app" class="app app__dark" @click.stop="toggle()" disabled>Hello!</div>
```

#### Comments
```
? This is a comment.
```

Comments will not be present in the rendered HTML.

#### Raw Content
```
script type'text/javascript'
    -- alert('hello world!');
```

If you require some JavaScript, PHP etc, simply prepend the code with `--` and it will be rendered as is. The above would produce:

```html
<script type="text/javascript">
    alert('hello world!');
</script>
```

#### HTML content
```
div
    'This is a paragraph.'
```

HTML content, aka the content that goes inside of a tag, is simply placed within single quotes. The above example would produce:

```html
<div>
    This is a paragraph.
</div>
```

#### Partials
If you don't want candor to automatically add the HTML5 headers to the generated document, simply add `!partial` to the beginning of the document.

Eg:

```
!partial

div = 'Some partial content...'
```

# Roadmap
- [x] Design the syntax.
- [x] Build a parser/generator.
- [x] Allow for the generation of partials.
- [ ] Allow for user defined indent sizes.
- [ ] Allow for better customization of rendered HTML5.
- [ ] Support for inline tags.
- [x] Support for Unicode (Currently limited to ASCII).
- [ ] Create a gulp plugin.
- [ ] Create a Laravel elixir plugin.