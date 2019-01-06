# Configuration

Your `.esclirc` file is where you can customize escli to work for
you. With the use of
[cosmiconfig](https://github.com/davidtheclark/cosmiconfig) it accepts
a few different formats of files, given that the name contains
`.esclirc`.

When a command is executed from the command line, escli will look for
the first configuration file it can find by looking at the current
path and then going up the directory hierarchy.

__Note__: for the sake of brevity I use a javascript file
(`.esclirc.js`) as option for the documentation.

## Properties

``` javascript
// .esclirc.js
module.exports = {
    silent: false,                         // should escli responses be silenced
    printWidth: 2,                         // tab width size for json responses
    client: {
        host: 'http://localhost:9200',
        log: false,
    }
};
```

For more information over the `client` property check [setup
client]('./setting-up-client.md').
