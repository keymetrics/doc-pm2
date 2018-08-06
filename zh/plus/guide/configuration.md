---
layout: page
title: 配置 | 指南 | PM2 Plus教程
title-en: Configuration | Guide | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
---

# 配置

您的仪表板带有大量指标，无需配置。

但是，可以使用 **PMX library**完成进一步配置。 这是一个轻量级的库，用于您的服务器和仪表板之间的高级交互。

- **公开自定义指标**以丰富您的仪表板
- **公开自定义操作**可从任何地方远程触发
- **发送事件**来跟踪任何你想的
- **优化异常检测**以便检测及捕捉

## PMX安装

使用npm:

```bash
npm install @pm2/io --save
```

使用yarn:

```bash
yarn add @pm2/io
```

## PMX初始化

在任何其他`require`之前加载并初始化您应用顶层的io。

```javascript
const io = require('@pm2/io').init({
    // Enable the exception reporting, default true
    errors: true,
    // Enable the transaction tracing, default false
    transactions: false,
    // Enable the profiling, default true
    profiling: true,
  })
```

 请参阅[参考]({{ site.baseurl }}{% link zh/plus/reference/pmx.md %})中的其他初始化选项。
{: .tip}

## 显示自定义指标

io为您提供一个探针构造函数，使您能够将变量值显示在仪表板上。

例子：

```javascript
const probe = require('@pm2/io').probe();

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

请注意，自定义度量标准值每秒发送一次，发生于您所提供的函数调用。

 在[PMX参考]({{ site.baseurl }}{% link zh/plus/reference/pmx.md %})中阅读更多关于显示自定义指标的信息。
{: .tip}

## 实现远程操作

您可以直接从仪表板远程触发功能。 从代码中实现后，可以在特定部分的主仪表板页面中找到操作按钮。

操作命令将一个函数作为参数，一旦作业完成后需要调用该参数。

例子：

```javascript
const io = require('@pm2/io');

io.action('db:clean', function(reply) {
  clean.db(() => {
    /**
     * reply() must be called at the end of the action
     */
     reply({success : true});
  });
});
```

 在 [PMX参考]({{ site.baseurl }}{% link zh/plus/reference/pmx.md %})中详细了解如何实现远程操作。
{: .tip}

## 触发事件

触发事件以获取历史记录或统计数据。

```javascript
const io = require('@pm2/io')

io.emit('user:register', {
  user: 'Alex registered',
  email: 'thorustor@gmail.com'
})
```

 在 [PMX 参考]({{ site.baseurl }}{% link zh/plus/reference/pmx.md %})中详细了解触发事件。
{: .tip}

## 下一步

[通知]({{ site.baseurl }}{% link zh/plus/guide/notifications.md %})
{: .btn-stylized}

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以查看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support
