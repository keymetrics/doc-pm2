---
layout: page
title: Quick Start with PM2
menu: starter
lang: en
redirect_from: "/monitoring/guide/notifications"
---

# Notifications

Notifications always gets you aware about critical events.

By default, you receive emails only on critical events:
- downtime
- deployment
- issues

This section will help you to setup custom notifications and to configure the channels where you want to receive them.

---

## Default notifications

By default, pm2 sends few different kind of notifications:

- When a new exception is thrown.

[New Exception] Exception detected on *process_name*

- When a server is offline for more than 90 seconds

- After a deployment

[App Malfunctioning] Application throws too many errors (*process_name*)

---

## Custom notifications

### Custom metric notifications

The main way to set custom notification with pm2 monitoring is to use the custom metrics.

When defining a custom metric, you can enable notifications on them when they reach a specific threshold.

Example :

```javascript
const metric = probe.metric({
  name: 'CPU usage',
  value: () => {
    return cpu_usage;
  },
  alert: {
    mode: 'threshold',
    value: 95,
    msg: 'Detected over 95% CPU usage', // optional
    action: () => { //optional
      console.error('Detected over 95% CPU usage');
    },
    cmp: (value, threshold) => { //optional
      return (parseFloat(value) > threshold); // default check
    }
  }
});
```

Available options are:

- `mode`:
  - `threshold`: trigger an alert directly when the value is above or below the threshold
  - `threshold-avg`: trigger an alert when the value is above or below the threshold for *X* seconds
  - `smart`: trigger an alert automatically when the value is unusual
- `value`: Value that will be used for the exception check.
- `msg`: String used for the exception.
- `action`:  **optional**. Function triggered when the exception is reached.
- `cmp`: **optional**. Function used for exception check taking 2 arguments.
- `interval`: **optional**, `threshold-avg` mode. Sample length for monitored value (180 seconds default).
- `timeout`: **optional**, `threshold-avg` mode. Time after which mean comparison starts (30 000 milliseconds default).

### Custom event notifications

An other way to set a custom notifications is to use a custom event.

After having defined a custom event, subscribe to it directly in the dashboard.

---

## Notification channels

By default, notifications are sent by email. You can also receive them on slack or via a webhook.

### Slack notifications

The Slack integration allows you to receive exceptions and event notifications straight into a selected Slack channel.

First you need to get the Slack URL and to setup an incoming Webhook. More details on how to set this up can be found here: [https://my.slack.com/services/new/incoming-webhook/](https://my.slack.com/services/new/incoming-webhook/) or [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks).

Then go to the notification page and insert the webhook into the field. Enable and click on update.

Check if you successfully received a notification into your slack channel confirming that it has been configured.

### Webhooks

You can also set a webhook that will make POST HTTP request to a given URL when you receive a notifications.

The format of the data is a json like the following:

```json
 {
   "event":"event:new_exception",
   "data":{
      "process":{
         "pm_id":9,
         "name":"pm2-elasticsearch",
         "rev":"ac77098c5e1b10d74360b113da6e717fab8fe427",
         "server":"pm2-module-testing"
      },
      "data":{
         "message":"Bad argument",
         "stack":"TypeError: Bad argument\n    at TypeError (native)\n    at ChildProcess.spawn (internal/child_process.js:274:26)\n    at exports.spawn (child_process.js:362:9)\n    at Object.exports.execFile (child_process.js:151:15)\n    at exports.exec (child_process.js:111:18)\n    at /home/node/pm2-elasticsearch/lib/actions.js:25:5\n    at process.<anonymous> (/home/node/pm2-elasticsearch/node_modules/pmx/lib/actions.js:64:14)\n    at emitTwo (events.js:92:20)\n    at process.emit (events.js:172:7)\n    at handleMessage (internal/child_process.js:695:10)"
      },
      "at":1472651928925,
      "created_at":1472651928925,
      "updated_at":1472651928925,
      "count":1,
      "identifier":"ad6f8650dabfec83f183633b0bba7d97",
      "infected_servers":[
         "pm2-module-testing"
      ],
      "timestamps":[
         1472651928925
      ],
      "commits":[
         "ac77098c5e1b10d74360b113da6e717fab8fe427"
      ],
      "bucket_url":"https://app.keymetrics.io/#/bucket/YOUR_BUCKET_ID/exceptions"
   }
}
```
 
Use case example: You can now setup an express server that can receive webhooks, automatically send SMS or use any integration you want.

---

## Next steps

[Issue Dashboard](monitoring/guide/issue-dashboard.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support