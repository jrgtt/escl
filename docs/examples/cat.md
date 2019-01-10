# cat

The `_cat` namespace allows you print essential information over your
elasticsearch in a readable friendly form. Here I briefly describe some possible
commands along with some of its possible options.

Check out more over [cat
api](https://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html)
in the official elasticsearch documentation.

## [_cat indices](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-cat-indices)

List your elasticsearch indices.

```
$ escl _cat indices
```

Will output in the following format.

```
yellow open .kibana            km17ncLPR-ukfS7qsVHx6A 1 1       2      0  15.4kb  15.4kb
yellow open .monitoring-data-2 jjlrasdlQveik2xsAcbWLw 1 1       1      0   4.1kb   4.1kb
yellow open es_movies_v2       kFmuzlEDSoeIs21378mX7A 5 1   13066      0   1.8mb   1.8mb
yellow open es_actors_v1       Y1GYU3g9Rmsadadhadsuhw 5 1   11289      0 809.7kb 809.7kb
yellow open es_docs_v1         Oluidseyjs-KHefRU8Cf0A 5 1  258783  57184 222.4mb 222.4mb
```

Some options that can be passed along

```
# with column names
$ escl _cat indices -v

# sort by indices name desc
$ escl _cat indices -s "index:desc"

# limit the indices returned with wildcard
$ escl _cat indices --index "es*"
```

## [_cat aliases](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-cat-aliases)

List your aliases with column names and sorted by alias name.

```
$ escl _cat aliases -v -s "alias"
```
