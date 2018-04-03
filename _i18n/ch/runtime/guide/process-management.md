# Process management 进程管理

pm2 is a process kept in the background, a daemon, that takes care of all your running processes.
pm2是一个保存在后台的进程，一个守护进程，负责处理您所有正在运行的进程。

We'll learn how to manage process with pm2 and discover a key concept : the process list.
我们将学习如何使用pm2管理进程，并探索一个关键概念：进程列表。

---

## The process list 进程列表

The process list is where all running applications are registered.
进程列表是所有正在运行的应用注册的地方

Manage your process list in a few commands:
用几条命令管理您的进程列表：

```bash
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```

When you use `pm2 start app.js`, two actions are performed:
- the app is registered in the process list of pm2
- the app is started in the background.

当您使用 `pm2 start app.js`时， 两项活动会被执行:
- 该应用在pm2的进程列表中注册
- 该应用在后台启动.

?> Default name in the process list is the name of the script without his extension. Use `--name`or `-n` to change.
进程列表中的默认名称是没有扩展名的脚本名称。使用`--name`或 `-n` 来改变。

---

## Routine 常规

Once setup your process list, every day actions are done with the process name.
一旦设置好您的进程列表，每天的操作都会与流程名称一起完成。

```bash
# kill the process but keep it in the process list
pm2 stop app

# start the process again
pm2 start app

# both stop and start
pm2 restart app
```

Multiple app can be specified at once:
可以一次指定多个应用：
```bash
pm2 restart app1 app2 app3
```

Or, shorter with a regexp:
或者，用正则表达式来缩短：
```bash
pm2 restart /app/
```

---

## Save your process list 保存您的进程列表

You can save and resurrect your process list with:
您可以使用保存和重新生成您的进程列表：

```bash
# save your list in hard disk memory
pm2 save

# resurrect your list previously saved
pm2 resurrect
```

?> Your process list is saved into `$HOME/.pm2/dump.pm2`.
您的进程列表保存在 `$HOME/.pm2/dump.pm2`。

You can then setup a [startup script](runtime/guide/installation?id=install-a-startup-script), to automatically start your process list through machine restarts.
接着您可以设置一个 [启动脚本](runtime/guide/installation?id=install-a-startup-script)，通过机器重启来自启动您的进程列表。

---

## Manage any application type 管理任意应用类型

pm2 is compatible with other programming languages, using this equivalence:
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

?> Without extension, the app is started as a binary file.
如果没有扩展名，该应用将作为二进制文件启动。

To start a script in python for example, use:
要在python中启动脚本，请使用：

```bash
pm2 start echo.py
```

If you want to specify the path of an interpreter, specify it in your ecosystem file:
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

## Local Monitoring 本地监控

The local monitoring tool get you insight about CPU usage, memory usage, loop delay or request/min for each process:
本地监控工具可让您了解每个进程的CPU使用情况，内存使用情况，环路延迟或请求/分钟：

```bash
pm2 monit
```

![local monitoring with pm2](../overview/monit.png)

---

## Next step 下一步

[Log Management](runtime/guide/log-management.md)
[日志管理](runtime/guide/log-management.md)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。