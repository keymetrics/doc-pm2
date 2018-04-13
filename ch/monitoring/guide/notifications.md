---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Notifications 通知

Notifications always gets you aware about critical events.
通知功能可以一直让您知悉关键事件。

By default, you receive emails only on critical events:
默认情况下，您仅收到有关关键事件的电子邮件：
- downtime 停机
- deployment 部署
- issues 问题

This section will help you to setup custom notifications and to configure the channels where you want to receive them.
本节将帮助您设置自定义通知并配置您想要接收它们的频道。

---

## Default notifications 默认通知

By default, pm2 sends few different kind of notifications:
默认情况下，pm2发送几种不同类型的通知：

- When a new exception is thrown.
当抛出新的异常时。

[New Exception] Exception detected on *process_name*
[新异常]在*process_name*上检测到异常

- When a server is offline for more than 90 seconds
当服务器脱机超过90秒时

- After a deployment 部署后

[App Malfunctioning] Application throws too many errors (*process_name*)
[应用程序故障]应用抛出太多错误 (*process_name*)

---

## Custom notifications 自定义通知

### Custom metric notifications 自定义指标通知

The main way to set custom notification with pm2 monitoring is to use the custom metrics.
使用pm2 monitoring设置自定义通知的主要方式是使用自定义指标.

When defining a custom metric, you can enable notifications on them when they reach a specific threshold.
定义自定义指标时，您可以在达到特定阈值时启用通知.

Example : 例子：

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

Available options are: 可用的选项是：

- `mode`:
  - `threshold`: trigger an alert directly when the value is above or below the threshold
  当值高于或低于阈值时，直接触发警告
  - `threshold-avg`: trigger an alert when the value is above or below the threshold for *X* seconds
  当值高于或低于 *X* 秒阈值时触发警告
  - `smart`: trigger an alert automatically when the value is unusual
  当值不正常时自动触发警告
- `value`: Value that will be used for the exception check. 将会用于异常检查的值
- `msg`: String used for the exception. 用于例外情况的字符串
- `action`:  **optional**. Function triggered when the exception is reached. **可选**。 当发生异常时触发函数。
- `cmp`: **optional**. Function used for exception check taking 2 arguments.**可选**。 用于2个参数进行异常检查的函数。
- `interval`: **optional**, `threshold-avg` mode. Sample length for monitored value (180 seconds default).
**可选**，`threshold-avg`模式。 监测值的样本长度（默认为180秒）。
- `timeout`: **optional**, `threshold-avg` mode. Time after which mean comparison starts (30 000 milliseconds default). **可选**，`threshold-avg`模式。 平均值比较开始后的时间段（默认30 000毫秒）。

### Custom event notifications 自定义事件通知

An other way to set a custom notifications is to use a custom event.
另一种设置自定义通知的方式是使用自定义事件。

After having defined a custom event, subscribe to it directly in the dashboard.
定义了自定义事件后，可以直接在仪表板中订阅它。

---

## Notification channels 通知渠道

By default, notifications are sent by email. You can also receive them on slack or via a webhook.
默认情况下，通知通过电子邮件发送。 您也可以通过slack或webhook接收.

### Slack notifications Slack通知

The Slack integration allows you to receive exceptions and event notifications straight into a selected Slack channel. 
Slack集成允许您在选定的Slack频道直接接收异常情况和事件通知。

First you need to get the Slack URL and to setup an incoming Webhook. More details on how to set this up can be found here: [https://my.slack.com/services/new/incoming-webhook/](https://my.slack.com/services/new/incoming-webhook/) or [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks).
首先，您需要获取Slack URL并设置传入的Webhook。 关于如何设置的更多细节可以在这里找到：[https://my.slack.com/services/new/incoming-webhook/](https://my.slack.com/services/new/incoming-webhook/) 或 [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks)。

Then go to the notification page and insert the webhook into the field. Enable and click on update.
然后进入通知页面并将webhook插入字段。 启用并点击更新。

Check if you successfully received a notification into your slack channel confirming that it has been configured.
检查您是否在您的slack channel成功接收了一条通知，以确认它已配置成功。

### Webhooks

You can also set a webhook that will make POST HTTP request to a given URL when you receive a notifications.
您还可以设置一个webhook，当您收到通知时，它会将POST HTTP请求发送到给定的URL。

The format of the data is a json like the following:
数据的格式是像下面这样的json：

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
用例示例：您现在可以设置一个可以接收WebHooks的快速服务器，自动发送SMS或使用任何您想要的集成。

---

## Next steps 下一步

[Issue Dashboard 问题仪表板](monitoring/guide/issue-dashboard.md)

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support