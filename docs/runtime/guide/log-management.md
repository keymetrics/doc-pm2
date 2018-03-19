# Log management

Logs are available at realtime and are saved into your hard disk.

The way your logs are formatted, the way log files are created: everything can be customized.

---

## Access the logs

### Real-time logs

```bash
# all apps logs
pm2 logs

# only app logs
pm2 logs app
```

### Log files

By default, all logs are saved into `$HOME/.pm2/logs`.

You can empty all application logs with:

```bash
pm2 flush
```

---

## Log files configuration

You can specify a custom location for your logs.

```javascript
module.exports = {
  apps: [{
      name: 'app',
      script: 'app.js',
      output: './out.log',
      error: './error.log',
	    log: './combined.outerr.log',
    }]
}
```

- `output` is only standard output (console.log)
- `error` is only error output (console.error)
- `log` combines `output` and `error`, disabled by default

### Rotating Logs

If you want to split logs into multiple files instead of a big one, use the logrotate:

```bash
pm2 install pm2-logrotate
```

Learn how to configure the module [here](https://github.com/keymetrics/pm2-logrotate).

---

## Merging Logs

In cluster mode, each cluster has his own log files. You can use the merge options to gather all logs into a single file:

```javascript
module.exports = {
  apps: [{
      name: 'app',
      script: 'app.js',
      output: './out.log',
      error: './error.log',
      merge_logs: true,
    }]
}
```

?> Logs are still splitted into into output/error/log

---

## Disabling Logs

You can disable logs by sending them to /dev/null:

```javascript
module.exports = {
  apps: [{
      name: 'app',
      script: 'app.js',
      output: '/dev/null',
      error: '/dev/null',
    }]
}
```

---

## Log formating

### JSON

You can output the logs in JSON format:

```bash
echo
```

becomes:

```json
{
   "message": "echo\n",
   "timestamp": "2017-02-06T14:51:38.896Z",
   "type": "out",
   "process_id": 0,
   "app_name": "app"
}
```

Add this entry in your ecosystem file:

`ecosystem file: `"log_type": "json"`

### Timestamp format

You can output the logs adding a timestamp:

```bash
echo
```

becomes:

```bash
12-02-2018: echo
```

Add this entry in your ecosystem file:

`"date_log_format": "JJ-MM-YYYY"`

The format must follow a moment.js format, list [here](https://momentjs.com/docs/#/parsing/string-format/).

---

## Next step

[Startup Hook](/runtime/guide/startup-hook.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.