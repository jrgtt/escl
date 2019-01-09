# Options
The options passed to escli commands varies according to which methods of the
elasticsearch client you want to call and will be passed down as properties.
However, escli claims few special options as its own and can be used in
conjunction with the majority of commands. Herein its described how to make use
of them.

## Regular options
Given that you want to call the
[`search`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search)
method of the client.

``` shell
$ escli _search \
  --index myindex \
  --type mytype \
  --size 5 \
  --q "title:search"
```

Under the hood escli will convert the command in the following call:

``` javascript
client.search({
    index: 'myindex',
    type: 'mytype',
    size: 5,
    q: 'title:search'
});
```

## Using files
Passing everything in the command line can easily become daunting, specially if
you need to deal with search queries. For this reason escli provides `file` and
`body` as special options where js/json files can be passed as value.

__NOTE__: In the [search section](examples/search.md) in examples you can find more
in depth use cases.

### `--file|f <filepath>`
The file option will get the contents from the passed file and will call the
method with it.

``` javascript
// query.js
module.exports = {
    index: 'myindex',
    body: {
        query: {
            match_all: {}
        }
    }
};
```

``` shell
$ escli _search --size 5 --file ./query.js
```

This will translate into the following call in the client.

``` javascript
client.search({
    index: 'myindex',
    body: {
        query: {
            match_all: {}
        }
    },
    size: 5
});
```

__NOTE__: The parameter `size` is merged with the file contents, this means that in
case of a duplicated parameter the one passed in the command line gains
precedence.

### `--body|b <filepath>`
The body option behaves pretty much the same as the file option, except that its
value will be passed to the `body` property instead. Below you can see an
equivalent call to the one above.

``` javascript
// query.js
module.exports = {
    query: {
        match_all: {}
    }
};
```

``` shell
$ escli _search --index myindex --size 5 --body ./query.js
```

## Experimental
A few options are still in development and its functionalities might be clunky.
In either way those might be considered game changers of `escli` and future
versions should contain improvements around them.

### `--edit|e`
Fires up your default editor to edit the parameters before calling the command.
If used in conjunction with `--file` or `--body` it will open the file instead
of generating one.

``` shell
# edit, save and close to see the results 
$ escli _search --index myindex --type mytype -e

# edit an already existing file
$ escli _search --index myindex --body ./query.js -e

# use a different editor on the spot
$ EDITOR=emacs escli _search --index myindex -e
```

### `--watch|w`
The watch flag used in conjuction with `--file` or `--body` will watch the file
for changes and redo the command when it notices changes on it. It's specially
useful when you're testing a new query.

``` shell
# every change to query.js now will trigger the _search command
$ escli _search --file ./query.js --watch
```
