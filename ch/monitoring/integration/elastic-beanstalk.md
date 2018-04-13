---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Monitor your Node.js app in AWS Elastic Beanstalk 在AWS Elastic Beanstalk中监控您的Node.js应用

In seconds, this tutorial will show you how to monitor a Node.js application with `pm2` in an AWS Elastic Beanstalk environment.
只需几秒，本教程将向您展示如何在AWS Elastic Beanstalk环境中使用`pm2`监控Node.js应用。

We assume that your app has already been wrapped with pm2. If not, follow our [AWS Elastic Beanstalk tutorial](runtime/integration/beanstalk.md).
我们假设您的应用已经被pm2包装了。 如果没有，请参考我们的 [AWS Elastic Beanstalk 教程](runtime/integration/beanstalk.md)进行。

---

## Create an account on pm2 在pm2上创建一个帐户

You can register [here](https://app.keymetrics.io/api/oauth/register).
您可以在 [这里](https://app.keymetrics.io/api/oauth/register)注册。

---

## Link your app with pm2 Monitoring 将您的应用与pm2 Monitoring相关联

In order to connect pm2 to the dashboard, you need to add your public and private keys in the environment.
为了将pm2连接到仪表板，您需要在环境中添加公钥和私钥。

Inject your keys into your eb environment:
将您的密钥注入您的eb环境：
```bash
eb setenv PM2_PUBLIC_KEY=YYYYY PM2_SECRET_KEY=XXXXXXXX
```

?> You can access your keys at the top right of your dashboard
您可以仪表板右上角访问您的密钥

!> We unadvise to use the ecosystem file to set your keys into your environment, doing so your ecosystem file can stay public
我们不建议使用生态系统文件将您的密钥设置到您的环境中，如果这样您的生态系统文件可能会被公开。

---

## Set the server name in pm2 Monitoring 在pm2 Monitoring中设置服务器名称

Set the `PM2_MACHINE_NAME` environment variable to specify a server name:
设置 `PM2_MACHINE_NAME`环境变量以指定服务器名称：

```bash
eb setenv PM2_MACHINE_NAME=aws-eb-server
```

?> The default server name is the hostname (`HOST` environment variable) with a random string.
默认的服务器名称是带有随机字符串的主机名（`HOST`环境变量）。

?> Be careful, in case of duplicate hostnames the dashboard will receive data from both instances and flicker.
请注意，如果主机名重复，仪表板将接收来自两个实例和闪烁的数据。

---

## Next step 下一步

Complete your [dashboard configuration](monitoring/guide/configuration.md)
完成您的 [仪表板配置](monitoring/guide/configuration.md)

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。