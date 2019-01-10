# commands

To understand which commands you have access inside `escl`, you need to
understand what methods your client can call. This is directly bounded to how
your client was created in [setting up client](setting-up-client.md) section and
which version are you using.

## In practice

If you're using a `6.3.x` version of elasticsearch, this means you have access
to the [all commands from this
version](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-6-3.html)
including the method
[exists](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-6-3.html#api-exists-6-3)
which you can see in action below.

``` shell
$ escl _exists \
    --index es_user_v1 \
    --type user \
    --id 1
```

A few commands are actually namespaces and requires a second subcommand. This is
the case of
[`indices.getMapping`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-6-3.html#api-indices-getmapping-6-3)
which can be translate to the command line like

``` shell
$ escl _indices getMapping --index es_user_v1
```
