---
layout: page
title: 指南 | PM2教程
title-en: Guide | PM2 Documentation
menu: starter
lang: ch
permalink: "/ch/runtime/guide/"
---

# 指南

本指南将向您展示如何安装和使用pm2以将您的应用设置产出。

---

## 术语
 
开始之前，我们在本指南中使用了以下一些术语：


**daemon** 即进程守护，是一个作为后台进程运行的程序。 pm2本质上是一个daemon：总是在后台运行，它会顾及到您所有的进程，使它们运行。另外，您所有以pm2开头的应用都是daemonized,即守护进程的。

**process list** 即进程列表，是注册您所有应用以及选项和环境的地方。该列表仅包含pm2已启动的所有进程。

<div>
  <p align="center">[即刻开始]({{ site.baseurl }}{% link ch/runtime/guide/installation.md %})</p>
</div>
