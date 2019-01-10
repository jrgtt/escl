# search

The `_search` command gives you the ability to search in your indices, along
with escl special options you can create powerful queries that can be easily
tested and built with [bodybuilder](https://github.com/danpaz/bodybuilder).

## From the command line

The easiest form of searching is by passing parameters in the cli. In the
example below elasticsearch will retrieve results from `es_user_v1` with the
`user` type.

```
$ escl _search --index es_user_v1 --type user
```

The result format should be known for you.

```
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 0,
    "max_score": null,
    "hits": [
        ...
    ]
  }
}
```

To inline a query you can do the following.

```
$ escl _search --index es_user_v1 --type user -q "name:john"
```

Alternatively you can write the query by passing a json string to the `body` parameter.

```
$ escl _search --index es_user_v1 --type user --body "{\"query\": {\"match\": {\"name\": \"john\"}}}"
```

## Using files

As you can see above, inlining queries with the constraints of a terminal can be
cumbersome. To simplify this process escl accepts files as parameters for you
to write your queries.

Given that you have the following file:

```javascript
// query.js
module.exports = {
    query: {
        match: {
            name: "john"
        }
    }
};
```

Now you can achieve the same result with:

```
$ escl _search --index es_user_v1 --type book --body ./query.js
```

### Why `body`?

The body parameter will in the majority of cases suit your needs, but it's
nothing more than a syntatic sugar for the `file` option that will contain it.

```javascript
// query.js
module.exports = {
    index: 'es_user_v1',
    type: 'user',
    body: {
        query: {
            match: {
                name: "john"
            }
        }
    }
};
```

And then called:

```
$ escl _search --file ./query.js
```

__NOTE__: In the command above the omission of the `index` and `type` parameters. If
one of those were passed in the command above it would override the ones with
the same name in the file.


### Usage with bodybuilder

[Bodybuilder](https://github.com/danpaz/bodybuilder) is an amazing library to
write elasticsearch queries and you can leverage its power within escl by
returning a closure instead of an object.

```javascript
// query.js
module.exports = (params, modules) => {
    const myIndex = params.index; // params contains options passed in the command line

    const bodybuilder = modules.bodybuilder;
    const query = bodybuilder().query('match', 'name', 'john').build();

    return {
        index: params.index,
        body: query
    };
};
```

And then called:

```
$ escl _search --index es_user_v1 -f ./query.js
```
