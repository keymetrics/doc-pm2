---
layout: page
title: 无状态应用 | 生产最佳实践 | PM2教程
title-en: Stateless Application | Best Practices | PM2 Documentation
menu: starter
lang: ch
section: process-manager
---

# 无状态应用

一个无状态应用没有存储进程中的本地数据。 例如，会话/websocket连接，会话内存和其他相关。

您必须使用Redis，Mongo或其他数据库来共享进程之间的所有状态。

关于如何编写高效的、生产就绪的无状态应用，这里有个关于十二因素应用宣言的有用资源：https://12factor.net/