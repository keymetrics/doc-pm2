---
layout: page
title: 概述 | PM2 Plus教程
title-en: Overview | PM2 Plus Documentation
menu: starter
lang: ch
---

# 概述

为什么要用PM2监控您的应用？ 在PM2监控概述结束时，您将对PM2监测功能有很全面的了解。

--- 

## 全球仪表板

### 统一概述

通过PM2 Plus，您只需在一个界面即可实时或通过历史记录查看所有应用和数据库的详细信息。 **别再一对一的ssh服务器连接了**，您可以通过精简的基础架构集成式监控，以节省时间

![一个统一概述]({{site.baseurl}}/img/plus/unified.png)

### 自定义指标

公开Node.js应用源代码中的重要变量，并将它们作为性能指标显示在PM2 Plus仪表板上。 **监视重要的值。**

![自定义指标]({{site.baseurl}}/img/plus/personalized.png)

### 提醒

知道数据何时达到阈值，应用发生错误或运行的应用关闭时。

尽管PM2运行时确保您的应用没有停机时间，但在这些重要情况下要确保收到通知才能做出反应。 **在任何特殊情况下都得到通知并做出反应。**

![提醒]({{site.baseurl}}/img/plus/notifications.png)

---

## 调试 & 优化

### 异常仪表板

PM2 Plus会生成Node.js中“异常仪表板”中发生的所有错误列表，并通知您。

停止花时间查找错误或尝试重播它们，我们为您提供一个“异常仪表板”，将所有内容放在一处，以便更轻松地进行调试。 **深入解读您的代码并得到解决方案。**

![异常仪表板]({{site.baseurl}}/img/plus/issue.png)

### 事物跟踪

记录和汇总您的应用在每个http请求上所做的数据库和外部调用。

“事务跟踪”可帮助您排查性能问题，并获得有关您的应用工作情况的详细信息（最慢的路由，耗费，调用数量）。 **提供更好的用户体验，使您的应用运行更快。**


![事物跟踪]({{site.baseurl}}/img/plus/tracing.png)

### 内存和CPU分析

直接从产品服务器获取内存转储和CPU快照

**内存分析可让您在应用中发现任何可能存在的内存泄漏问题。CPU分析可帮助您识别高度消耗资源的任务。**

![内存和CPU分析]({{site.baseurl}}/img/plus/profiling.png)

---

## 额外-功能

### 远程控制

PM2 Plus使您可以在应用的源代码中增强自定义功能。

 例如，您可以给应用变量赋值，或者切换到维护模式。换句话说，您可以在 **您的代码中公开可触发函数**。

![远程操作]({{site.baseurl}}/img/plus/remote.png)

### 事件仪表板

这个机制允许您跟踪您代码中发生的重要事件。您可以收集大量数据以进行统计或仅记录异常事件。

例如，当新用户注册时，一封新邮件被发出时，一项工作进程完成时，您可以对它们跟进并收到提醒。 **您可以直接从您的代码发出任意事件，也可以订阅其中的一些事件**


![事件]({{site.baseurl}}/img/plus/event.png)

### 第三方模块

Extend the capabilities of the PM2 dashboard by using external modules listed in our module page.
通过使用我们模块页面中列出的外部模块来扩展PM2仪表板的功能。


Pm2模块可以是日志轮换模块，数据库监控模块，一个独立的http代理，一个负载平衡器，一个DNS服务器或任意类型的实用工具。**任何人都可以创建和发布自己的模块。**

![模块]({{site.baseurl}}/img/plus/modules.png)


---

### 下一步

[快速入门]({{ site.baseurl }}{% link ch/plus/quick-start.md %})
---

### 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。


