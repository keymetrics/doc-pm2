---
layout: page
title: Reference | Keymetrics Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/reference/pm2io"
---

# The @pm2/io Library

[@pm2/io](https://github.com/keymetrics/pm2-io-apm/tree/master/test) is the library that comes with PM2 which is in charge of gathering the metrics that are displayed in `pm2 monit` or in the web dashboard. By default, the module just wraps your app but can be required in the code to refine the configuration or add custom metrics/actions.

---

### Initialisation options

Entry name|Description|Type|Default
---|---|---|---
  metrics: {
    eventLoopActive: true, // (default: true) Monitor active handles and active requests
    eventLoopDelay: true,  // (default: true) Get event loop's average delay
  
    deepMetrics: {
      mongo: true,     // (default: true) Mongo connections monitoring
      mysql: true,     // (default: true) MySQL connections monitoring
      mqtt: true,      // (default: true) Mqtt connections monitoring
      socketio: true,  // (default: true) WebSocket monitoring
      redis: true,     // (default: true) Redis monitoring
      http: true,      // (default: true) Http incoming requests monitoring
      https: true,     // (default: true) Https incoming requests monitoring
      "http-outbound": true, // (default: true) Http outbound requests monitoring
      "https-outbound": true // (default: true) Https outbound requests monitoring
    },
  
    v8: {
      new_space: true,                    // (default: true) New objects space size
      old_space: true,                    // (default: true) Old objects space size
      map_space: true,                    // (default: true) Map space size
      code_space: true,                   // (default: true) Executable space size
      large_object_space: true,           // (default: true) Large objects space size
      total_physical_size: false,         // (default: false) Physical heap size
      total_heap_size: true,              // (default: true)  Heap size
      total_available_size: false,        // (default: false) Total available size for the heap
      total_heap_size_executable: true,   // (default: true)  Executable heap size
      used_heap_size: true,               // (default: true)  Used heap size
      heap_size_limit: true,              // (default: true)  Heap size maximum size
      malloced_memory: false,             // (default: false) Allocated memory
      peak_malloced_memory: false,        // (default: false) Peak of allocated memory
      does_zap_garbage: false,            // (default: false) Zap garbage enable/disable
      GC: {
        totalHeapSize: true,              // (default: true)  GC heap size
        totalHeapExecutableSize: true,    // (default: true)  GC executable heap size
        usedHeapSize: true,               // (default: true)  GC used heap size
        heapSizeLimit: false,             // (default: false) GC heap size maximum size
        totalPhysicalSize: false,         // (default: false) GC heap physical size
        totalAvailableSize: false,        // (default: false) GC available size
        mallocedMemory: false,            // (default: false) GC allocated memory
        peakMallocedMemory: false,        // (default: false) GC peak of allocated memory
        gcType: true,                     // (default: true)  Type of GC (scavenge, mark/sweep/compact, ...)
       gcPause: true                     // (default: true)  Duration of pause (in milliseconds)
      }
    },

    network : {       // Network monitoring at the application level
      traffic : true, // (default: true) Allow application level network monitoring
      ports   : true  // (default: false) Shows which ports your app is listening on
    },

    // Transaction Tracing system configuration
    transaction  : {
      http : true,              // (default: true) HTTP routes logging
      tracing: {                // (default: false) Enable transaction tracing
        http_latency: 1,        // (default: 200) minimum latency in milliseconds to take into account
        ignore_routes: ['/foo'] // (default: empty) exclude some routes
      }
    }
  },
  
  actions: {
    eventLoopDump: false, // (default: false) Enable event loop dump action
    profilingCpu: true,   // (default: true) Enable CPU profiling actions
    profilingHeap: true   // (default: true) Enable Heap profiling actions
  }
});

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