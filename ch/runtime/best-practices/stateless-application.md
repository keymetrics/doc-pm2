---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Stateless Application 无状态应用

A stateless application has no local data stored in the process. For example, sessions/websocket connections, session-memory and related.
一个无状态应用没有存储过程中的本地数据。 例如，会话/ websocket连接，会话内存和其他相关。

You must use Redis, Mongo or other databases to share all states between processes.
您必须使用Redis，Mongo或其他数据库来共享进程之间的所有状态。

A useful resource on how to write efficient, production ready stateless application is The Twelve Factor Application manifesto: https://12factor.net/
关于如何编写高效的、生产就绪的无状态应用，这里有个关于十二因素应用声明的有用资源：https://12factor.net/