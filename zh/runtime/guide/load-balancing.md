---
layout: page
title: 负载平衡 | 指南 | PM2教程
title-en: Load-Balancing | Guide | PM2 Documentation
menu: starter
lang: zh
section: runtime
---

# 负载平衡（群集模式）

![scale across all cpu's available]({{ site.baseurl }}{% link img/runtime/cluster-mode.png %})

内置的负载平衡器提供联网的Node.js应用（http（s）/ tcp / udp服务器），可在所有可用的CPU上进行缩放，无需修改任何代码。

---

## 运用

用此选项来激活群集模式 `-i <number-instances>`：

```bash
pm2 start app.js -i max
```

`max`表示PM2将自动检测可用CPU的数量并尽可能多地运行进程。

或通过您的生态系统文件进行 (ecosystem.config.js)：

```javascript
module.exports = {
  apps: [{
    script: "app.js",
    instances: "max",
  }]
}
```
 
此 *instances* 选项可作为：
- 一个整数。 这会在特定数量的群集中展开应用。
- 字符串'最大'。 这将应用分散到所有CPU内核中。

?> 您也可以使用一个负整数。 如果有4个核心，`pm2 start -i -1` 将传播3个群集（最大整数）。

---

## 无状态应用

在群集环境中，您首先需要确定您的应用没有内部状态。

内部状态通常是存储在其进程中的一些本地数据。 例如，它可以是一组websocket连接或本地会话内存。 改用Redis或其他数据库来共享进程间的状态。 

查看我们的 [教程]({{ site.baseurl }}{% link zh/runtime/best-practices/stateless-application.md %})，建立您的无状态应用。

---

## 0秒宕机重载

当您使用 `restart`时，pm2杀死并重启该进程，所以在短时间内您将无法使用该服务。

通过重载，pm2会一一重启所有进程，并始终保持至少一个进程正在运行：
```bash
pm2 reload <app_name>
```

或：

```bash
pm2 reload ecosystem.config.js
pm2 reload ecosystem.config.js --only app
```

如果重装系统没有重载您的应用，超时将回退到经典重启。

---

## 正常开机&关机

为了确保所有请求都能在重载中被正确处理，您需要确保您的应用关闭，不留下未答复的请求。

正常关机确保在退出应用并关闭所有外部连接之前处理所有剩余的请求。

通过我们的[教程]({{ site.baseurl }}{% link zh/runtime/best-practices/graceful-shutdown.md %})获得帮助，设置正常关机。

---

## 群集环境变量

`NODE_APP_INSTANCE`环境变量用于区分群集。

例如，如果您只想在一个群集上运行cronjob，可检查 `process.env.NODE_APP_INSTANCE === 0`是否成立。

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

?> 这对报告名称冲突的 `node-config`软件包非常有用，查看此[问题](https://github.com/Unitech/pm2/issues/2045)。

---

## 下一步

[开发工具]({{ site.baseurl }}{% link zh/runtime/guide/development-tools.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。