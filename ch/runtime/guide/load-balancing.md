---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Load-Balancing (cluster mode) 负载平衡（群集模式）

The built-in load-balancer provides networked Node.js applications (http(s)/tcp/udp server) to be scaled accross all CPUs available, without any code modifications.
此内部负载平衡提供在线node.js应用运行在所有可行CPU内，不需要任何代码更改。

![http://i.imgur.com/kTAowsL.png](http://i.imgur.com/kTAowsL.png)

---

## Usage 运用

To enable the cluster mode, just pass the `-i <number-instances>` option:
用此选项来激活群集模式 `-i <number-instances>`：

```bash
pm2 start app.js -i max
```

`max` means that PM2 will auto detect the number of available CPUs and run as many processes as possible
`max`表示PM2将自动检测可用CPU的数量并尽可能多地运行进程。

Or via your ecosystem file (ecosystem.config.js): 或通过您的生态系统文件 (ecosystem.config.js)：

```javascript
module.exports = {
  apps: [{
    script: "app.js",
    instances: "max",
  }]
}
```

The *instances* option can be: 
此 *instances* 选项可作为：
- an Integer. This spreads the app across a specific number of clusters.
- the String 'max'. This spreads the app across all CPU cores.
- 一个整数。 这会在特定数量的群集中展开应用。
- 字符串'最大'。 这将应用分散到所有CPU内核中。

?> You can also use a negative integer. If 4 cores, `pm2 start -i -1` will spread 3 clusters (max - integer).
您也可以使用负整数。 如果4个核心，`pm2 start -i -1` 将传播3个群集（最大整数）。

---

## Stateless Application 无状态应用

In the context of clustering, you first need to be sure that your application has no internal state.
在群集环境中，您首先需要确定您的应用没有内部状态。

An internal state is typically some local data stored into its processes. It can be an array of websocket connections or a local session-memory for example. Use Redis or other databases instead to share the states between processes.
内部状态通常是存储在其进程中的一些本地数据。 例如，它可以是一组websocket连接或本地会话内存。 改用Redis或其他数据库来共享进程间的状态。 

Follow our [tutorial](runtime/production-best-practices/stateless-application.md) to make your app stateless.
查看我们的 [教程](runtime/production-best-practices/stateless-application.md)，建立您的无状态应用。

---

## 0 second downtime reload 0秒宕机重载

When you use `restart`, pm2 kills and restarts the process so there is a short period of time during which the service is unavailable.
当您使用 `restart`时，pm2杀死并重启该进程，所以在短时间内您将无法使用该服务。

With reload, pm2 restarts all instances one by one always kepping at least one process running:
通过重载，pm2会重启所有进程，并始终保持至少一个进程正在运行：
```bash
pm2 reload <app_name>
```

Or: 或：

```bash
pm2 reload ecosystem.config.js
pm2 reload ecosystem.config.js --only app
```

If the reload system hasn't managed to reload your application, a timeout will fallback to a classic restart.
如果重装系统没有重载应用，超时将回退到经典重启。

---

## Graceful Start & Shutdown 正常开机&关机

To be sure that all requests are properly handled in a reload, you need to be sure that your application shutdown, not leaving unanswered requests.
为了确保所有请求都能在重载中被正确处理，您需要确保您的应用关闭，不留下未答复的请求。

A graceful shutdown makes sure to handle all remaining queries before exiting the application and closes all external connections.
正常关机确保在退出应用并关闭所有外部连接之前处理所有剩余的查询。

Get help to setup graceful shutdown with our [tutorial](runtime/production-best-practices/graceful.md).
通过我们的[教程](runtime/production-best-practices/graceful.md)获得帮助，设置正常关机。

---

## Cluster environment variable 群集环境变量

The `NODE_APP_INSTANCE` environment variable is used to make a difference between cluster.
`NODE_APP_INSTANCE`环境变量用于区分群集。

For example, if you want to run a cronjob only on one cluster, you can check if `process.env.NODE_APP_INSTANCE === 0`. 
例如，如果您只想在一个群集上运行cronjob，可检查 `process.env.NODE_APP_INSTANCE === 0`。

This variable can be renamed in the ecosystem file: 
该变量可在生态系统文件中重命名：

```javascript
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    instance_var: "INSTANCE_ID",
  }]
}
```

?> This is useful with the `node-config` package where name conflicts have been reported, check the [issue](https://github.com/Unitech/pm2/issues/2045). 
这对报告名称冲突的 `node-config`软件包非常有用，查看此[问题](https://github.com/Unitech/pm2/issues/2045)。

---

## Next steps 下一步

[Development Tools 开发工具]({{site.baseurl}}/ch/runtime/guide/development-tools)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。