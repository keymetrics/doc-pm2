# PM2 Documentation

## Install Jekyll

``` bash
sudo apt install clang make ruby-dev libffi-dev
bundle install
```

## Start in dev mode

```bash
$ npm install gulp -g
$ npm install
$ gulp
```

Then connect to `http://localhost:4010/doc/`

## Build for production

```bash
$ gulp dist
```

## Configuring Algolia Search

[Algolia crawler configuration file](https://github.com/algolia/docsearch-configs/blob/master/configs/pm2docs.json)
