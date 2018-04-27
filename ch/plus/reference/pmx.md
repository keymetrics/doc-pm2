---
layout: page
title: 参考 | PM2 Plus教程
title: Reference | PM2 Plus Documentation
menu: starter
lang: ch
section: process-manager
section: plus
---

# PMX文库

PMX是一个轻量级库，允许与仪表板进行高级交互。  

- **公开指标**可以实时或通过历史记录显示
- **公开操作**可从仪表板远程触发
- **发出异常** 比如异常或关键问题
- **发送事件**以通知任何事项

---

## 安装

使用yarn:

```bash
yarn add pmx
```

使用npm:

```bash
npm install pmx --save
```

### PMX初始化

加载并初始化应用顶层的pmx.

```javascript
const pmx = require('pmx').init({
  errors: true,
  transactions: false
  profiling: true,
});
```

### 模块可能存在的问题：

为了检索http延迟，pmx [包装了](https://github.com/keymetrics/pmx/blob/master/lib/wrapper/simple_http.js)`http`模块。 如果您需要任何模块以修改`http`模块，此包装可以被移除

* `request-promise`：该模块清除节点缓存并需要一个新的干净版本的`http`模块。 为了解决这个问题，在请求`request-promise`以获得正确包装的 `http`模块后再次请求`http`。

可用的选项是：

选项|描述|类型|默认
---|---|---|---|---
错误|启用问题仪表板|boolean|true
事务|启用事物追踪|boolean|false
分析|启用分析|boolean|true
http|启用HTTP路由记录|boolean|true
http_latency||整数|200
http_code||整数|500
ignore_routes|忽略具有给定模式的http路由|[Regexp]|[]
alert_enabled|在自定义指标中启用或禁用警报子字段|boolean|true
custom_probes|自动公开JS循环延迟和HTTP请求作为自定义指标|boolean|true
network|应用级网络监控，显示入站和出站流量|boolean|false
ports|显示您的应用正在侦听的端口|boolean|false

### 应用级网络流量监视/显示使用的端口

初始化PMX时，您可以通过添加选项`network：true`来监控特定应用的网络使用情况。
如果您启动pmx时启用了标志`ports：true`，它将显示您的应用正在侦听哪些端口。

您可以在位于Keymetrics仪表板页面的**Custom Metrics**部分中找到这些指标。

示例：

```
pmx.init({
  [...]
  network : true, // Allows application level network monitoring
  ports   : true  // Displays ports used by the application
});
```

### HTTP延迟分析

通过此功能，您可以在遵从REST的同时监控路由，延迟和代码。

```javascript
pmx.http(); // You must do this BEFORE any require('http')
```

您也可以通过传递正则表达式列表来忽略一些路由。

```javascript
pmx.http({
  http          : true, // (Default: true)
  ignore_routes : [/socket\.io/, /notFound/] // Ignore http routes with this pattern (Default: [])
});
```

这可以选择性通过pmx.init（）来完成。

```javascript
pmx.init({
  http          : true, // (Default: true)
  ignore_routes : [/socket\.io/, /notFound/] // Ignore http routes with this pattern (Default: [])
});
```

---

## 自定义指标

然后，您可以编制自己的指标来跟踪重要的相关信息。 有4种不同的探头可供选择：

- **简单的指标**：可立即读取的值 
    - 例如，监视变量值
- **计数器**：增加或减少的事项
    - 例如，正在处理的下载，用户连接
- **仪表**：以事件/间隔来衡量的事物
    - 例如，每分钟请求一次http服务器
- **直方图**：保留一个统计相关值的库，偏向最后5分钟以探索其分布
    - 例如，监视查询执行到数据库的平均值

### 指标：简单的价值报告

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

### 计数器：顺序值更改

增加或减少的事项。

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

### 仪表：平均计算值

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

#### 选项

**Sample** 选项是费率单位。 默认为 **1** 秒。
**timeframe** 选项是分析事件的时间范围。 默认为 **60**秒.

### 直方图

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

### 常用自定义度量选项

- `name`：探针名称，它将显示在 **Keymetrics** 仪表板上。
- `agg_type`：这个参数是可选的，它可以是`sum`，`max`，`min`，`avg`（默认）或`none`。 它将影响探测数据在 **Keymetrics** 后端聚合的方式。 如果这不相关（如：常量或字符串值），则使用`none`。
- `alert` : 用于 `Meter` 和 `Counter` 探测器。 该参数是可选的。它会创建一个警告对象（见下文）。

### 自定义度量的警报系统

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

#### 选项：

- `mode` : `threshold`, `threshold-avg`, `smart`.
- `value` : 将用于异常检查的值。
- `msg` : 用于例外情况的字符串。
- `action` : **可选的**。 当达到异常级别时触发函数。
- `cmp` : **可选的**。用于有2个参数的异常检查的函数。
- `interval` : **可选的**，`threshold-avg`模式。 监控值的采样长度（默认为180秒）。
- `timeout` : **可选的**，`threshold-avg`模式。 平均值比较开始后的时间（默认30 000毫秒）。

---

## 远程操作

直接从Keymetrics远程触发函数。 这些功能可以在自定义操作部分的主Keymetrics控制面板页面中找到。

### 简单操作

一个简单的操作允许从Keymetrics触发一个函数。 action命令将函数作为参数（在此处答复），并且在作业完成后需要调用该命令。

示例：

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

### 作用域操作

作用域操作是高级的远程操作，也可以由Keymetrics触发。

两个参数传递给函数，数据（从Keymetrics发送的选项数据）和res，允许发出日志数据并结束作用域操作。

示例：

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

## 发射事件

发布活动并获得历史记录和统计数据。
这在Keymetrics **Events** 页面中可用。

```javascript
const pmx = require('pmx')

pmx.emit('user:register', {
  user: 'Alex registered',
  email: 'thorustor@gmail.com'
})
```

---

## 问题报告

PM2链接到Keymetrics后，默认情况下会提醒您任何未捕获的异常。
这些错误可通过Keymetrics **Issue** 页面访问。

### 自定义提醒通知

如果您需要收到任意重要错误的提醒，您可以通过以下编程方式实现：

```javascript
const pmx = require('pmx')

pmx.notify({ success : false })

pmx.notify('This is an error')

pmx.notify(new Error('This is an error'))
```

### 将赘言添加到提醒：加速错误处理

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