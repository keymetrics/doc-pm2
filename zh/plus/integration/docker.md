---
layout: page
title: Docker | 集成 | PM2 Plus教程
title: Docker | Integration | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
---

# 在Docker容器中监控您的Node.js应用

只需几秒，本教程将向您展示如何在容器内使用`pm2`监控node.js应用。

我们假设您的应用已被PM2包装了。 如果没有，请参考 [docker教程]({{ site.baseurl }}{% link zh/runtime/integration/docker.md %})。

---

## 创建一个账户

在 [此处](https://id.keymetrics.io/api/oauth/register)注册。

---

## 安装分析器

将其添加到Dockerfile以安装分析器：

```Dockerfile
RUN pm2 install profiler
```

---

## 将您的应用与PM2 Plus关联

为了将PM2连接到仪表板，您需要在环境中添加公钥和私钥.

创建一个.env文件:
```.env
PM2_SECRET_KEY=XXXXX
PM2_PUBLIC_KEY=YYYYY
```
并用`docker run`重启您的容器，并添加`--env-file .env`来加载环境变量。

---

## 在PM2 Plus中设置服务器名称

设置 `PM2_MACHINE_NAME`环境变量以指定服务器名称。将此添加到.env文件:

```.env
PM2_SECRET_KEY=XXXXX
PM2_PUBLIC_KEY=YYYYY
PM2_MACHINE_NAME=docker-server
```

?> 默认的服务器名称是带有随机字符串的主机名（`HOST`环境变量).

?> 请注意，如果主机名重复，仪表板将接收来自两个实例和闪烁的数据.

---

## 下一步

完成您的[仪表板配置]({{ site.baseurl }}{% link zh/plus/guide/configuration.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。


### 使用Keymetrics.io仪表板

[Keymetrics.io](https://keymetrics.io/)是一个建立在PM2之上的监控服务，可以轻松监控和管理应用程序（日志，重启，异常监控等）。 您在Keymetrics上创建了一个Bucket后，您将得到一个公钥和一个密钥。

要使用pm2-runtime启用Keymetrics monitoring，您可以使用CLI选项–public `XXXX`和–secret `YYYY`，或您可以传递环境变量`KEYMETRICS_PUBLIC`和`KEYMETRICS_SECRET`。

从您的Node.js应用项目文件夹启动这些命令：

```bash
$ docker build -t your-app-name .
$ docker run -e KEYMETRICS_PUBLIC=XXXX -e KEYMETRICS_SECRET=YYYY your-app-name
```

确保防火墙允许端口80 (TCP outbound)，443 (HTTPS outbound)和43554 (TCP outbound)。

如果遇到任何问题，请参阅[故障排除](http://docs.keymetrics.io/docs/pages/faq-troubleshooting/#troubleshooting-for-keymetrics-pm2)。