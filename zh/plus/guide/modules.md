---
layout: page
title: Modules | 指南 | PM2 Plus教程
title-en: Modules | Guide | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
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
    "@pm2/io": "latest"
  },
  // Default configuration values
  // These values can be overriden with `pm2 set <module-name>:<attr> <val>`
  "config": {
    "days_interval" : 7,
    // These value is returned once you call io.initModule()
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

In your main module entry point, call the `io.initModule(opts, fn(){});` to initialize your module:

```javascript
const io = require('@pm2/io')

const conf = io.initModule({
  // Override PID to be monitored
  pid: io.resolvePidPaths(['/var/run/redis.pid']),
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
const io = require('@pm2/io')

io.configureModule({
  human_info : [
    ['Status' , 'Module ready'],
    ['Comment', 'This is a superb comment the user should see'],
    ['IP'     , 'my machine ip!']
  ]
})
```

You will then be able to see this kind of table when the module is installed!

### Module configuration

In the package.json you can declare default options accessible in the Module under the attribute `config`. These values can be overridden by pm2 or PM2 Plus.

### Default values

Add default configuration values in package.json under the "config" attribute:

```
{
 [...]
 "config": {             // Default configuration value
    "days_interval" : 7,  // -> returned from var ret = io.initModule()
    "max_size" : 5242880  // -> e.g. ret.max_size
 }
 [...]
}
```

These values are then accessible via the data returned by io.initModule().

Example:

```javascript
const conf = io.initModule({[...]}, (err, conf) => {
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

### Options with io.initModule

```javascript
var io     = require('@pm2/io');

var conf    = io.initModule({

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

If you built a module, please send us an email, we will promote your module and add it to PM2 Plus: [https://keymetrics.io/contact/](https://keymetrics.io/contact/)

Have fun!


## FAQ

### What is a PM2 module?

A PM2 module is basically a NPM module. But this time it's not a library, but a standalone process managed by PM2.
Internally it embeds the NPM install procedure. So a PM2 module is published on NPM and installed from NPM.

### What can be developed as a module?

Your creativity is the limit. A PM2 module can do pretty anything. From a log rotation module, a load balancer, a private NPM repository, a Node.js based wikipedia, an antivirus for server... Your creativity is the limit! (*internal pub/sub mecanism in a ROS style = offer micro services that can be subscribed to (setup procedure = conf system!)*)

### Super charged modules, with PM2 Plus

The real power of the module system comes once PM2 is linked to PM2 Plus.
When using [the keymetrics library](https://github.com/keymetrics/pm2-io-apm) you can build a dedicated interface displayed on PM2 Plus as well as [expose metrics](https://github.com/keymetrics/pm2-io-apm#expose-metrics-measure-anything), [remotely trigger actions](https://github.com/keymetrics/pm2-io-apm#expose-functions-trigger-functions-remotely), [alert about issues](https://github.com/keymetrics/pm2-io-apm#report-alerts-errors--uncaught-exceptions), [notify about events](https://github.com/keymetrics/pm2-io-apm#emit-events) or allow to configure the module remotely!

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
    "@pm2/io": "latest"         // Common dependencies to communiate with PM2 Plus
  },
  "config": {              // Default configuration value
                           // These values can be modified via PM2 Plus or PM2 configuration system

     "days_interval" : 7,  // -> this value is returned once you call io.initModule()
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
The io.initModule takes a range of options to configure the module display in PM2 Plus or to override the PID monitored by PM2:

```javascript
var io     = require('@pm2/io');

// Initialize the module
var conf    = io.initModule({

    // Override PID to be monitored (for CPU and Memory blocks)
    pid              : io.resolvePidPaths(['/var/run/redis.pid', '/var/run/redis/redis-server.pid']),

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

In the package.json you can declare default options accessible in the Module under the attribute `config`. These values can be overriden by PM2 or PM2 Plus.

### Default values

Add default configuration values in package.json under the "config" attribute:

```json
{
 [...]
 "config": {             // Default configuration value
    "days_interval" : 7,  // -> returned from var ret = io.initModule()
    "max_size" : 5242880  // -> e.g. ret.max_size
 }
 [...]
}
```

Then these values are accessible via the data returned by io.initModule().

Example:

```javascript
var conf = io.initModule({[...]});

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

### With PM2 Plus

In the main PM2 Plus Dashboard, the module will have a button called "Configure". Once you click on it you will be able to access / modify all configurations variable exposed on the package.json!

# PMX Helpers methods for Modules

### io.initModule(JSON)

This is the main method to be called to transform the current application into a PM2 Module. It is preferred that this method is called before any other required modules.

### io.configureModule(JSON)

Add/Override a variable to module option (.axm_options)

```javascript
io.configureModule({
  new_axm_option : true
});
```

### io.getConf()

Get configuration variables for modules (same object than what is returned by io.initModule())

### io.resolvePidPaths([])

Pass an array of possible pid file path location, open it and return the value.
