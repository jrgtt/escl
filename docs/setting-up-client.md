# Setting up your client

__escli__ is totally reliable on your client, by default it
provides you a few default configuration in case no options are
passed, but having knowledge and control over your client is
essential.

To pass down information to escli, your `.esclirc` is the way. Down
here I lay the default configuration.

``` javascript
// .esclirc.js
module.exports = {
   client: {
       host: 'http://localhost:9200',
       log: false
   }
};
```

For more information on how to extend check the [configuration docs of
elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html).

An alternative way is to pass an already instantiated client.

``` javascript
// myclient.js
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    log: false
});

module.exports = client;
```

``` javascript
// .esclirc.js
const myclient = require('./myclient.js');

module.exports = {
    client: myclient
};
```

## A note about logging

In the examples above I suppress the client's log by passing `log:
false`, since escli already provides you one. If you want do logging
in your own way, check out
[setup-logging](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/logging.html)
in elasticsearch.js documentation.

You can also silence escli by adding `silent: true` to your `.esclirc`.
