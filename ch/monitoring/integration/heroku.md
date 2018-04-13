---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Monitor your Node.js app in Heroku 在Heroku中监控您的Node.js应用

In seconds, this tutorial will show you how to monitor a node.js application with `pm2` and Heroku.
只需几秒，本教程将向您展示如何使用`pm2`和Heroku监控node.js应用。

We assume that your app has already been wrapped with pm2. If not, follow the [heroku tutorial](runtime/integration/heroku.md).
我们假设您的应用已被pm2包装了。 如果没有，请按照[heroku 教程](runtime/integration/heroku.md)进行。

---

## Create an account 创建一个账户

Register [here](https://app.keymetrics.io/api/oauth/register).
在[这里](https://app.keymetrics.io/api/oauth/register)注册。

---

## Link with pm2 Monitoring 与pm2 Monitoring关联

In order to connect pm2 to the dashboard, you need to add your public and private keys in the environment.
为了将pm2连接到仪表板，您需要在环境中添加公钥和私钥。

To add your keys, run: 添加您的密钥，运行：

```bash
heroku config:set PM2_PUBLIC_KEY=XXXXXXXXXX PM2_SECRET_KEY=YYYYY
```

?> You can access your keys at the top right of your dashboard
您可以在仪表板的右上方访问您的密钥

---

## Set the server name in pm2 Monitoring 在pm2 Monitoring中设置服务器名称

Set the `PM2_MACHINE_NAME` environment variable to specify a server name:
设置 `PM2_MACHINE_NAME`环境变量以指定服务器名称:

```bash
heroku config:set PM2_MACHINE_NAME=heroku-server
```

?> The default server name is the hostname (`HOST` environment variable) with a few random characters.
默认的服务器名称是带有几个随机字符的主机名（`HOST`环境变量）.

?> Be careful, in case of duplicate hostnames the dashboard will receive data from both instances and flicker.
请注意，如果主机名重复，仪表板将接收来自两个实例和闪烁的数据.

---

## Next step 下一步

Complete your [dashboard configuration](monitoring/guide/configuration.md)
完成您的[仪表板配置](monitoring/guide/configuration.md)

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。