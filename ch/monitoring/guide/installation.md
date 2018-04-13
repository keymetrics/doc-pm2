---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Installation 安装

We assume that your app have been started with pm2 Runtime. If not, follow the [Quick Start](runtime/quickstart.md) tutorial.
我们假设您的应用已开始使用pm2 Runtime。 如果没有，请参考 [快速入门](runtime/quickstart.md) 教程。

---

## Create an account 创建一个帐户

Register [here](https://app.keymetrics.io/api/oauth/register).
在 [此处](https://app.keymetrics.io/api/oauth/register)注册。

---

## Connect your server to the dashboard 将您的服务器连接到仪表板

Connect your server to your dashboard and start collecting metrics with:
将您的服务器连接到仪表板，并开始收集指标：

```bash
pm2 link <secret> <public>
```

or, if you don't have access to the CLI, add the `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY` environment variables with your public and private keys.
或者，如果您无权访问CLI，请添加使用公钥和私钥设置的 `PM2_PUBLIC_KEY`和 `PM2_SECRET_KEY`环境变量。

?> The secret and public keys can be found at the top right of your dashboard
您可以在仪表板的右上方找到密钥和公钥

### If you are behind a company proxy/firewall 如果您在公司proxy/防火墙的保护中

In order to make Keymetrics works, ensure that this ports are open:
为了使Keymetrics有效，确保这些端口是开放的:
- 80 (TCP outbound)
- 443 (HTTPS outbound)
- 43554 (TCP outbound)

If you also need to whitelist IP adresses, allow these ones:
如果您还需要将IP地址列入白名单，请允许下列地址：
163.172.76.240, 62.210.94.153, 195.154.156.78, 62.210.100.99, 62.210.102.213, 62.4.21.42, 62.4.21.98 and 163.172.20.79.

---

## Install CPU/Memory profiling 安装CPU/内存分析

### g++

You must have `g++` installed: 您必须安装 `g++`：

On Linux, enter `sudo apt-get install build-essential`. 或Linux,输入 `sudo apt-get install build-essential`。

On Mac, enter `g++` in terminal and then follow the instructions. 在Mac上，在终端中输入 `g++`，然后按照说明操作。

### CPU/Memory profiler CPU/内存分析器

Use the pm2 installer :使用pm2安装程序：

```bash
pm2 install profiler
```

Then reload your application to enable the profiler: 然后重载您的应用以启用分析器：

```bash
pm2 reload all
```

---

## You are done 您已完成

Go back to the dashboard, you have now access to realtime metrics of your app.
返回仪表板，您现在已可以访问您应用的实时指标。

![dashboard view]({{site.baseurl}}/img/monitoring/unified.png)

---

## Next steps 下一步

[Configuration 配置]({{site.baseurl}}/ch/monitoring/guide/configuration)

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support