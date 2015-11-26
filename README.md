# Candor
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

# Roadmap
- [x] Design an initial, clean, syntax that will describe a HTML document.
- [x] Build a parser that ingests the new syntax and spits out the expected HTML.
- [] Allow for the generation of HTML5 files and partials.
- [] Allow for user defined indent sizes (Currently only supports 4 spaces to represent tabs)
- [] Allow for better customization of rendered HTML5.
- [] Support for inline tags.
- [] Support for Unicode (Currently limited to ASCII).
- [] Release version 1.0.0.
- [] Create a gulp plugin. 
- [] Create a Laravel elixir plugin.