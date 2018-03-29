# The PMX Library

PMX is a lightweight library that allows advanced interactions with your dashboards.

- **Expose metrics** to be displayed in realtime or through history
- **Expose actions** remotely triggerable from the dashboard
- **Emit exceptions** like exceptions or critical issues
- **Emit events** to inform about anything

---

## Installation

With yarn:

```bash
yarn add pmx
```

With npm:

```bash
npm install pmx --save
```

### PMX intialisation

Load and initialize pmx at the top level of your application.

```javascript
const pmx = require('pmx').init({
  errors: true,
  transactions: false
  profiling: true,
});
```

### Possible issues with modules:

To retrieve the http latency, pmx [wraps](https://github.com/keymetrics/pmx/blob/master/lib/wrapper/simple_http.js) the `http` module. If you require any module modifying the `http` module, the wrapper could be removed.

* `request-promise`: This module clears the node cache and requires a new clean version of the `http` module. To solve this require `http` again after requiring `request-promise` to get the correctly wrapped `http` module.

Options available are:

Option|Description|Type|Default
---|---|---|---|---
errors|Enable the Issue Dashboard|boolean|true
transactions|Enable the Transaction Tracing|boolean|false
profiling|Enable the Profiling|boolean|true
http|Enable HTTP routes logging|boolean|true
http_latency||integer|200
http_code||integer|500
ignore_routes|Ignore http routes with the given patterns|[Regexp]|[]
alert_enabled|Enable or disable the alert subfield in custom metrics|boolean|true
custom_probes|Auto expose JS Loop Latency and HTTP req/s as custom metrics|boolean|true
network|Network monitoring at the application level,display inbound and outbound traffic|boolean|false
ports| Shows which ports your app is listening on|boolean|false

### Application level network traffic monitoring / Display used ports

You can monitor the network usage of a specific application by adding the option `network: true` when initializing PMX. 
If you enable the flag `ports: true` when you init pmx it will show which ports your application is listening on.

You can find these metrics in the **Custom Metrics** section located in the Keymetrics Dashboard page.

Example:

```
pmx.init({
  [...]
  network : true, // Allows application level network monitoring
  ports   : true  // Displays ports used by the application
});
```

### HTTP latency analysis

This feature enables you to monitor routes, latency and codes while being REST compliant.

```javascript
pmx.http(); // You must do this BEFORE any require('http')
```

You can also ignore some routes by passing a list of regular expressions.

```javascript
pmx.http({
  http          : true, // (Default: true)
  ignore_routes : [/socket\.io/, /notFound/] // Ignore http routes with this pattern (Default: [])
});
```

This can alternatively be done via pmx.init().

```javascript
pmx.init({
  http          : true, // (Default: true)
  ignore_routes : [/socket\.io/, /notFound/] // Ignore http routes with this pattern (Default: [])
});
```

---

## Custom Metrics

You can then program your very own metrics to track important and relevant information. 4 differents probes are available:

- **Simple metrics**: Values that can be read instantly
    - eg. Monitor variable value
- **Counter**: Things that increment or decrement
    - eg. Downloads being processed, user connected
- **Meter**: Things that are measured as events / interval
    - eg. Request per minute for a http server
- **Histogram**: Keeps a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution
    - eg. Monitor the mean of execution of a query into database

### Metric: Simple value reporting

This allows to expose values that can be read instantly.

```javascript
const probe = pmx.probe()

// Here the value function will be called each second to get the value
const metric = probe.metric({
  name: 'Realtime user',
  value: function() {
    return Object.keys(users).length;
  }
})

// Here we are going to call valvar.set() to set the new value
const valvar = probe.metric({
  name: 'Realtime Value'
})

valvar.set(23)
```

### Counter: Sequential value change

Things that increment or decrement.

```javascript
const probe = pmx.probe()

// The counter will start at 0
const counter = probe.counter({
  name: 'Current req processed'
});

http.createServer((req, res) => {
  // Increment the counter, counter will eq 1
  counter.inc()
  req.on('end', () => {
    // Decrement the counter, counter will eq 0
    counter.dec()
  })
})
```

### Meter: Average calculated values

Things that are measured as events / intervals.

```javascript
const probe = pmx.probe()

const meter = probe.meter({
  name: 'req/sec',
  samples: 1,
  timeframe: 60
})

http.createServer((req, res) => {
  meter.mark()
  res.end({ success: true })
})
```

Options:

**Sample** option is the rate unit. Defaults to **1** sec.
**timeframe** option is the timeframe over which events will be analyzed. Defaults to **60** sec.

### Histogram

Stores a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution.

```javascript
const probe = pmx.probe()

const histogram = probe.histogram({
  name: 'latency',
  measurement: 'mean'
})

let latency = 0

setInterval(function() {
  latency = Math.round(Math.random() * 100)
  histogram.update(latency)
}, 100)
```

### Common Custom Metrics options

- `name` : The probe name as it will be displayed on the **Keymetrics** dashboard.
- `agg_type` : This parameter is optional, it can be `sum`, `max`, `min`, `avg` (default) or `none`. It will impact the way the probe data are aggregated within the **Keymetrics** backend. Use `none` if this is irrelevant (eg: constant or string value).
- `alert` : For `Meter` and `Counter` probes. This parameter is optional. It will create an alert object (see below).

### Alert System for Custom Metrics

This alert system can monitor a Probe value and launch an exception when hitting a particular value.

Example for a `cpu_usage` var:
```javascript
const metric = probe.metric({
  name: 'CPU usage',
  value: () => {
    return cpu_usage;
  },
  alert: {
    mode: 'threshold',
    value: 95,
    // optional
    msg: 'Detected over 95% CPU usage',
    
    //optional
    action: () => {
      console.error('Detected over 95% CPU usage');
    },
    //optional
    cmp: (value, threshold) => {
      // default check
      return (parseFloat(value) > threshold);
    }
  }
});
```

Options:

- `mode` : `threshold`, `threshold-avg`, `smart`.
- `value` : Value that will be used for the exception check.
- `msg` : String used for the exception.
- `action` :  **optional**. Function triggered when the exception level is reached.
- `cmp` : **optional**. Function used for exception check that takes 2 arguments.
- `interval` : **optional**, `threshold-avg` mode. Sample length for monitored value (180 seconds default).
- `timeout` : **optional**, `threshold-avg` mode. Time after which mean comparison starts (30 000 milliseconds default).

---

## Remote actions

Remotely trigger functions directly from Keymetrics. These features can be found in the main Keymetrics Dashboard page under the Custom Action section.

### Simple actions

A simple action allows to trigger a function from Keymetrics. The action command takes a function as a parameter (reply here) and needs to be called once the job is finished.

Example:

```javascript
const pmx = require('pmx')

pmx.action('db:clean', (reply) => {
  clean.db(function() {
    /**
     * reply() must be called at the end of the action
     */
     reply({success : true})
  })
})
```

### Scoped actions

Scoped Actions are advanced remote actions that can also be triggered from Keymetrics.

Two arguments are passed to the function, data (optionnal data sent from Keymetrics) and res that allows to emit log data and to end the scoped action.

Example:

```javascript
pmx.scopedAction('long running lsof', (data, res) => {
  const child = spawn('lsof', [])

  child.stdout.on('data', (chunk) => {
    chunk.toString().split('\n').forEach((line) => {
      res.send(line); // This sends log to Keymetrics to be saved (for tracking)
    })
  })

  child.stdout.on('end', (chunk) => {
    res.end('end'); // This ends the scoped action
  })

  child.on('error', (e) => {
    res.error(e);  // This reports an error to Keymetrics
  })

})
```


---

## Emit Events

Emit events and get historical and statistics.
This is available in the Keymetrics **Events** page.

```javascript
const pmx = require('pmx')

pmx.emit('user:register', {
  user: 'Alex registered',
  email: 'thorustor@gmail.com'
})
```

---

## Issues reports

Once PM2 is linked to Keymetrics, you will be alerted of any uncaught exception by default.
These errors are accessible in Keymetrics **Issue** page. 

### Custom alert notification

If you need to alert about any critical errors you can do it programmatically:

```javascript
const pmx = require('pmx')

pmx.notify({ success : false })

pmx.notify('This is an error')

pmx.notify(new Error('This is an error'))
```

### Add Verbosity to an Alert: Express Error handler

When an uncaught exception is happening you can track the routes from which it has been thrown.
To do that you have to attach the middleware `pmx.expressErrorHandler` at then end of your routes mounting:

```javascript
const pmx = require('pmx')

// All my routes
app.get('/' ...)
app.post(...)
// All my routes

// Here I attach the middleware to get more verbosity on exception thrown
app.use(pmx.expressErrorHandler())
```