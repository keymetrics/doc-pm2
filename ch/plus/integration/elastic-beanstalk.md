---
layout: page
title: Elastic Beanstalk | 集成 | PM2 Plus教程
title-en: Elastic Beanstalk | Integration | PM2 Plus Documentation
menu: starter
lang: ch
section: process-manager
section: plus
---

# 在AWS Elastic Beanstalk中监控您的Node.js应用

只需几秒，本教程将向您展示如何在AWS Elastic Beanstalk环境中使用`pm2`监控Node.js应用。

我们假设您的应用已被PM2包装了。 如果没有，请参考我们的 [AWS Elastic Beanstalk 教程]({{site.baseurl}}{% link ch/process-manager/integration/elastic-beanstalk.md %})进行。

---

## 在PM2上创建一个帐户

您可以在 [这里](https://app.keymetrics.io/api/oauth/register)注册。

---

## 将您的应用与PM2 Plus相关联

为了将PM2连接到仪表板，您需要在环境中添加公钥和私钥。

将您的密钥注入您的eb环境：
```bash
eb setenv PM2_PUBLIC_KEY=YYYYY PM2_SECRET_KEY=XXXXXXXX
```

?> 您可以仪表板右上角访问您的密钥

!> 我们不建议使用生态系统文件将您的密钥设置到您的环境中，如果这样您的生态系统文件可能会被公开。

---

## 在PM2 Plus中设置服务器名称

设置 `PM2_MACHINE_NAME`环境变量以指定服务器名称：

```bash
eb setenv PM2_MACHINE_NAME=aws-eb-server
```

?> 默认的服务器名称是带有随机字符串的主机名（`HOST`环境变量）。

?> 请注意，如果主机名重复，仪表板将接收来自两个实例和闪烁的数据。

---

## 下一步

完成您的 [仪表板配置]({{site.baseurl}}{% link ch/plus/guide/configuration.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。