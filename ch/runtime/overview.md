# Overview 概述

Why use pm2 ? At the end of this overview, you will better understand the benefits of using pm2 as a process manager.
为什么使用pm2? 看完这篇介绍，您将更好地理解使用pm2作为流程管理器的好处。

---

## Forever Alive 永存

Once started, your app is forever alive, auto-restarting across app crashes and machine restarts.一旦开始使用，您的应用将永存，在应用崩溃和机器重启时自启动。

This as simple as running:这与运行一样简单：
```bash
pm2 start app.js
```

---

## Process Management 流程管理

All your applications are daemonized i.e. run continuously in the background.您所有的应用都被守护进程，例如，在后台持续运行。

pm2 creates a list of processes, that you can access with:pm2会创建一个您可以访问的进程列表：

```bash
pm2 ls
```

![pm2 listing pm2 列表]({{site.baseurl}}/runtime/overview/pm2ls.png)

Manage your process list with `pm2 start` and `pm2 delete`。
用`pm2 start` 和 `pm2 delete` 管理您的进程列表。

Once added to your process list, manage a process with `pm2 start`, `pm2 stop`, `pm2 restart`.
一旦添加到您的进程列表中，使用 `pm2 start` ，`pm2 stop`，`pm2 restart`来管理进程。

---

## Logs Management 日志管理

All app logs are saved into the hard disk of your servers into 所有的应用日志都会保存到您的服务器硬盘中`~/.pm2/logs/`.

```bash
pm2 logs
```

---

## Zero-config Load-Balancer 零配置负载均衡器

pm2 scales up your app by creating multiple child processes that all share the same server ports. Doing this, you can restart your app with zero-seconds downtimes.pm2通过创建多个共享相同服务器端口的子进程来扩展您的应用。这样您可以在停机时间为零的情况下重启您的应用。

Start clusterize your app with:开始集群化您的应用：
```bash
pm2 start -i max
```

---

## In-terminal monitoring 终端内监控

Monitor your app in the terminal to check your app health (CPU usage, memory used, request/min and more):
在终端中监控您的应用以检查您的应用运行状况（CPU使用情况，内存使用，请求/分钟以及更多）：

```bash
pm2 monit
```

![local monitoring with pm2 用pm2进行本地监测]({{site.baseurl}}/runtime/overview/monit.png)

---

## Easy deploy with SSH 使用SSH轻松部署

Automate your deployment and don't ssh in all your servers one by one.
自动完成部署，不需一对一的ssh服务器连接。

```bash
pm2 deploy
```

---

## Next steps 下一步

[Quick Start 快速开始]({{site.baseurl}}/runtime/quick-start/)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。



