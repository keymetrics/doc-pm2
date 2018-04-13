---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Configuration 配置

Your dashboard comes with a lot of metrics without configuration.
您的仪表板带有大量指标，无需配置。

However, a further configuration can be done using the **PMX library**. This is a lightweight library for advanced interaction between your server and the dashboard.
但是，可以使用 **PMX library**完成进一步配置。 这是一个轻量级的库，用于您的服务器和仪表板之间的高级交互。

- **Expose custom metrics** to enrich your dashboard **公开自定义指标**以丰富您的仪表板
- **Expose custom actions** remotely triggerable from anywhere **公开自定义操作**可从任何地方远程触发
- **Emit events** to track anything you want **发送事件**来跟踪任何你想的
- **Refine exception detection** to detect even caught **优化异常检测**以便就算被发现也能检测

---

## PMX installation PMX安装

With npm: 使用npm:

```bash
npm install pmx --save
```

With yarn: 使用yarn:

```bash
yarn add pmx
```

---

## PMX intialisation PMX初始化

Load and initialize pmx at the top level of your application, before any other `require`.
在任何其他`require`之前加载并初始化您应用顶层的pmx。

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
请参阅[参考](/monitoring/reference/pmx.md)中的其他初始化选项。

---

## Expose custom metrics 显示自定义指标

pmx gives you a probe constructor giving you the ability to expose variable value to the dashboard.
pmx为您提供探测构造函数，使您能够将变量值显示在仪表板上。

Example: 例子：

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
请注意，自定义度量标准值每秒发送一次，发生于您所提供的函数调用。

?> Read more about exposing custom metrics in the [PMX reference](/monitoring/reference/pmx-api).
在[PMX 参考](/monitoring/reference/pmx-api)中阅读更多关于显示自定义指标的信息。

---

## Expose remote action 实现远程操作

You can remotely trigger functions directly from your dashboard. After having been exposed from your code, action buttons can be found in the main dashboard page under in a dedicated section.
您可以直接从仪表板远程触发功能。 从代码中实现后，可以在特定部分的主仪表板页面中找到操作按钮。

The action command takes a function as a parameter that needs to be called once the job is finished.
操作命令将一个函数作为参数，一旦作业完成后需要调用该参数。

Example: 例子：

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
在 [PMX 参考](/monitoring/reference/pmx-api)中详细了解如何实现远程操作。

---

## Emit Events 触发事件

Emit events to get an history or statistics.
触发事件以获取历史记录或统计数据。

```javascript
const pmx = require('pmx')

pmx.emit('user:register', {
  user: 'Alex registered',
  email: 'thorustor@gmail.com'
})
```

?> Read more about emitting events in the [PMX reference](/monitoring/reference/pmx-api).
在 [PMX 参考](/monitoring/reference/pmx-api)中详细了解触发事件。

---

## Next steps 下一步

[Notifications 通知](monitoring/guide/notifications.md)

---

## Questions ? 问题

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support