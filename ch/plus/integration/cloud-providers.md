---
layout: page
title: 使用云供应商 | 集成 | PM2 Plus教程
title-en: Cloud Providers | Integration | PM2 Plus Documentation
menu: starter
lang: ch
section: process-manager
section: plus
---

# 在云供应商中监控您的Node.js应用

仅需几秒，本教程将向您展示如何使用`pm2`和云供应商监控node.js应用。

我们假设您的应用已被PM2包装了。 如果没有，请按照[云供应商教程]({{site.baseurl}}{% link ch/process-manager/integration/cloud-providers.md %})进行。

---

## 创建一个账户

在[此处](https://app.keymetrics.io/api/oauth/register)注册。

---

## 将您的应用与PM2 Plus关联。

为了将PM2连接到仪表板，您需要在环境中添加公钥和私钥。

```bash
export PM2_PUBLIC_KEY="YYYYY"
export PM2_SECRET_KEY="XXXXXXXXX"
pm2 update
```

---

## 在PM2 Plus中设置服务器名称

设置`PM2_MACHINE_NAME`环境变量以指定服务器名称:

```bash
export PM2_MACHINE_NAME="my-cloud-provider-server"
```

?> 默认的服务器名称是带有随机字符串的主机名（`HOST`环境变量）.

?> 请注意，如果主机名重复，仪表板将接收来自两个实例和闪烁的数据.

---

## 下一步

完成您的[仪表板配置]({{site.baseurl}}{% link ch/plus/guide/configuration.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。