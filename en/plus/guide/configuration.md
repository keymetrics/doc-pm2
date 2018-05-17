---
layout: page
title: Configuration | Guide | Keymetrics Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/guide/configuration"
---

# Configuration

Your dashboard comes with a lot of metrics without configuration. You also have the possibility to add some predefined set of metrics or to create custom ones.

PM2 comes with the [@pm2/io](https://github.com/keymetrics/pm2-io-apm/tree/master/test) module, which is its part in charge of gathering the metrics that are displayed in `pm2 monit` or in the web dashboard. By default, the module just wraps your app. You must require it in your code in order to refine the configuration and add custom metrics or custom actions.

You can check the [@pm2/io reference]({{ site.baseurl }}{% link en/plus/reference/pm2io.md %}).

---

## Installation

With npm:

```bash
npm install @pm2/io --save
```

With yarn:

```bash
yarn add @pm2/io
```

---

## Intialisation

Load and initialize @pm2/io at the top level of your application, before any other `require`.

```javascript
const io = require('@pm2/io')

io.init({
  metrics: {
    network: {
      ports: true
    }
  }
})
```

This first basic initialisation will add to the dashboard the port number your app is listening to.

?> See additional intialisation options in the [@pm2/io reference]({{ site.baseurl }}{% link en/plus/reference/pm2io.md %}).

---

## Expose Custom Metrics

@pm2/io allows you to gather metrics from your code to be reported in `pm2 monit` or in the Keymetrics dashboard.

### Create a custom metrics

You can create a new custom metrics with the method `metric()` of `@pm2/io`.

```javascript
const io = require('@pm2/io');

io.metric({
  type: 'metric',
  name: 'Realtime user',
});
```

You need to provide at least two arguments:

- **name**: The metric name
- **type**: The type of metric

There are 4 different types of metrics:

- **metric**: To expose a variable's value
- **counter**: A discrete counter to be triggered manually to count a number of occurrence
- **meter**: To measure a frequency, a number of occurrences of a repeating event per unit of time
- **histogram**: To measure a statistic, a statistic on a metric over the last 5 minutes

### Metric: Variable Exposition

The first type of metric, called `metric`, allows to expose a variable's value. The variable can be exposed passively, with a function that gets called every second, or actively, with a method that you use to update the value.

#### Passive Mode

```javascript
const io = require('@pm2/io');

io.metric({
  type: 'metric',
  name: 'Realtime user',
  value: function() {
    return Object.keys(users).length;
  }
});
```

#### Active Mode

In active mode, you need to create a probe and call the method `set()` to update the value.

```javascript
const { Realtime_Value } = io.metric({
  type: 'metric',
  name: 'Realtime Value'
});

Realtime_Value.set(23);
```

### Counter: Discrete Counter

The second type of metric, called `counter`, is a discrete counter that helps you count the number of occurrence of a particular event. The counter starts at 0 and can be incremented or decremented.

```javascript
const io = require('@pm2/io');

const { Current_req_processed } = io.metric({
  name: 'Current req processed',
  type: 'counter',
});

http.createServer((req, res) => {
  // Increment the counter, counter will eq 1
  Current_req_processed.inc();
  req.on('end', () => {
    // Decrement the counter, counter will eq 0
    Current_req_processed.dec();
  });
});
```

### Meter: Frequency

The third type of metric, called `meter`, compute the frequency of an event. Each time the event happens, you need to call the `mark()` method. By default, the frequency is the number of events per second over the last minute.

```javascript
const io = require('@pm2/io');

const { reqsec } = io.metric({
  name: 'req/sec',
  type: 'meter',
});

http.createServer((req, res) => {
  reqsec.mark();
  res.end({ success: true });
});
```

Additional options:
- **samples**: (optional)(default: 1) Rate unit. Defaults to **1** sec.
- **timeframe**: (optional)(default: 60) Timeframe over which the events will be analyzed. Defaults to **60** sec.

### Histogram: Statistics

Collect values and provide statistic tools to explore their distribution over the last 5 minutes.

```javascript
const io = require('@pm2/io');

const { latency } = io.metric({
  name: 'latency',
  type: 'histogram',
  measurement: 'mean'
});

const latencyValue = 0;

setInterval(() => {
  latencyValue = Math.round(Math.random() * 100);
  latency.update(latencyValue);
}, 100);
```

Options is:
- **measurement** : (optional)(default: avg) Can be `sum`, `max`, `min`, `avg` or `none`.

---

## Expose Remote Actions: Trigger Functions remotely

You can remotely trigger functions directly from your dashboard. After having been exposed from your code, action buttons can be found in the main dashboard page under in a dedicated section.

### Simple actions

The function takes a function as a parameter that needs to be called once the job is finished.

Example:

```javascript
const io = require('@pm2/io');

io.action('db:clean', (reply) => {
  clean.db(() => {
     reply({ success: true });
  });
});
```

### Scoped actions (beta)

Scoped Actions are advanced remote actions that can be also triggered from Keymetrics.

Two arguments are passed to the function, data (optional data sent from Keymetrics) and res that allows to emit log data and to end the scoped action.

Example:

```javascript
io.scopedAction('long running lsof', (data, res) => {
  var child = spawn('lsof', []);

  child.stdout.on('data', (chunk) => {
    chunk.toString().split('\n').forEach(function(line) {
      res.send(line); // This send log to Keymetrics to be saved (for tracking)
    });
  });

  child.stdout.on('end', (chunk) => {
    res.end('end'); // This end the scoped action
  });

  child.on('error', (e) => {
    res.error(e);  // This report an error to Keymetrics
  });

});
```

## Report Caught Exceptions

By default, in the Issue tab, you are only alerted for uncaught exceptions. Any exception that you catch is not reported. You can manually report them with the `notify()` method.

```javascript
const io = require('@pm2/io');

io.notify({ success: false });

io.notify('This is an error');

io.notifyError(new Error('This is an error'));
```

---

## Next steps

[Notifications]({{ site.baseurl }}{% link en/plus/guide/notifications.md %})

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support