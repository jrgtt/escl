# indices

The `_indices` namespace is used to manage indices, index settings, aliases,
and mappings.

Check out more over the [indices
api](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices.html)
in the official elasticsearch documenation.

## [_indices create](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-indices-create)

Create an index in elasticsearch.

```
$ escli _indices create --index myindex
```

Should ouput:

```
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "myindex"
}
```

To create an index with defined mapping and settings from a file, given it being
named `user.json`.

```json
{
    "settings": {
        "index": {
            "number_of_shards": 1,
            "number_of_replicas": 1
        }
    },
    "mappings": {
        "user": {
            "properties": {
                "category": {
                    "type": "keyword"
                },
                "name": {
                    "type": "text"
                }
            }
        }
    }
}
```

```
$ escli _indices create --index user -b ./user.json
```

## [_indices delete](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-indices-delete)

Delete an elasticsearch index

```
$ escli _indices delete --index myindex
```

## [_indices getMapping](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-indices-getmapping)

To get the associate mapping of a field

```
$ escli _indices getMapping --index myindex
```
