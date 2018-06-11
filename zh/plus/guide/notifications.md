---
layout: page
title: 通知 | 指南 | PM2 Plus教程
title-en: Notifications | Guide | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
---

# 通知

通知功能可以一直让您知悉关键事件。

默认情况下，您仅收到有关关键事件的邮件：
- 停机
- 部署
- 问题

本节将帮助您设置自定义通知并配置您想要接收它们的频道。

---

## 默认通知

默认情况下，PM2发送几种不同类型的通知：

- 当抛出新的异常时。

[新异常]在*process_name*上检测到异常

- 当服务器脱机超过90秒时

- 部署后

[应用程序故障]应用抛出太多错误 (*process_name*)

---

## 自定义通知

### 自定义指标通知

使用PM2 Plus设置自定义通知的主要方式是使用自定义指标.

定义自定义指标时，您可以在达到特定阈值时启用通知.

例子：

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

可用的选项是：

- `mode`:
  - `threshold`:当值高于或低于阈值时，直接触发警告
  - `threshold-avg`:当值高于或低于 *X* 秒阈值时触发警告
  - `smart`:当值不正常时自动触发警告
- `value`:将用于异常检查的值
- `msg`:用于例外情况的字符串
- `action`: **可选**。当发生异常时触发函数。
- `cmp`: **可选**。用于2个参数进行异常检查的函数。
- `interval`: **可选**，`threshold-avg`模式。 监测值的样本长度（默认为180秒）。
- `timeout`: **可选**，`threshold-avg`模式。 平均值比较开始后的时间段（默认30 000毫秒）。

### 自定义事件通知

另一种设置自定义通知的方式是使用自定义事件。

定义了自定义事件后，可以直接在仪表板中订阅它。

---

## 通知渠道

默认情况下，通知通过邮件发送。 您也可以通过slack或webhook接收.

### Slack通知

Slack集成允许您在选定的Slack频道直接接收异常情况和事件通知。

首先，您需要获取Slack URL并设置传入的Webhook。 关于如何设置的更多细节可以在这里找到：[https://my.slack.com/services/new/incoming-webhook/](https://my.slack.com/services/new/incoming-webhook/) 或 [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks)。

然后进入通知页面并将webhook插入字段。 启用并点击更新。

检查您是否在您的slack channel成功接收了一条通知，以确认它已配置成功。

### Webhooks

您还可以设置一个webhook，当您收到通知时，它会将POST HTTP请求发送到给定的URL。

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
 
用例示例：您现在可以设置一个可以接收WebHooks的快速服务器，自动发送SMS或使用任何您想要的集成。

---

## 下一步

[问题仪表板]({{ site.baseurl }}{% link zh/plus/guide/issue-dashboard.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support