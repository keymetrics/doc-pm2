---
layout: page
title: 概述 | PM2教程
title-en: Overview | PM2 Documentation
menu: starter
lang: ch
section: process-manager
redirect_from: "/ch"
---

# 概述

为什么使用pm2? 看完这篇介绍，您将更好地理解使用pm2作为流程管理器的好处。

---

## 持久性

一旦开始使用，您的应用将永存，在崩溃和机器重启时自启动。

这与运行一样简单：
```bash
pm2 start app.js
```

---

## 流程管理

您所有的应用都被守护进程，例如，在后台持续运行。

pm2会创建一个您可以访问的进程列表：

```bash
pm2 ls
```

![pm2 listing]({{ site.baseurl }}{% link img/process-manager/pm2ls.png %})

用`pm2 start` 和 `pm2 delete` 管理您的进程列表。

在添加到您的进程列表中后，使用 `pm2 start` ，`pm2 stop`，`pm2 restart`来管理进程。

---

## 日志管理

所有的应用日志都会保存到您的服务器硬盘中`~/.pm2/logs/`。

```bash
pm2 logs
```

---

## 零配置负载均衡器

pm2通过创建多个共享相同服务器端口的子进程来扩展您的应用。这样您可以在停机时间为零的情况下重启您的应用。

开始群集化您的应用：
```bash
pm2 start -i max
```

---

## 终端内监控

在终端中监控您的应用以检查您的应用运行状况（CPU使用情况，内存使用，请求/分钟以及更多）：

```bash
pm2 monit
```

![local monitoring with pm2]({{ site.baseurl }}{% link img/process-manager/monit.png %})

---

## 使用SSH轻松部署

自动完成部署，不需一对一的ssh服务器连接。

```bash
pm2 deploy
```

---

## 下一步

[快速开始]({{ site.baseurl }}{% link ch/process-manager/quick-start.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。
