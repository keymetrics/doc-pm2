---
layout: page
title: 进程管理 | 指南 | PM2教程
title-en: Process Management | Guide | PM2 Documentation
menu: starter
lang: zh
section: runtime
---

# 进程管理

pm2是一个保存在后台的进程，一个守护进程，负责处理您所有正在运行的进程。

我们将学习如何使用pm2管理进程，并探索一个关键概念：进程列表。

---

## 进程列表

进程列表是所有正在运行的应用注册的地方。

用几条命令管理您的进程列表：

```bash
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```

当您使用 `pm2 start app.js`时， 两项操作会被执行:
- 该应用在pm2的进程列表中注册
- 该应用在后台启动.

?> 进程列表中的默认名称是没有扩展名的脚本名称。使用`--name`或 `-n` 来改变。

---

## 常规

设置好您的进程列表后，每天的操作都会与进程名称一起完成。

```bash
# kill the process but keep it in the process list
pm2 stop app

# start the process again
pm2 start app

# both stop and start
pm2 restart app
```

可以一次性指定多个应用：
```bash
pm2 restart app1 app2 app3
```

或者，用正则表达式来缩短：
```bash
pm2 restart /app/
```

---

## 保存您的进程列表

您可以由以下方式保存和重新生成您的进程列表：

```bash
# save your list in hard disk memory
pm2 save

# resurrect your list previously saved
pm2 resurrect
```

?> 您的进程列表保存在 `$HOME/.pm2/dump.pm2`。

接着您可以设置一个 [启动脚本]({{ site.baseurl }}{% link zh/runtime/guide/installation.md %})，通过机器重启来自启动您的进程列表。

---

## 管理任意应用类型

pm2与其他编程语言兼容，运用这种等值关系：

```json
{
  ".sh": "bash",
  ".py": "python",
  ".rb": "ruby",
  ".coffee": "coffee",
  ".php": "php",
  ".pl": "perl",
  ".js": "node"
}
```

?> 如果没有扩展名，该应用将作为二进制文件启动。

比如要在python中启动脚本，请使用：

```bash
pm2 start echo.py
```

如果您想指定解释器的路径，请在您的生态系统文件中操作：

```javascript
module.exports = {
  "apps" : [{
    name: "script",
    script: "./script.py",
    interpreter: "/usr/bin/python",
  }]
}
```

---

## 本地监控

![pm2本地监控]({{ site.baseurl }}{% link img/runtime/monit.png %})

本地监控工具可让您了解每个进程的CPU使用情况，内存使用情况，环路延迟或请求/分钟：

```bash
pm2 monit
```

---

## 下一步

[日志管理]({{ site.baseurl }}{% link zh/runtime/guide/log-management.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。