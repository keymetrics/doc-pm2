# Quick Start 快速开始

In seconds, this Quick Start tutorial will show you how to set up to production a node.js application with pm2.
只需几秒，本快速入门教程将向您展示如何运用pm2来设置产出node.js应用.

---

## Installation 安装

With yarn: 使用yarn:
```bash
yarn global add pm2
```

With npm: 使用pm:
```bash
npm install pm2 -g
```

With debian, use the install script: 在debian操作系统下，使用安装脚本:

```bash
apt update && apt install sudo curl && curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
```

With docker, follow this [tutorial](runtime/integration/docker.md). 使用docker，请遵循[本教程](runtime/integration/docker.md)。

### CLI autocompletion CLI自动完成

We recommend you to install the CLI autocompletion: 我们建议您安装CLI自动完成：

```bash
pm2 completion install
```

---

## Manage multiple processes 管理多个进程

pm2 keeps a list of your processes to be able to start, restart and stop them easily.
pm2保存您的进程列表，以便能够轻松启动，重启和停止它们。

### Process list 进程列表

Manage your process list with few commands: 用仅仅几步命令管理您的进程列表：

```bash
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```

?> Default process name is the filename without `.js` (eg: `app` for `app.js`). Use `--name`or `-n` to change.
默认进程名称是没有 `.js` 的文件名(例如: `app` for `app.js`). 使用 `--name`或 `-n` 来改变。

### Routine 常规

Once setup your process list, every day actions only use the process name.
一旦设置了您的进程列表，每天只需使用进程名称来工作。

```bash
# stop the process (kill the process but keep it in the process list)
pm2 stop app

# start the process
pm2 start app

# both stop and start
pm2 restart app
```

You can also setup a [startup script](runtime/guide/installation?id=install-a-startup-script), to automatically start your process list at machine restart.
您也可以设置一个 [启动脚本](runtime/guide/installation?id=install-a-startup-script), 以便在机器重启时自启动您的进程列表。

---

## Access your logs 访问您的日志

Access your logs in **realtime** with `pm2 logs app`.

Consult your logs **history** files in the `~/.pm2/logs` folder.

---

## Clusterize 群集化

The cluster mode scales your app accross all CPUs available, without any code modifications.
群集模式可将您的应用扩展到所有可用的CPU，无需修改任何代码。

?> Before using the load balancer, make sure your application is stateless, meaning that no local data is stored in the process (sessions/websocket connections, session-memory and related).
在使用负载平衡器之前，请确保您的应用是无状态的，这意味着没有本地数据存储在进程中（会话/ WebSocket连接，会话内存以及一些相关内容）。

To start in cluster mode, pass the -i option followed by the number of clusters that you want:
要以群集模式启动，请传递-i选项，然后传递所需的群集数：

```bash
pm2 start app.js -i 4
```

or, to automatically detect number of CPUs available:
或者，自动检测可用的CPU数量：

```bash
pm2 start app.js -i max
```

Use reload instead of restart for 0-second-downtime reloads:
使用重载而不是重启来进行无中断式重载：

```bash
pm2 reload app
```

---

## Do more with the CLI 使用CLI进行更多操作

Using tabulation, you can use the autocompletion:
使用制表符，您可以使用自动完成功能：

![pm2 listing](overview/autocomplete.png)

Use `--help`to get more information on a command:
使用 `--help`获得更多关于指令的信息：

![pm2 listing](overview/help.png)

---

## Next steps 下一步

[Ecosystem File 生态系统文件](runtime/guide/ecosystem-file.md) 

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。


