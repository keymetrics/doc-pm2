---
layout: page
title: 快速入门 | PM2教程
title-en: Quick Start | PM2 Documentation
menu: starter
lang: ch
---

# 快速入门

只需几秒，本快速入门教程将向您展示如何运用pm2来作用于node.js应用。

---

## 安装

使用yarn:
```bash
yarn global add pm2
```

使用npm:
```bash
npm install pm2 -g
```

在debian操作系统下，使用安装脚本:

```bash
apt update && apt install sudo curl && curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
```

使用docker，请遵循[本教程](process-manager/integration/docker.md)。

### CLI自动完成

我们建议您安装CLI自动完成：

```bash
pm2 completion install
```

---

## 管理多个进程

pm2保存您的进程列表，以便可以轻松启动，重启和停止它们。

### 进程列表

用仅仅几步命令管理您的进程列表：

```bash
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```

?>默认进程名称是没有 `.js` 的文件名(例如: `app` for `app.js`). 使用 `--name`或 `-n` 来更改。

### 常规

设置您的进程列表后，每天只需使用进程名称来工作。

```bash
# stop the process (kill the process but keep it in the process list)
pm2 stop app

# start the process
pm2 start app

# both stop and start
pm2 restart app
```

您也可以设置一个 [启动脚本](process-manager/guide/installation?id=install-a-startup-script), 以便在机器重启时自启动您的进程列表。

---

## 访问您的日志

使用`pm2 logs app`**实时**访问您的日志。

在 `~/.pm2/logs`文件夹中查看日志**历史**文件。

---

## 群集化

群集模式可将您的应用扩展到所有可用的CPU，无需修改任何代码。

?>在使用负载平衡器之前，请确保您的应用是无状态的，这意味着没有本地数据存储在进程中（会话/ WebSocket连接，会话内存以及一些相关内容）。

要以群集模式启动，请传递-i选项，然后传递您所需的群集数：

```bash
pm2 start app.js -i 4
```

或者，自动检测可用的CPU数量：

```bash
pm2 start app.js -i max
```

使用重载而不是重启来实现无中断式重载：

```bash
pm2 reload app
```

---

## 使用CLI进行更多操作

使用制表符，您可以使用自动完成功能：

![pm2自动完成]({{site.baseurl}}/img/process-manager/autocomplete.png)

使用 `--help`获得更多关于指令的信息：

![pm2帮助]({{site.baseurl}}/img/process-manager/help.png)

---

## 下一步

[生态系统文件]({{ site.baseurl }}{% link ch/process-manager/guide/ecosystem-file.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。


