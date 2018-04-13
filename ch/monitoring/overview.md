---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Overview 概述

Why monitor your app with pm2 ? At the end of this pm2 monitoring overview, you'll have a good understanding of the capabilities of pm2 monitoring.
为什么要用pm2监控您的应用？ 在pm2监控概述结束时，您将对pm2监测功能有很好的了解。

---

## Global Dashboard 全球仪表板

### Unified Overview 统一概述

PM2 Monitoring allows you to have an extended view of all your apps and databases in one single place, at real-time or through history. **Stop ssh in all your servers one by one**, instead, save time by having a condensed infrastructure monitoring view.
通过PM2 Monitoring，您只需在一个界面即可实时或通过历史记录查看所有应用和数据库的详细信息。 **别再一对一的ssh服务器连接了**，您可以通过精简的基础架构集成式监控，以节省时间

![a unified overview](overview/unified.png)

### Custom Metrics 自定义指标

Expose the important variables from your Node.js applications source code and display them as performance metrics on the pm2 monitoring dashboard. **Monitor values that matter.**
公开Node.js应用源代码中的重要变量，并将它们作为性能指标显示在pm2监视仪表板上。 **监视重要的值。**

![custom metrics](overview/personalized.png)

### Notifications 提醒

Know when a data reaches a threshold, when an error occurred in your application or when your production application is down.
知道数据何时达到阈值，应用发生错误或生产应用关闭时。

Even though pm2 runtime makes sure that your application have no downtime, be notified in these critical situation in order to react. **Be notified and reactive in any critical situations.**
尽管pm2运行时确保您的应用没有停机时间，但在这些重要情况下要收到通知才能做出反应。 **在任何特殊情况下都得到通知并做出反应。**

![notifications](overview/notifications.png)

---

## Debug & Optimize 调试 & 优化

### Issue Dashboard 异常仪表板

PM2 Monitoring reports the list of all errors in the "Issue Dashboard" occurred in your Node.js and gets you notified.
PM2 Monitoring会生成Node.js中“异常仪表板”中发生的所有错误列表，并通知您。

Stop spending time finding bugs or trying to replay them, we provide you an "Issue Dashboard" with everything in one place, to make debugging easier. **Drill down in your code and get the answer.**
停止花时间查找错误或尝试重播它们，我们为您提供一个“异常仪表板”，将所有内容放在一个地方，以便更轻松地进行调试。 **深入解读您的代码并得到解决方案。**

![issue dashboard](overview/issue.png)

### Transaction Tracing 事物跟踪

Record and aggregate the database and external calls that your application makes on every http request.
记录和汇总您的应用在每个http请求上所做的数据库和外部调用。

The "Transaction Tracing" helps you troubleshoot performance issues and to get detailed low-level insight into how your app is working (slowest routes, most consuming, number of calls). **Provide a better user experience and make your app faster.**
“事务跟踪”可帮助您排查性能问题，并获得有关您的应用工作情况的详细信息（最慢的路线，最浪费的呼叫数量）。 **提供更好的用户体验，使您的应用更快。**


![transaction tracing](overview/tracing.png)

### Memory & CPU profiling 内存和CPU分析

Take memory dumps and CPU snapshots straight from your production servers.
直接从产品服务器获取内存转储和CPU快照

**Memory profiling lets you find any memory leaks in your application. CPU profiling helps you identify particular resource-heavy tasks.**
**内存分析可让您在应用中发现任何可能存在的内存泄漏问题。CPU分析可帮助您识别高度消耗资源的任务。**

![cpu and memory profiling](overview/profiling.png)

---

## Extra-features 额外-功能

### Remote control 遥控

PM2 Monitoring makes possible to enhance custom functions in the source code of your application.
PM2 Monitoring使您可以在应用的源代码中增强自定义功能。

 For example, you can assign values to your application variables or just switch it to maintenance mode. In other words you can **expose triggerable functions in your code**.
 例如，您可以给应用变量赋值，或者切换到维护模式。换句话说，您可以在 **您的代码中公开可触发函数**。

![remote action](overview/remote.png)

### Event Dashboard 事件仪表板

This mechanism allows you to track important events that occurred in your code. You can gather large amounts of data for statistics or just log unusual event.
这个机制允许您跟踪您代码中发生的重要事件。

For example your can track and be alerted when a new user has registered, a new email has been sent, a worker has finished its jobs. **You can emit any event directly from your code and subscribe to some of these.**
例如，当新用户注册时，一封新邮件被发出时，一项工作进程完成式，您可以对它们跟进并收到提醒。 **您可以直接从您的代码发出任意事件，也可以订阅其中的一些事件**


![event](overview/event.png)

### Third-party modules 第三方模块

Extend the capabilities of the PM2 dashboard by using external modules listed in our module page.
通过使用我们模块页面中列出的外部模块来扩展PM2仪表板的功能。


A Pm2 module can be a log rotation module, database monitoring module, a standalone http proxy, a load balancer, a DNS server or any kind of utility. **Anyone can create and publish its own module.**
Pm2模块可以是日志轮换模块，数据库监控模块，一个独立的http代理，一个负载平衡器，一个DNS服务器或任意类型的实用工具。**任何人都可以创建和发布自己的模块。**

![modules](overview/modules.png)


---

### Next steps 下一步

[Quick Start 快速入门](monitoring/quickstart.md)

---

### Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。


