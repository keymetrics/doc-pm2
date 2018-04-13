---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Monitor your Node.js app in a Docker container 在Docker容器中监控您的Node.js应用

In seconds, this tutorial will show you how to monitor a node.js application with `pm2` inside a container.
只需几秒，本教程将向您展示如何在容器内使用`pm2`监控node.js应用。

We assume that your app has already been wrapped with pm2. If not, follow the [docker tutorial](runtime/integration/docker.md).
我们假设您的应用已经被pm2包装了。 如果没有，请参考 [docker 教程](runtime/integration/docker.md)。

---

## Create an account 创建一个账户

Register [here](https://app.keymetrics.io/api/oauth/register).
在 [此处](https://app.keymetrics.io/api/oauth/register)注册。

---

## Install the profiler 安装分析器

Add this to your Dockerfile to install the profiler:
将其添加到Dockerfile以安装分析器：

```Dockerfile
RUN pm2 install profiler
```

---

## Link your app with pm2 Monitoring 将您的应用与pm2 Monitoring关联

In order to connect pm2 to the dashboard, you need to add your public and private keys in the environment.
为了将pm2连接到仪表板，您需要在环境中添加公钥和私钥.

Create a .env file with: 创建一个.env文件:
```.env
PM2_SECRET_KEY=XXXXX
PM2_PUBLIC_KEY=YYYYY
```
and restart your container with `docker run`adding `--env-file .env` to load the environment variables.
并用`docker run`重启您的容器，并添加`--env-file .env`来加载环境变量。

---

## Set the server name in pm2 Monitoring 在pm2 Monitoring中设置服务器名称

Set the `PM2_MACHINE_NAME` environment variable to specify a server nam. Add this to the .env file:
设置 `PM2_MACHINE_NAME`环境变量以指定服务器nam。 将此添加到.env文件:

```.env
PM2_SECRET_KEY=XXXXX
PM2_PUBLIC_KEY=YYYYY
PM2_MACHINE_NAME=docker-server
```

?> The default server name is the hostname (`HOST` environment variable) with a random string.
默认的服务器名称是带有随机字符串的主机名（`HOST`环境变量).

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


### Use Keymetrics.io dashboard 使用Keymetrics.io仪表板

[Keymetrics.io](https://keymetrics.io/) is a monitoring service built on top of PM2 that allows to monitor and manage applications easily (logs, restart, exceptions monitoring, etc...). Once you created a Bucket on Keymetrics you will get a public and a secret key.
[Keymetrics.io](https://keymetrics.io/)是一个建立在PM2之上的监控服务，可以轻松监控和管理应用程序（日志，重启，异常监控等）。 一旦您在Keymetrics上创建了一个Bucket，您将得到一个公钥和一个密钥。

To enable Keymetrics monitoring with pm2-runtime, you can whether use the CLI option –public `XXXX` and –secret `YYYY` or you can pass the environment variables `KEYMETRICS_PUBLIC` and `KEYMETRICS_SECRET`.
要使用pm2-runtime启用Keymetrics monitoring，您可以使用CLI选项–public `XXXX`和–secret `YYYY`，或者您可以传递环境变量`KEYMETRICS_PUBLIC`和`KEYMETRICS_SECRET`。

From your Node.js app project folder launch those commands:
从您的Node.js应用项目文件夹启动这些命令：

```bash
$ docker build -t your-app-name .
$ docker run -e KEYMETRICS_PUBLIC=XXXX -e KEYMETRICS_SECRET=YYYY your-app-name
```

Make sure that the ports 80 (TCP outbound), 443 (HTTPS outbound) and 43554 (TCP outbound) are allowed on your firewall.
确保防火墙允许端口80 (TCP outbound)，443 (HTTPS outbound)和43554 (TCP outbound)。

See the [troubleshooting](http://docs.keymetrics.io/docs/pages/faq-troubleshooting/#troubleshooting-for-keymetrics-pm2) in case you encounter any problem.
如果遇到任何问题，请参阅[故障排除](http://docs.keymetrics.io/docs/pages/faq-troubleshooting/#troubleshooting-for-keymetrics-pm2)。