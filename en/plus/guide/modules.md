---
layout: page
title: Modules | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/guide/modules"
---

# Modules

Modules are open-source addons that are built and maintained thanks to the community. A PM2 module is just a Node.js process run by PM2 and whose code can be pulled directly with PM2. Modules, when used with the [the @pm2/io library](https://github.com/keymetrics/pm2-io-apm), are great to monitor external databases: a process in charge of collecting the data from the database and reporting the metrics into the dashboard with `@pm2/io`.

Anyone can create and publish a module. Send us an email to: contact@pm2.io if you want us to add your module to this list. Modules are published as common Javascript libraries on NPM.

## Use a module

Module are designed to be easy to use and to refine your configuration according to your needs.

### Available modules

Module Name|Description
---|---
[pm2-server-monit](https://github.com/keymetrics/pm2-server-monit)|Monitor your server machine (maintained by us)
[pm2-logrotate](https://github.com/keymetrics/pm2-logrotate)|Split your logs into multiple files (maintained by us)
[pm2-elasticsearch](https://github.com/pm2-hive/pm2-elasticsearch)|Monitor your Elastic Search
[pm2-redis](https://github.com/pm2-hive/pm2-redis)|Monitor your Redis
[pm2-mysql](https://github.com/pm2-hive/pm2-mysql)|Monitor your MYSQL
[pm2-rabbitmq](https://github.com/pm2-hive/pm2-rabbitmq)|Monitoring module for RabbitMQ
[pm2-mongodb](https://github.com/pm2-hive/pm2-mongodb)|Monitor your Mongo DB
[pm2-postgres](https://github.com/pm2-hive/pm2-postgres)|Monitor your PostgreSQL
[pm2-memcached](https://github.com/pm2-hive/pm2-memcached)|Monitor your Memcached
[pm2-couchdb](https://github.com/pm2-hive/pm2-couchdb)|Monitor your CouchDB
[pm2-php-fpm](https://github.com/pm2-hive/pm2-php-fpm)|Monitor your PHP server

### Installation

```bash
pm2 install <module-name>

# Install a module from GitHub (username/repository)
pm2 install pm2-hive/pm2-docker

# Install a module in dev mode from local folder
pm2 install .
```

### Configuration

Module sometimes offers the possibility to setup some values specified in the Readme file or in the package.json of the root folder.

You can set a value with:
```bash
pm2 set module_name:option_name <new_value>
```

These variables are written in `~/.pm2/module_conf.json`. All he configuration variables can be displayed with `pm2 conf [your-module-name]`. No restart is needed, the module is automatically restarted.

### Manage a module

```bash
# List all modules
pm2 ls

# Uninstall a module
pm2 uninstall <module-name>
```

## Create a module

If you don't find a module that suits your needs, don't wait and create one.

### Module Boilerplate

Generate a boilerplate:

```bash
pm2 module:generate <your-module-name>
```

Install and start the module:

```bash
cd <your-module-name>
pm2 install .
```

 If you edit the source, PM2 automatically restarts the module (watch option is activated)
{: .tip}

Display module logs with:

```bash
pm2 logs <your-module-name>
```

### Module Configuration

Module configuration can be added into the `package.json` file.

The `config` attribute gathers parameters that will be accessible in the module in the callback of `pmx.initModule()`.

The `apps` attribute contains the same configuration as the ecosystem file. Don't forget that a module is a process like any other ones.

```json
{
  "name": "your-module-name",         // Used as the module name
  "version": "1.0.0",                 // Used as the module version
  "description": "My awesome module", // Used as the module comment
  // Default configuration values
  // These values can be overriden with `pm2 set <module-name>:<attr> <val>`
  "config": {
    "days_interval" : 7,
    "max_size" : 5242880
  },
  // Module behavior options
  "apps": [{
    "script": "index.js",
    "merge_logs": true,
    "max_memory_restart": "200M"
  }]
}
```

### Module entry point

In your main module entry point, `pmx.initModule()` is called to initialize the module:

```javascript
const pmx = require('pmx')

const conf = pmx.initModule({
  // Override PID to be monitored
  pid: pmx.resolvePidPaths(['/var/run/redis.pid']),
}, (err, conf) => {
  // Now the module is initialized
  require('./business_logic.js')(conf)
})
```

### Installation Display

Once the module is installed, you can change the behavior to display a table containing the content you want. Edit the package.json and add an env section with `pm2_EXTRA_DISPLAY: true`:


```json
{
  [...]
  "apps" : [{
    "script" : "index.js",
    "env"    : {
      "pm2_EXTRA_DISPLAY" : "true"
    }
  }],
  [...]
}
```

Then in your code:

```javascript
const pmx = require('pmx')

pmx.configureModule({
  human_info: [
    ['Status', 'Module ready'],
    ['Comment', 'This is a superb comment the user should see'],
    ['IP', 'my machine ip!']
  ]
})
```

### Publish Your Module

Inside the module folder, deploy your module with:

```bash
pm2 publish
```

  This increments the minor version of the module, runs `git add . ; git commit -m "VERSION"; git push origin master` then runs `npm publish`.
{: .tip}

## Next Steps

Thanks for finishing this guide.

You can now take a look at the [@pm2/io reference]({{ site.baseurl }}{% link en/plus/reference/pm2io.md %}) to master all the capabilities of PM2 Plus.
