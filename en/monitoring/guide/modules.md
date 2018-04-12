---
layout: page
title: Quick Start with PM2
menu: starter
lang: en
redirect_from: "/runtime/quick-start.html"
---

# Modules

A pm2 module is a standalone software installed and managed by pm2. These softwares are pulled from the npm repository and are published as common Javascript libraries on npm.

Anyone can create and publish a module. A module can be a [log rotation module](https://github.com/pm2-hive/pm2-logrotate), a [standalone http proxy](https://github.com/gridcontrol/proxy-only), a load balancer, a Node.js based wikipedia, a DNS server or any kind of utility. Your creativity is the limit!

### Available modules

Here is a full list of available module. Most of them can be found on the [pm2-hive github](https://github.com/pm2-hive).

Module Name | Description
---|---
pm2-server-monit| Monitor your server machine
pm2-elasticsearch| Monitor your Elastic Search
pm2-redis| Monitor your Redis
pm2-mysql| Monitor your MYSQL
pm2-rabbitmq| Monitoring module for RabbitMQ
pm2-mongodb | Monitor your Mongo DB
pm2-postgres| Monitor your PostgreSQL 
pm2-memcached| Monitor your Memcached
pm2-couchdb| Monitor your CouchDB
pm2-php-fpm| Monitor your PHP server
pm2-logrotate| Split your logs into multiple files

### Installation

```bash
pm2 install <module-name>

# Install a module from GitHub (username/repository)
pm2 install pm2-hive/pm2-docker

# Force module restart
pm2 restart <module-name>

# Get more informations
pm2 describe <module-name>

# Install a module in dev mode from local folder
pm2 install .

# Generate a module boilerplate
pm2 module:generate <module-name>

# Uninstall module
pm2 uninstall <module-name>

# Publish new module (Inc Semver + Git push + NPM publish)
pm2 publish
```

### Creating a module

To generate a module sample:

```bash
pm2 module:generate <module-name>
```

Now let's run this module with pm2:

```bash
cd <module-name>
pm2 install .
```

You can now edit the source and when you change something, pm2 will automatically restart the module (watch option activated).

To display module logs:

```bash
pm2 logs <module-name>
```

To remove the module:

```
pm2 uninstall <module-name>
```

### Sugar in Package.json

Complementary informations can be added to the **package.json** file.

You can define configuration values under the `config` attribute and the module behavior like a common pm2 managed process.

Example:

```json
{
  "name": "pm2-logrotate",  // Used as the module name
  "version": "1.0.0",       // Used as the module version
  "description": "my desc", // Used as the module comment
  "dependencies": {
    "pmx": "latest"
  },
  // Default configuration values
  // These values can be overriden with `pm2 set <module-name>:<attr> <val>`
  "config": {
    "days_interval" : 7,
    // These value is returned once you call pmx.initModule()
    "max_size" : 5242880
  },
  // Module behavior options
  "apps": [{
    "script": "index.js",
    "merge_logs": true,
    "max_memory_restart": "200M"
  }],
  "author": "Gataca Sanders",
  "license": "MIT"
}
```

### Module entry point

In your main module entry point, call the `pmx.initModule(opts, fn(){});` to initialize your module:

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

### Extra display

Instead of pm2 listing your processes once the module is installed, you can change its behavior to display a table containing the content you want.

To enable this behavior edit the package.json and add env section with **pm2_EXTRA_DISPLAY** set to true:

package.json:

```
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
  human_info : [
    ['Status' , 'Module ready'],
    ['Comment', 'This is a superb comment the user should see'],
    ['IP'     , 'my machine ip!']
  ]
})
```

You will then be able to see this kind of table when the module is installed!

### Module configuration

In the package.json you can declare default options accessible in the Module under the attribute `config`. These values can be overridden by pm2 or Keymetrics.

### Default values

Add default configuration values in package.json under the "config" attribute:

```
{
 [...]
 "config": {             // Default configuration value
    "days_interval" : 7,  // -> returned from var ret = pmx.initModule()
    "max_size" : 5242880  // -> e.g. ret.max_size
 }
 [...]
}
```

These values are then accessible via the data returned by pmx.initModule().

Example:

```javascript
const conf = pmx.initModule({[...]}, (err, conf) => {
  // Now we can read these values
  console.log(conf.days_interval);
});
```

### Changing values

Changing the default values of a module is simple, just do:

```bash
pm2 set module_name:option_name <new_value>
```

Example:

```bash
pm2 set server-monitoring:days_interval 2
```

- **NOTE1**: These variables are written in `~/.pm2/module_conf.json`, you can also edit it manually
- **NOTE2**: You can display configuration variable via `pm2 conf [module-name]`
- **NOTE3**: When you set a new value, the target module is automatically restarted
- **NOTE4**: Type casting is automatic (Boolean, Number, String)

### Publishing a module

Updating or publishing a module is straightforward. The `pm2 publish` command will increment the minor version of the module, will `git add . ; git commit -m "VERSION"; git push origin master` then it will `npm publish`.

```bash
cd my-module
pm2 publish
```

### Options with pmx.initModule

```javascript
var pmx     = require('pmx');

var conf    = pmx.initModule({

    [...]

    // Customize look and feel of this module
    widget : {
      // Logo to be displayed on the top left block (must be https)
      logo  : 'https://image.url',
      theme : ['#9F1414', '#591313', 'white', 'white'],

      // Toggle horizontal blocks above main widget
      el : {
        probes : false,
        actions: false
      },

      block : {
        // Display remote action block
        actions : true,

        // Display CPU / Memory
        cpu     : true,
        mem     : true,

        // Issues count display
        issues  : true,

        // Display meta block
        meta    : true,

        // Display metadata about the probe (restart nb, interpreter...)
        meta_block : true,

        // Name of custom metrics to be displayed as a "major metrics"
        main_probes : ['Processes']
      },
    },
}, function(err, conf) {
  /**
   * Main module entry
   */
  console.log(conf);
  // Do whatever you need
  require('./business_logic.js')(conf);
});
```

### Wanna share your module?

If you built a module, please send us an email, we will promote your module and add it to Keymetrics: [https://keymetrics.io/contact/](https://keymetrics.io/contact/)

Have fun!


## FAQ

### What is a PM2 module?

A PM2 module is basically a NPM module. But this time it's not a library, but a standalone process managed by PM2.
Internally it embeds the NPM install procedure. So a PM2 module is published on NPM and installed from NPM.

### What can be developed as a module?

Your creativity is the limit. A PM2 module can do pretty anything. From a log rotation module, a load balancer, a private NPM repository, a Node.js based wikipedia, an antivirus for server... Your creativity is the limit! (*internal pub/sub mecanism in a ROS style = offer micro services that can be subscribed to (setup procedure = conf system!)*)

### Super charged modules, with Keymetrics

The real power of the module system comes once PM2 is linked to Keymetrics.
When using [the keymetrics library](https://github.com/keymetrics/pmx) you can build a dedicated interface displayed on Keymetrics as well as [expose metrics](https://github.com/keymetrics/pmx#expose-metrics-measure-anything), [remotely trigger actions](https://github.com/keymetrics/pmx#expose-functions-trigger-functions-remotely), [alert about issues](https://github.com/keymetrics/pmx#report-alerts-errors--uncaught-exceptions), [notify about events](https://github.com/keymetrics/pmx#emit-events) or allow to configure the module remotely!

### Managing a module

To manage a module, commands are straightforward:

```bash
# INSTALL/UPDATE
$ pm2 install <module-name>

# INSTALL VIA GIT (username/repository)
$ pm2 install pm2-hive/pm2-docker

# UNINSTALL
$ pm2 uninstall <module-name>

# PUBLISH NEW MODULE RELEASE ON NPM
$ pm2 publish
```

### Development mode

In order to develop a module easily, PM2 offers a simple development workflow.

To start a module in development mode with auto restart on file change just do:

```bash
$ cd my-module/
$ pm2 install .
```

To consult the logs printed by the module do:

```bash
$ pm2 logs <module-name>
```

### Writing a module, the basics

### Package.json: Declare options, widget aspect and module behavior

A package.json must be present with some extra fields like `config` for configuration variables and `apps` to declare the [behavior of this module](https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#options-1):

```javascript
{
  "name": "pm2-logrotate",  // Used as the module name
  "version": "1.0.0",       // Used as the module version
  "description": "my desc", // Used as the module comment
  "dependencies": {
    "pm2": "latest",
    "pmx": "latest"         // Common dependencies to communiate with Keymetrics
  },
  "config": {              // Default configuration value
                           // These values can be modified via Keymetrics or PM2 configuration system

     "days_interval" : 7,  // -> this value is returned once you call pmx.initModule()
     "max_size" : 5242880
  },
  "apps" : [{              // Application configuration
    "merge_logs"         : true,
    "max_memory_restart" : "200M",
    "script"             : "index.js"
  }],
  "author": "Keymetrics Inc.", // Optional
  "license": "AGPL-3.0"        // Optional
}
```

### Module entry point

This is the index.js file (declared in the package.json in the apps section):
The pmx.initModule takes a range of options to configure the module display in Keymetrics or to override the PID monitored by PM2:

```javascript
var pmx     = require('pmx');

// Initialize the module
var conf    = pmx.initModule({

    // Override PID to be monitored (for CPU and Memory blocks)
    pid              : pmx.resolvePidPaths(['/var/run/redis.pid', '/var/run/redis/redis-server.pid']),

    widget : {

      // Module display type. Currently only 'generic' is available
      type : 'generic',

      // Logo to be displayed on the top left block
      // Must be https
      logo : 'https://image.url',

      // 0 = main element
      // 1 = secondary
      // 2 = main border
      // 3 = secondary border
      // 4 = text color (not implemented yet)
      theme : ['#9F1414', '#591313', 'white', 'white'],

      // Toggle horizontal blocks above main widget
      el : {
        probes : false,
        actions: false
      },

      block : {
        // Display remote action block
        actions : true,

        // Display CPU / Memory
        cpu     : true,
        mem     : true,

        // Issues count display
        issues  : true,

        // Display meta block
        meta    : true,

        // Display metadata about the probe (restart nb, interpreter...)
        meta_block : true,

        // Name of custom metrics to be displayed as a "major metrics"
        main_probes : ['Processes']
      },
    },

    // Status (in the future, not implemented yet)
    status_check : ['latency', 'event loop', 'query/s']
    //= Status Green / Yellow / Red (maybe for probes?)

});

// Here we can see the default configuration values declared in the package.json
console.log(conf);
```

### Configuring a module

In the package.json you can declare default options accessible in the Module under the attribute `config`. These values can be overriden by PM2 or Keymetrics.

### Default values

Add default configuration values in package.json under the "config" attribute:

```json
{
 [...]
 "config": {             // Default configuration value
    "days_interval" : 7,  // -> returned from var ret = pmx.initModule()
    "max_size" : 5242880  // -> e.g. ret.max_size
 }
 [...]
}
```

Then these values are accessible via the data returned by pmx.initModule().

Example:

```javascript
var conf = pmx.initModule({[...]});

// Now we can read these values
console.log(conf.days_interval);
```

### Override configuration values

### With PM2

With PM2 this is straightforward. Just call this command:

```bash
$ pm2 set module_name:option_name <new_value>
```

Example:

```bash
$ pm2 set server-monitoring:days_interval 2
```

**NOTE** These variables are written in `~/.pm2/module_conf.json`, so if you prefer, you can directly edit these variables in this file.
**NOTE2** You can display configuration variable via `pm2 conf [module-name]`
**NOTE3** When you set a new value the target module is restarted
**NOTE4** You have to typecast yourself values, it is always strings!

### With Keymetrics

In the main Keymetrics Dashboard, the module will have a button called "Configure". Once you click on it you will be able to access / modify all configurations variable exposed on the package.json!

# PMX Helpers methods for Modules

### pmx.initModule(JSON)

This is the main method to be called to transform the current application into a PM2 Module. It is preferred that this method is called before any other required modules.

### pmx.configureModule(JSON)

Add/Override a variable to module option (.axm_options)

```javascript
pmx.configureModule({
  new_axm_option : true
});
```

### pmx.getConf()

Get configuration variables for modules (same object than what is returned by pmx.initModule())

### pmx.resolvePidPaths([])

Pass an array of possible pid file path location, open it and return the value.

---
layout: docs
title: Module System
description: PM2 module
permalink: /docs/usage/building-module/
---

<a href="/images/racks/mongodb-rack.png" title="Keymetrics interface explanation"><img src="/images/racks/mongodb-rack.png"/></a>
<a href="/images/racks/redis-rack.png" title="Keymetrics interface explanation"><img src="/images/racks/redis-rack.png"/></a>

### What is a module?

A module is a simple Node.js application that will connect to a technology (database, utility) to both retrieve metrics (memory, entries...) and expose actions (restart, flush...).

A module is published on NPM.

### Getting started: Installing a module

1- Install PM2

```bash
$ npm install pm2 -g
```

2- [Go to Keymetrics](https://app.keymetrics.io/#/) and create a new account

3- Create a bucket and then follow the instructions to link your local PM2 to Keymetrics

4- Install a simple module

```bash
# Install a module that will monitor your current machine
$ pm2 install pm2-server-monit
```

Now you can see in the Keymetrics dashboard the module interface you just installed.

The source code of this pm2-server-monit module is [here](https://github.com/pm2-hive/pm2-server-monit).

Here are some additional modules:

- [pm2-redis](https://github.com/pm2-hive/pm2-redis.git)
- [pm2-mongodb](https://github.com/pm2-hive/pm2-mongodb)
- [pm2-elasticsearch](https://github.com/pm2-hive/pm2-elasticsearch)

### Getting started: Creating your own module

Creating your own module is straightforward.

To generate a sample module:

```bash
$ pm2 module:generate <module-name>
```

Now let's run this module with PM2:

```
$ cd <module-name>
$ pm2 install .
```

You can now edit the source, once you change something, pm2 will automatically restart the module.

To remove the module:

```
$ pm2 uninstall <module-name>
```

### API

### Package.json: Declare options, widget aspect and module behavior

A package.json must be present with some extra fields like `config` for configuration variables and `apps` to declare the [behavior of this module](https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#options-1):

```javascript
{
  "name": "pm2-logrotate",  // Used as the module name
  "version": "1.0.0",       // Used as the module version
  "description": "my desc", // Used as the module comment
  "dependencies": {
    "pm2": "latest",
    "pmx": "latest"         // Common dependencies to communiate with Keymetrics
  },
  "config": {              // Default configuration value
                           // These values can be modified via Keymetrics or PM2 configuration system

     "days_interval" : 7,  // -> this value is returned once you call pmx.initModule()
     "max_size" : 5242880
  },
  "apps" : [{              // Application configuration
    "merge_logs"         : true,
    "max_memory_restart" : "200M",
    "script"             : "index.js"
  }],
  "author": "Keymetrics Inc.", // Optional
  "license": "AGPL-3.0"        // Optional
}
```

### Module entry point

This is the index.js file (declared in the package.json in the apps section):
The pmx.initModule takes a range of options to configure the module display in Keymetrics or to override the PID monitored by PM2:

```javascript
var pmx     = require('pmx');

// Initialize the module
var conf    = pmx.initModule({

    // Override PID to be monitored (for CPU and Memory blocks)
    pid              : pmx.resolvePidPaths(['/var/run/redis.pid', '/var/run/redis/redis-server.pid']),

    widget : {

      // Module display type. Currently only 'generic' is available
      type : 'generic',

      // Logo to be displayed on the top left block
      // Must be https
      logo : 'https://image.url',

      // 0 = main element
      // 1 = secondary
      // 2 = main border
      // 3 = secondary border
      // 4 = text color (not implemented yet)
      theme : ['#9F1414', '#591313', 'white', 'white'],

      // Toggle horizontal blocks above main widget
      el : {
        probes : false,
        actions: false
      },

      block : {
        // Display remote action block
        actions : true,

        // Display CPU / Memory
        cpu     : true,
        mem     : true,

        // Issues count display
        issues  : true,

        // Display meta block
        meta    : true,

        // Display metadata about the probe (restart nb, interpreter...)
        meta_block : true,

        // Name of custom metrics to be displayed as a "major metrics"
        main_probes : ['Processes']
      },
    },
}, function(err, conf) {
  // The module has been initiated
  // Now you can require all files
  console.log(conf);
});
```

### Module configuration

In the package.json you can declare default options accessible in the module under the attribute `config`. These values can be overriden by PM2 or Keymetrics.

#### Default values

Add default configuration values in package.json under the "config" attribute:

```json
{
 [...]
 "config": {             // Default configuration value
    "days_interval" : 7,  // -> returned from var ret = pmx.initModule()
    "max_size" : 5242880  // -> e.g. ret.max_size
 }
 [...]
}
```

Then these values are accessible via the data returned by pmx.initModule().

Example:

```javascript
pmx.initModule({[...]}, function(err, conf) {
 // Now we can read these values
 console.log(conf.days_interval);
});
```

### Override configuration values

#### With PM2

With PM2 the process is straightforward. Just call this command:

```bash
$ pm2 set module_name:option_name <new_value>
```

Example:

```bash
$ pm2 set server-monitoring:days_interval 2
```

- **NOTE** These variables are written in `~/.pm2/module_conf.json`, so if you prefer, you can directly edit these variables in this file.
- **NOTE2** You can display configuration variable via `pm2 conf [module-name]`
- **NOTE3** When you set a new value the target module is restarted
- **NOTE4** You have to typecast yourself values, it is always strings!

#### With Keymetrics

In the main Keymetrics Dashboard, the module will have a button called "Configure". Once you click on it you will be able to access/modify all configuration variables exposed on the package.json!

### Publishing a module

Publishing or updating a module is also straightforward! The `pm2 publish` command will increment the minor version of the module, will `git add . ; git commit -m "VERSION"; git push origin master` then it will `npm publish`.

```
$ cd my-module
$ pm2 publish
```


### Enable git auto-pull

If you want to [Automatically synchronize your application with git](https://github.com/pm2-hive/pm2-auto-pull) add this into your Dockerfile:

```
RUN pm2 install pm2-auto-pull
```
*Make sure the .git is present in your application source folder.*

### Enable Monitor server

If you want to [Automatically monitor vital signs of your server](https://github.com/keymetrics/pm2-server-monit) add this into your Dockerfile:

```
RUN pm2 install pm2-server-monit
```
