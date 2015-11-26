# Candor
[![Build Status](https://travis-ci.org/r3oath/Candor.svg?branch=master)](https://travis-ci.org/r3oath/Candor)
A new way to write HTML, elegantly.

# The Mission
There are many preprocessors that make web development easier, such as LESS, SASS, Stylus, CoffeeScript etc. But there isn't much out there that makes writing HTML any easier, at least not in a elegant, generic and non-restrictive form that will work for most project requirements, regardless of framework... well, to an extent.

So, I decided to make **Candor**.

# Example
```
head
    title = 'Hello World'

body
    div #app `container`
        div `row`
            div `col-xs-12 text-center`
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

# Usage
At the moment the parser is available under `x.parse(...)`. There will be gulp and Laravel elixir plugins soon, which will make development with Candor much easier. For the time being though, if you'd like to play around the syntax rules are as follows:

#### HTML Tags
```
name #id `classes` key'value' +mutator = 'Inline content'
```

To generate an HTML tag, the only required section above is `name`. To give the tag an id, add `#id` where `id` is, well, the css id. Classes can be added inside a class block denoted between two backtick characters as shown above. Tag properties are added as `key'value'`. Mutators, which are really just properties without values, such as `disabled` are denoted as `+disabled`. Inline content is again purely optional, but if needed, is simply specified as ` = 'content'` at the end of a tag. If this section is present, the opening and closing tags generated will be placed onto a single line, instead of separate lines. For a complete example, the following Candor syntax:

```
div #app `app app__dark` @click.stop'toggle()' +disabled = 'Uhmmm?'
```

will produce the rendered HTML shown below:

```html
<div id="app" class="app app__dark" @click.stop="toggle()" disabled>Uhmmm?</div>
```

#### Comments
```
? This is a comment.
```

Comments are just there as, well, comments. They will not be present in the rendered HTML.

#### Raw Content
```
script type'text/javascript'
    -- alert('hello world!');
```

If you require some non-Candor generated HTML, such as some JavaScript, PHP etc code, simply prepend the code with `--` and it will be rendered as is, as raw content. The above would produce:

```html
<script type="text/javascript">
    alert('hello world!');
</script>
```

#### HTML content
```
p
    'This is a paragraph.'
```

HTML content, aka the content that goes inside of a tag, is simply placed within single quotes. The content is not processed in any way, and currently only supports standard ASCII characters (Unicode support hopefully coming very soon!). The above example would produce:

```html
<p>
    This is a paragraph.
</p>
```

# Roadmap
- [x] Design an initial, clean, syntax that will describe a HTML document.
- [x] Build a parser that ingests the new syntax and spits out the expected HTML.
- [ ] Allow for the generation of HTML5 files and partials.
- [ ] Allow for user defined indent sizes (Currently only supports 4 spaces to represent tabs)
- [ ] Allow for better customization of rendered HTML5.
- [ ] Support for inline tags.
- [ ] Support for Unicode (Currently limited to ASCII).
- [ ] Create a gulp plugin. 
- [ ] Create a Laravel elixir plugin.