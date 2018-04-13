---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Issue dashboard 问题仪表板
 
You can track all exceptions that happens on your servers along with:
您可以跟踪服务器上发生的所有异常情况：
- stack trace 堆栈轨迹
- line code number 在线代码编号
- logs before exception 异常之前的日志

The issue dashboard primarily reports all the uncaught exceptions. When happening, node.js process crashes and pm2 automatically restarts the application while emiting an exception.
问题仪表板主要报告所有未捕获的异常。 发生时，node.js进程崩溃，pm2自动重启应用，同时提醒异常。

![issue dashboard](../overview/issue.png)

---

## Manually emit an issue 手动发出一项问题

If you properly uses `try... catch` in your code, errors will be catch and will never be reported in the dashboard. 
如果您在代码中正确使用 `try ... catch`，则错误将被捕获，并且永远不会在仪表板中报告。

To reporte them anyway, emit yourself an exception with `pmx.notify()`:
还是想收到报告，使用 `pmx.notify()`发出一个异常情况：

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

## Express.js middleware Express.js中间件

By default, express catches all exceptions that happen.
默认情况下，express会捕获所有发生的异常。

You need to add the PMX middleware if you want them to be reported:
如果您想要报告它们，您需要添加PMX中间件：

```javascript
// all your routes here
// app.get((req, res) => {})
app.use(pmx.expressErrorHandler())
```

?> Use it after the routes declaration.
在路由声明之后使用它。

---

## Next steps 下一步

[Transaction Tracing 事务跟踪](monitoring/guide/transaction-tracing.md)

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support