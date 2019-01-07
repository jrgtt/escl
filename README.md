# ESCLI
The elasticsearch command line is an utility program wrapping around the
[elasticsearch.js](https://github.com/elastic/elasticsearch-js) client.

# Options
Options passed in the command will be added as keys to the client function.

The following command passes `index` and `type` as parameters.
``` shell
escli _search --index myindex --type mytype
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

### `--edit|-e`
Fires up your editor to edit the parameters before calling the
command. If used in conjunction with `--file`, `--watch` or `--body` options it
will open the file instead of generating one.

### `--body|b <filepath|JSONString>`
The body option can accept a file or a string as parameter, if a file
is passed it's expected to be a JSON file or a valid JS module
file exporting an object.

``` javascript
// query.js
module.exports = {
    query: {
        match_all: {}
    }
};
```

``` shell
escli _search --body ./query.js --index myindex
```

Will translate into:

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

The same can be achieved with a valid JSON string.
``` shell
escli _search --index myindex -b '{"query": {"match_all": {}}}'
```

### `--watch|w`
The watch flag used in conjuction with `--file` or `--body` will watch the file
for changes and redo the command when it notices changes on it.

## Disclaimer
This is side project I've built in my spare time with the purpose of helping me
out with repetitive tasks I use to perform in Elasticsearch. It's not encouraged
and advised to be used in a production environment and/or where sensitive data
is being handled.

## Contributing
Contribuitions and improvements in accord with the project philosophy are gladly
accepted. Make sure to check the [contribuiting](CONTRIBUTING.md) guide for
more info.
