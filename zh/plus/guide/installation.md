---
layout: page
title: 安装 | 指南 | PM2 Plus教程
title-en: Installation | Guide | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
---

# 安装

我们假设您的应用已开始使用PM2 runtime。 如果没有，请参考 [快速入门]({{ site.baseurl }}{% link en/runtime/quick-start.md %}) 教程。

## 创建一个帐户

在 [此处](https://id.keymetrics.io/api/oauth/register)注册。

## 将您的服务器连接到仪表板

将您的服务器连接到仪表板，并开始收集指标：

```bash
pm2 link <secret> <public>
```

或者，如果您无权访问CLI，请添加使用公钥和私钥设置的 `PM2_PUBLIC_KEY`和 `PM2_SECRET_KEY`环境变量。

 您可以在仪表板的右上方找到密钥和公钥
{: .tip}

### 如果您在公司proxy/防火墙的保护中

为了使Keymetrics正常工作，请确保这些端口是开放的:
- 80 (TCP outbound)
- 443 (HTTPS outbound)
- 43554 (TCP outbound)

如果您还需要将IP地址列入白名单，请允许下列地址：
163.172.76.240, 62.210.94.153, 195.154.156.78, 62.210.100.99, 62.210.102.213, 62.4.21.42, 62.4.21.98 and 163.172.20.79.

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

## 您已完成

返回仪表板，您现在已可以访问您应用的实时指标。

![仪表板视图]({{ site.baseurl }}{% link img/plus/unified.png %})

## 下一步

[配置]({{ site.baseurl }}{% link zh/plus/guide/configuration.md %})
{: .btn-stylized}

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以查看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support