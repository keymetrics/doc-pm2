---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Guide 指南

This guide will show you how to install and use pm2 to set up your application to production.
本指南将向您展示如何安装和使用pm2以将您的应用设置产出。

---

## Terminology 术语

Before starting, some terminology we use across this guide: 
开始之前，我们在本指南中使用了以下一些术语：

A **daemon** is a program that is run as a background process. pm2 in essence is a daemon: always alive in the background, it takes care of all your processes, keeping them alive. Also, all your applications started with pm2 are daemonized.
**daemon** 即进程守护，是一个作为后台进程运行的程序。 pm2本质上是一个daemon：总是在后台运行，它会顾及到您所有的进程，使它们运行。另外，您所有以pm2开头的应用都是daemonized,即守护进程的。

The **process list** is where all your applications along with options and environment are registered. This list simply contains all the processes pm2 has started.
**process list** 即进程列表，是注册您所有应用以及选项和环境的地方。该列表仅包含pm2已启动的所有进程。

<p align="center">[Let's start 即刻开始](runtime/guide/installation.md)</p>
