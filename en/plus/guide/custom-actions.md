---
layout: page
title: Configuration | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/guide/custom-actions/"
---

![pm2io](https://raw.githubusercontent.com/keymetrics/branding/master/logos/pm2ioAPM/io-white.png)

# Custom Actions

![remote action](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/actionCenter/actionCenter.png)

To be able to use the action center you need to first configure the [@pm2/io](https://github.com/keymetrics/pm2-io-apm) module.

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

[Modules]({{ site.baseurl }}{% link en/plus/guide/modules.md %})
{: .btn-stylized}
