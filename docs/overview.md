This is a fork of [assemble-pattern-lab](https://github.com/assemble/assemble-pattern-lab). It's not meant to be an implementation of [Pattern Lab](http://patternlab.io/) as much as it is a different implementation of atomic design.

There are a few differences in how this project handles templates compared to Pattern Lab. Instead of having to namespace partials, like `{{> organisms-latest-posts }}`, and then using a complex regex system for dynamically renaming these partials according to how they are organized in folders, here you can simply use `{{organism 'latest-posts'}}`.

This has several advantages:

* Store your patterns wherever you want them, just tell Assemble where they are.
* We're adhering to mustache/handlebars conventions instead of working around them.
* We can easily extend and add new patterns, or allow metadata to be passed as context to templates and so on.
