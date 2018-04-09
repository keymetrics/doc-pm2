# Configuration

Your dashboard comes with a lot of metrics without configuration.

However, a further configuration can be done using the **PMX library**. This is a lightweight library for advanced interaction between your server and the dashboard.

- **Expose custom metrics** to enrich your dashboard
- **Expose custom actions** remotely triggerable from anywhere
- **Emit events** to track anything you want
- **Refine exception detection** to detect even caught

---

## PMX installation

With npm:

```bash
npm install pmx --save
```

With yarn:

```bash
yarn add pmx
```

---

## PMX intialisation

Load and initialize pmx at the top level of your application, before any other `require`.

```javascript
const pmx = require('pmx').init({
    // Enable the exception reporting, default true
    errors: true,
    // Enable the transaction tracing, default false
    transactions: false,
    // Enable the profiling, default true
    profiling: true,
  })
```

?> See additional intialisation options in the [reference](/monitoring/reference/pmx.md).

---

## Expose custom metrics

pmx gives you a probe constructor giving you the ability to expose variable value to the dashboard.

Example:

```javascript
const probe = require('pmx').probe();

let counter = 0;

const metric = probe.metric({
  name: 'Online users',
  type: 'custom/users', // unique id that identify the metric
  unit: null, // value of the metric that will be displayed on the dashboard
  agg_type: 'avg', // This param is optionnal, it can be `sum`, `max`, `min`, `avg` (default) or `none`. It will impact the way the probe data are aggregated. Use `none` if this is irrelevant (eg: constant or string value).
  value: () => {
    return counter;
  }
})

const metric = probe.metric({
  name    : 'Realtime user',
  value   : () => {
    return Object.keys(users).length;
  }
})
```

Note that the custom metric value is sent every second, occuring a call of the function you have given.

?> Read more about exposing custom metrics in the [PMX reference](/monitoring/reference/pmx-api).

---

## Expose remote action

You can remotely trigger functions directly from your dashboard. After having been exposed from your code, action buttons can be found in the main dashboard page under in a dedicated section.

The action command takes a function as a parameter that needs to be called once the job is finished.

Example:

```javascript
const pmx = require('pmx');

pmx.action('db:clean', function(reply) {
  clean.db(() => {
    /**
     * reply() must be called at the end of the action
     */
     reply({success : true});
  });
});
```

?> Read more about exposing remote actions in the [PMX reference](/monitoring/reference/pmx-api).

---

## Emit Events

Emit events to get an history or statistics.

```javascript
const pmx = require('pmx')

pmx.emit('user:register', {
  user: 'Alex registered',
  email: 'thorustor@gmail.com'
})
```

?> Read more about emitting events in the [PMX reference](/monitoring/reference/pmx-api).

---

## Next steps

[Notifications](monitoring/guide/notifications.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support