---
layout: page
title: 快速入门 | PM2 Plus教程
title-en: Quick Start | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
---

# 快速入门

只需几秒，本快速入门教程将向您展示如何开始使用PM2监控您的node.js应用。

我们假设您的应用已启动或使用了PM2包装。 如果没有，请按照[快速入门]({{ site.baseurl }}{% link zh/runtime/quick-start.md %}) 教程进行。

---

## 创建一个帐户

在 [此处](https://id.keymetrics.io/api/oauth/register)注册。

---

## 将您的服务器连接到仪表板

将您的服务器连接到仪表板并开始收集指标：

```bash
pm2 link <secret> <public>
```

或者，如果您无权访问CLI，请添加使用公钥和私钥设置的 `PM2_PUBLIC_KEY`和 `PM2_SECRET_KEY`环境变量。

?> 您可以在仪表板的右上方找到密钥和公钥

---

## 安装CPU/内存分析

### g++

您必须安装 `g++`：

在Linux上,输入 `sudo apt-get install build-essential`。

在Mac上，在终端中输入 `g++`，然后按照说明操作。

### CPU/内存分析器

使用PM2安装程序：

```bash
pm2 install profiler
```

然后重载您的应用以启用分析器：

```bash
pm2 reload all
```

---

## 您已完成

返回仪表板，您现在已可以访问您应用的实时指标。

![仪表板视图]({{ site.baseurl }}{% link img/plus/unified.png %})

---

## 下一步

[配置]({{ site.baseurl }}{% link zh/plus/guide/configuration.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以查看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support



