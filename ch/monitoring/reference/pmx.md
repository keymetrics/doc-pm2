---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# The PMX Library PMX文库

PMX is a lightweight library that allows advanced interactions with your dashboards.
PMX是一个轻量级库，允许与仪表板进行高级交互。  

- **Expose metrics** to be displayed in realtime or through history
- **Expose actions** remotely triggerable from the dashboard
- **Emit exceptions** like exceptions or critical issues
- **Emit events** to inform about anything
- **公开指标**可以实时或通过历史记录显示
- **公开操作**可从仪表板远程触发
- **发出异常** 比如异常或关键问题
- **发送事件**以通知任何事情

---

## Installation 安装

With yarn: 使用yarn:

```bash
yarn add pmx
```

With npm: 使用npm:

```bash
npm install pmx --save
```

### PMX intialisation PMX初始化

Load and initialize pmx at the top level of your application.
加载并初始化应用顶层的pmx.

```javascript
const pmx = require('pmx').init({
  errors: true,
  transactions: false
  profiling: true,
});
```

### Possible issues with modules: 模块可能存在的问题：

To retrieve the http latency, pmx [wraps](https://github.com/keymetrics/pmx/blob/master/lib/wrapper/simple_http.js) the `http` module. If you require any module modifying the `http` module, the wrapper could be removed.
为了检索http延迟，pmx [包装了](https://github.com/keymetrics/pmx/blob/master/lib/wrapper/simple_http.js)`http`模块。 如果您需要任何模块以修改`http`模块，此包装可以被移除

* `request-promise`: This module clears the node cache and requires a new clean version of the `http` module. To solve this require `http` again after requiring `request-promise` to get the correctly wrapped `http` module.
* `request-promise`：该模块清除节点缓存并需要一个新的干净版本的`http`模块。 为了解决这个问题，在请求`request-promise`以获得正确包装的 `http`模块后再次请求`http`。

Options available are:可用的选项是：

Option选项|Description描述|Type类型|Default默认
---|---|---|---|---
errors错误|Enable the Issue Dashboard启用问题仪表板|boolean|true
transactions事务|Enable the Transaction Tracing启用事物追踪|boolean|false
profiling分析|Enable the Profiling启用分析|boolean|true
http|Enable HTTP routes logging启用HTTP路由记录|boolean|true
http_latency||integer整数|200
http_code||integer整数|500
ignore_routes|Ignore http routes with the given patterns忽略具有给定模式的http路由|[Regexp]|[]
alert_enabled|Enable or disable the alert subfield in custom metrics在自定义指标中启用或禁用警报子字段|boolean|true
custom_probes|Auto expose JS Loop Latency and HTTP req/s as custom metrics自动公开JS循环延迟和HTTP请求作为自定义指标|boolean|true
network|Network monitoring at the application level,display inbound and outbound traffic 网络监视在应用级别，显示入站和出站流量|boolean|false
ports| Shows which ports your app is listening on显示您的应用正在侦听的端口|boolean|false

### Application level network traffic monitoring / Display used ports 应用级网络流量监视/显示使用的端口

You can monitor the network usage of a specific application by adding the option `network: true` when initializing PMX. 初始化PMX时，您可以通过添加选项`network：true`来监视特定应用的网络使用情况。
If you enable the flag `ports: true` when you init pmx it will show which ports your application is listening on.
如果您启动pmx时启用了标志`ports：true`，它将显示您的应用正在侦听哪些端口。

You can find these metrics in the **Custom Metrics** section located in the Keymetrics Dashboard page.
您可以在位于Keymetrics仪表板页面的**Custom Metrics**部分中找到这些指标。

Example: 示例：

```
pmx.init({
  [...]
  network : true, // Allows application level network monitoring
  ports   : true  // Displays ports used by the application
});
```

### HTTP latency analysis HTTP延迟分析

This feature enables you to monitor routes, latency and codes while being REST compliant.
通过此功能，您可以在遵从REST的同时监控路由，延迟和代码。

```javascript
pmx.http(); // You must do this BEFORE any require('http')
```

You can also ignore some routes by passing a list of regular expressions.
您也可以通过传递正则表达式列表来忽略一些路由。

```javascript
pmx.http({
  http          : true, // (Default: true)
  ignore_routes : [/socket\.io/, /notFound/] // Ignore http routes with this pattern (Default: [])
});
```

This can alternatively be done via pmx.init().
这可以选择性通过pmx.init（）来完成。

```javascript
pmx.init({
  http          : true, // (Default: true)
  ignore_routes : [/socket\.io/, /notFound/] // Ignore http routes with this pattern (Default: [])
});
```

---

## Custom Metrics 自定义指标

You can then program your very own metrics to track important and relevant information. 4 differents probes are available:
然后，您可以编制自己的指标来跟踪重要的相关信息。 有4种不同的探头可供选择：

- **Simple metrics**: Values that can be read instantly
- **简单的指标**：可立即读取的值 
    - eg. Monitor variable value
    - 例如，监视变量值
- **Counter**: Things that increment or decrement
- **计数器**：增加或减少的事物
    - eg. Downloads being processed, user connected
    - 例如，正在处理下载，用户连接
- **Meter**: Things that are measured as events / interval
- **仪表**：以事件/间隔来衡量的事物
    - eg. Request per minute for a http server
    - 例如，每分钟请求一个http服务器
- **Histogram**: Keeps a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution
- **直方图**：保留一个统计相关值的库，偏向最后5分钟以探索其分布
    - eg. Monitor the mean of execution of a query into database
    - 例如，监视查询执行到数据库的平均值

### Metric: Simple value reporting 指标：简单的价值报告

This allows to expose values that can be read instantly.
这允许暴露可以立即读取的值。

```javascript
const probe = pmx.probe()

// Here the value function will be called each second to get the value
const metric = probe.metric({
  name: 'Realtime user',
  value: function() {
    return Object.keys(users).length;
  }
})

// Here we are going to call valvar.set() to set the new value
const valvar = probe.metric({
  name: 'Realtime Value'
})

valvar.set(23)
```

### Counter: Sequential value change 计数器：顺序值更改

Things that increment or decrement. 增加或减少的事物。

```javascript
const probe = pmx.probe()

// The counter will start at 0
const counter = probe.counter({
  name: 'Current req processed'
});

http.createServer((req, res) => {
  // Increment the counter, counter will eq 1
  counter.inc()
  req.on('end', () => {
    // Decrement the counter, counter will eq 0
    counter.dec()
  })
})
```

### Meter: Average calculated values 仪表：平均计算值

Things that are measured as events / intervals.
以事件/间隔来衡量的事物。

```javascript
const probe = pmx.probe()

const meter = probe.meter({
  name: 'req/sec',
  samples: 1,
  timeframe: 60
})

http.createServer((req, res) => {
  meter.mark()
  res.end({ success: true })
})
```

#### Options 选项

**Sample** option is the rate unit. Defaults to **1** sec.
**Sample** 选项是费率单位。 默认为 **1** 秒。
**timeframe** option is the timeframe over which events will be analyzed. Defaults to **60** sec.
**timeframe** 选项是分析事件的时间范围。 默认为 **60**秒.

### Histogram 直方图

Stores a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution.
存储统计相关值的储存库，偏向最近5分钟以探索其分布。

```javascript
const probe = pmx.probe()

const histogram = probe.histogram({
  name: 'latency',
  measurement: 'mean'
})

let latency = 0

setInterval(function() {
  latency = Math.round(Math.random() * 100)
  histogram.update(latency)
}, 100)
```

### Common Custom Metrics options 常用自定义度量选项

- `name` : The probe name as it will be displayed on the **Keymetrics** dashboard.
- `name`：探针名称，它将显示在 **Keymetrics** 仪表板上。
- `agg_type` : This parameter is optional, it can be `sum`, `max`, `min`, `avg` (default) or `none`. It will impact the way the probe data are aggregated within the **Keymetrics** backend. Use `none` if this is irrelevant (eg: constant or string value).
- `agg_type`：这个参数是可选的，它可以是`sum`，`max`，`min`，`avg`（默认）或`none`。 它将影响探测数据在 **Keymetrics** 后端聚合的方式。 如果这不相关（如：常量或字符串值），则使用`none`。
- `alert` : For `Meter` and `Counter` probes. This parameter is optional. It will create an alert object (see below).
- `alert` : 用于 `Meter` 和 `Counter` 探测器。 该参数是可选的。它会创建一个警告对象（见下文）。

### Alert System for Custom Metrics 自定义度量的警报系统

This alert system can monitor a Probe value and launch an exception when hitting a particular value.
此警报系统可以监控Probe值，并在达到特定值时启动一个异常。

Example for a `cpu_usage` var: 一个`cpu_usage`变种的例子：
```javascript
const metric = probe.metric({
  name: 'CPU usage',
  value: () => {
    return cpu_usage;
  },
  alert: {
    mode: 'threshold',
    value: 95,
    // optional
    msg: 'Detected over 95% CPU usage',
    
    //optional
    action: () => {
      console.error('Detected over 95% CPU usage');
    },
    //optional
    cmp: (value, threshold) => {
      // default check
      return (parseFloat(value) > threshold);
    }
  }
});
```

#### Options: 选项：

- `mode` : `threshold`, `threshold-avg`, `smart`.
- `value` : Value that will be used for the exception check.将用于异常检查的值。
- `msg` : String used for the exception. 用于例外的字符串。
- `action` :  **optional**. Function triggered when the exception level is reached.
**可选的**。 当达到异常级别时触发函数。
- `cmp` : **optional**. Function used for exception check that takes 2 arguments.
**可选的**。用于有2个参数的异常检查的函数。
- `interval` : **optional**, `threshold-avg` mode. Sample length for monitored value (180 seconds default).
**可选的**，`threshold-avg`模式。 监控值的采样长度（默认为180秒）。
- `timeout` : **optional**, `threshold-avg` mode. Time after which mean comparison starts (30 000 milliseconds default).**可选的**，`threshold-avg`模式。 平均值比较开始后的时间（默认30 000毫秒）。

---

## Remote actions 远程操作

Remotely trigger functions directly from Keymetrics. These features can be found in the main Keymetrics Dashboard page under the Custom Action section.
直接从Keymetrics远程触发功能。 这些功能可以在自定义操作部分的主Keymetrics控制面板页面中找到。

### Simple actions 简单操作

A simple action allows to trigger a function from Keymetrics. The action command takes a function as a parameter (reply here) and needs to be called once the job is finished.
一个简单的操作允许从Keymetrics触发一个功能。 action命令将函数作为参数（在此处答复），并且在作业完成后需要调用该命令。

Example: 示例：

```javascript
const pmx = require('pmx')

pmx.action('db:clean', (reply) => {
  clean.db(function() {
    /**
     * reply() must be called at the end of the action
     */
     reply({success : true})
  })
})
```

### Scoped actions 作用域操作

Scoped Actions are advanced remote actions that can also be triggered from Keymetrics.
作用域操作是高级的远程操作，也可以由Keymetrics触发。

Two arguments are passed to the function, data (optionnal data sent from Keymetrics) and res that allows to emit log data and to end the scoped action.
两个参数传递给函数，数据（从Keymetrics发送的选项数据）和res，允许发出日志数据并结束作用域操作。

Example: 示例：

```javascript
pmx.scopedAction('long running lsof', (data, res) => {
  const child = spawn('lsof', [])

  child.stdout.on('data', (chunk) => {
    chunk.toString().split('\n').forEach((line) => {
      res.send(line); // This sends log to Keymetrics to be saved (for tracking)
    })
  })

  child.stdout.on('end', (chunk) => {
    res.end('end'); // This ends the scoped action
  })

  child.on('error', (e) => {
    res.error(e);  // This reports an error to Keymetrics
  })

})
```


---

## Emit Events 发射事件

Emit events and get historical and statistics.
发布活动并获得历史和统计数据。
This is available in the Keymetrics **Events** page.
这在Keymetrics **Events**页面中可用。

```javascript
const pmx = require('pmx')

pmx.emit('user:register', {
  user: 'Alex registered',
  email: 'thorustor@gmail.com'
})
```

---

## Issues reports 问题报告

Once PM2 is linked to Keymetrics, you will be alerted of any uncaught exception by default.
These errors are accessible in Keymetrics **Issue** page. 
一旦PM2链接到Keymetrics，默认情况下会提醒您任何未捕获的异常。
这些错误可通过Keymetrics **Issue**页面访问。

### Custom alert notification 自定义提醒通知

If you need to alert about any critical errors you can do it programmatically:
如果您需要收到任意重要错误的提醒，您可以通过以下编程方式实现：

```javascript
const pmx = require('pmx')

pmx.notify({ success : false })

pmx.notify('This is an error')

pmx.notify(new Error('This is an error'))
```

### Add Verbosity to an Alert: Express Error handler 将赘言添加到提醒：加速错误处理

When an uncaught exception is happening you can track the routes from which it has been thrown.
To do that you have to attach the middleware `pmx.expressErrorHandler` at the end of your routes mounting:
当未捕获的异常发生时，您可以跟踪它被引发的路由。
要做到这一点，您必须在路由安装结束时附加中间件 `pmx.expressErrorHandler`。

```javascript
const pmx = require('pmx')

// All my routes
app.get('/' ...)
app.post(...)
// All my routes

// Here I attach the middleware to get more verbosity on exception thrown
app.use(pmx.expressErrorHandler())
```