---
layout: page
title: Heroku | 集成 | PM2 Plus教程
title-en: Heroku | Integration | PM2 Plus Documentation
menu: starter
lang: ch
section: process-manager
section: plus
---

# 在Heroku中监控您的Node.js应用

只需几秒，本教程将向您展示如何使用`pm2`和Heroku监控node.js应用。

我们假设您的应用已被PM2包装了。 如果没有，请按照[heroku教程]({{ site.baseurl }}{% link ch/process-manager/integration/heroku.md %})进行。

---

## 创建一个账户

在[这里](https://app.keymetrics.io/api/oauth/register)注册。

---

## 与PM2 Plus关联

为了将PM2连接到仪表板，您需要在环境中添加公钥和私钥。

用此添加您的密钥：

```bash
heroku config:set PM2_PUBLIC_KEY=XXXXXXXXXX PM2_SECRET_KEY=YYYYY
```

?> 您可以在仪表板的右上方访问您的密钥

---

## 在PM2 Plus中设置服务器名称

设置 `PM2_MACHINE_NAME`环境变量以指定服务器名称:

```bash
heroku config:set PM2_MACHINE_NAME=heroku-server
```

?> 默认的服务器名称是带有几个随机字符的主机名（`HOST`环境变量）.

?> 请注意，如果主机名重复，仪表板将接收来自两个实例和闪烁的数据.

---

## 下一步

完成您的[仪表板配置]({{ site.baseurl }}{% link ch/plus/guide/configuration.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。