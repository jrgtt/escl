# Contributing
For now this project aims to be a command line wrapper of
[elasticsearch.js](https://github.com/elastic/elasticsearch-js) and avoids
overriding its default functionality and responses.

## Running it locally
Clone this package and inside of the folder, make sure to run `yarn` or `npm
install` to install its dependencies.


To run the cloned `escl` version refer to its full path in the command line like:

```
./path/to/escl/index.js _info
```

or run `yarn link` or `npm link` inside the folder to have a global esque
feeling like:

```
escl _info
```
