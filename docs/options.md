# Options
Options passed in the command will be added as keys to the client function.

The following command passes `index` and `type` as parameters.

``` shell
$ escli _search --index myindex --type mytype
```

Will translate into:

``` javascript
client.search({
    index: 'myindex',
    type: 'mytype'
});
```

## Special Options
Escli however claims a few of those options for its own purposes.

### `--file|f <filepath>`
The file option expects a JSON file or a valid JS file exporting an object.

``` javascript
// user.js
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
$ escli _search --file ./query.js
```

This will translate into the following call in the client.

``` javascript
client.search({
    index: 'myindex',
    body: {
        query: {
            match_all: {}
        }
    }
});
```

### `--body|b <filepath|JSONString>`
The body option behaves pretty much the same as the file option, except that its
value will be passed to the `body` property. Below you can see an equivalent
call to the one above.

``` javascript
// query.js
module.exports = {
    query: {
        match_all: {}
    }
};
```

``` shell
escli _search --index myindex --body ./query.js
```

The same can also be achieved with a valid JSON string.

``` shell
escli _search --index myindex -b '{"query": {"match_all": {}}}'
```

## Experimental
A few options are still in development and its functionalities might be clunky.
In either way I (the project's creator) consider those the real game changers of
`escli` and will work to improve them.

### `--edit|-e`
Fires up your editor to edit the parameters before calling the
command. If used in conjunction with `--file`, `--watch` or `--body` options it
will open the file instead of generating a new one.

### `--watch|w`
The watch flag used in conjuction with `--file` or `--body` will watch the file
for changes and redo the command when it notices changes on it.
