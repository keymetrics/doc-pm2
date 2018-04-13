---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
permalink: "/ch/monitoring/guide/"
---

# Guide 指南

This guide will get your node.js app monitored by pm2 monitoring in minutes.
本指南将在几分钟内让您的node.js应用通过pm2 monitoring进行监控.

### Terminology 术语

Let's explain some terminology we use across this guide:
我们来解释一下在本指南中使用的一些术语:

A **bucket** is an entity that we use to gather multiple servers. A bucket is generally used to gather multiple server from a single project.
一个 **bucket** 是我们用来收集多个服务器的实体。 一个bucket通常用于从一个项目中收集多个服务器.

A **server** is an entity from which pm2 monitoring receive informations from one or more processes.
一个 **server** 是pm2 monitoring从其接收来自一个或多个进程信息的实体.

A **process** is an entity of the process list (`pm2 ls`).
一个 **process** 是进程列表 (`pm2 ls`)的实体。

<p align="center">[Let's start 开始吧](monitoring/guide/installation.md)</p>