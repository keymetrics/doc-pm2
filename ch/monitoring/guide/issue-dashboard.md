---
layout: page
title: 问题仪表板 | 指南 | PM2 Plus教程
title-en: Issue Dashboard | Guide | PM2 Plus Documentation
menu: starter
lang: ch
---

# 问题仪表板
 
您可以跟踪服务器上发生的所有异常情况：
- 堆栈轨迹
- 在线代码编号
- 异常之前的日志

问题仪表板主要报告所有未捕获的异常。 发生时，node.js进程崩溃，pm2自动重启应用，同时提醒异常。

![问题仪表板]({{site.baseurl}}/img/monitoring/issue.png)

---

## 手动发出一项问题

如果您在代码中正确使用 `try ... catch`，则错误将被捕获，且永远不会在仪表板中报告。

如还是想收到报告，使用 `pmx.notify()`发出一个异常情况：

```javascript
const pmx = require('pmx')

try {
    // Critical action to be tested
}
catch(error) {
    // Your code in case of an exception
    pmx.notify(new Error('This is an error'))
}
```

---

## Express.js中间件

默认情况下，express会捕获所有发生的异常。

如果您想要报告它们，您需要添加PMX中间件：

```javascript
// all your routes here
// app.get((req, res) => {})
app.use(pmx.expressErrorHandler())
```

?> 在路由声明之后使用它。

---

## 下一步

[事务跟踪]({{ site.baseurl }}{% link ch/monitoring/guide/transaction-tracing.md %})
---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support