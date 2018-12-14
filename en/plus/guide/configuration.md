---
layout: page
title: Configuration | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/guide/configuration/"
---

# Configuration

Your dashboard already comes with a lot of metrics without any configuration. But don't worry, you also can add predefined set of metrics or - even better - to create custom ones.

PM2 comes with the [@pm2/io](https://github.com/keymetrics/pm2-io-apm/tree/master/test) module, which is a module that gathers the metrics displayed in `pm2 monit` or in the web dashboard. By default, it just wraps your app. If you however want to refine the configuration, add custom metrics or custom actions, you must require it in your code.

## Installation

With npm:

```bash
npm install @pm2/io --save
```

With yarn:

```bash
yarn add @pm2/io
```

## Intialisation

Load and initialize `@pm2/io` at the top level of your application, before any other `require`.

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

 See all intialisation options in the [@pm2/io reference]({{ site.baseurl }}{% link en/plus/reference/pm2io.md %}).
{: .tip}

## Expose Custom Metrics

As said earlier, `@pm2/io` allows you to gather custom metrics.

### Create a custom metrics

You can create a custom metrics with the method `metric()` of `@pm2/io`.

```javascript
const io = require('@pm2/io');

io.metric({
  name: 'Realtime user',
});
```

This arguments are available:

- **name**: The metric name (required; string)
- **type**: The type of metric (default 'metric', string)
- **agg_type**: type of aggregation (default 'avg'; string: )
- **unit**: unit of the measure (default ''; string)
- **historic**: keep the history in PM2 Plus (default: true; boolean)

The type corresponds to one of the 4 ways to gather metrics:

- **metric**: To expose a variable's value
- **counter**: A discrete counter to be triggered manually to count a number of occurrence
- **meter**: To measure a frequency, a number of occurrences of a repeating event per unit of time
- **histogram**: To measure a statistic, a statistic on a metric over the last 5 minutes

### Metric: Variable Exposition

The first type of metric, called `metric`, is simply the exposition of a variable's value. The variable can be exposed passively, with a function that gets called every second, or actively, with a method that you use to update the value.

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

In active mode, you need to save the return of the `metric` method. This will give you an object that has the method `set()`. Use this method to update the value of the metric.

```javascript
const Realtime_Value = io.metric({
  type: 'metric',
  name: 'Realtime Value'
});

Realtime_Value.set(23);
```

### Counter: Discrete Counter

The second type of metric, called `counter`, is a discrete counter that helps you count the number of occurrence of a particular event. The counter starts at 0 and can be incremented or decremented.

```javascript
const io = require('@pm2/io');

const Current_req_processed = io.metric({
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

const reqsec = io.metric({
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

### Histogram: Statistics over time

This last type of metric collect values and provide statistic tools to explore their distribution over the last 5 minutes.

```javascript
const io = require('@pm2/io');

const latency = io.metric({
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

Options are:
- **measurement** : default: mean; min, max, sum, count, variance, mean, stddev, median, p75, p95, p99, p99.

## Expose Remote Actions

You can remotely trigger functions directly from your dashboard. After having been exposed from your code, action buttons can be found in the dedicated section.

### Simple actions

The function takes a function as a parameter, which needs to be called once the job is finished.

Example:

```javascript
const io = require('@pm2/io');

io.action('db:clean', (cb) => {
  clean.db(() => {
     cb({ success: true });
  });
});
```

### Scoped actions (beta)

Scoped Actions are advanced remote actions that can be also triggered from PM2 Plus.

Two arguments are passed to the function, data (optional data sent from PM2 Plus) and res that allows to emit log data and to end the scoped action.

Example:

```javascript
io.scopedAction('long running lsof', (data, res) => {
  const child = spawn('lsof', []);

  child.stdout.on('data', (chunk) => {
    chunk.toString().split('\n').forEach(function(line) {
      res.send(line); // This send log to PM2 Plus to be saved (for tracking)
    });
  });

  child.stdout.on('end', (chunk) => {
    res.end('end'); // This end the scoped action
  });

  child.on('error', (e) => {
    res.error(e);  // This report an error to PM2 Plus
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

## Next Steps


[@pm2/io reference]({{ site.baseurl }}{% link en/plus/reference/pm2io.md %})
{: .btn-stylized}

[Notifications]({{ site.baseurl }}{% link en/plus/guide/notifications.md %})
{: .btn-stylized}
