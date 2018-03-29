# Log management 日志管理

Logs are available at realtime and are saved into your hard disk.
日志可以实时获取并保存到您硬盘中。

The way your logs are formatted, the way log files are created: everything can be customized.
日志格式化的方式，创建日志文件的方式：所有内容都可以自定义。

---

## Access the logs 访问日志

### Real-time logs 实时日志

```bash
# all apps logs
pm2 logs

# only app logs
pm2 logs app
```

### Log files 日志文件

By default, all logs are saved into `$HOME/.pm2/logs`.
默认情况下，所有日志都被保存到 `$HOME/.pm2/logs`。

You can empty all application logs with:
您可以以此清空所有应用日志：

```bash
pm2 flush
```

---

## Log files configuration 日志文件配置

You can specify a custom location for your logs.
您可以为日志指定自定义位置。

```javascript
module.exports = {
  apps: [{
      name: 'app',
      script: 'app.js',
      output: './out.log',
      error: './error.log',
	    log: './combined.outerr.log',
    }]
}
```

- `output` is only standard output (console.log)
- `error` is only error output (console.error)
- `log` combines `output` and `error`, disabled by default
- `output` 只是标准输出 (console.log)
- `error` 只是错误输出 (console.error)
- `log` 结合了 `output` 和 `error`, 默认是关闭的

### Rotating Logs 循环日志

If you want to split logs into multiple files instead of a big one, use the logrotate:
如果您想将日志分成多个文件而不是大文件，请使用logrotate：

```bash
pm2 install pm2-logrotate
```

Learn how to configure the module [here](https://github.com/keymetrics/pm2-logrotate).
在[这里](https://github.com/keymetrics/pm2-logrotate)了解如何配置模块。

---

## Merging Logs 合并日志

In cluster mode, each cluster has his own log files. You can use the merge options to gather all logs into a single file:
在群集模式下，每个群集都有自己的日志文件。 您可以使用合并选项将所有日志收集到单个文件中：

```javascript
module.exports = {
  apps: [{
      name: 'app',
      script: 'app.js',
      output: './out.log',
      error: './error.log',
      merge_logs: true,
    }]
}
```

?> Logs are still splitted into output/error/log
日志仍然分为output/error/log

---

## Disabling Logs 禁用日志

You can disable logs by sending them to /dev/null:
您可以通过将日志发送到 /dev/null 来禁用日志：

```javascript
module.exports = {
  apps: [{
      name: 'app',
      script: 'app.js',
      output: '/dev/null',
      error: '/dev/null',
    }]
}
```

---

## Log formating 格式化日志

### JSON

You can output the logs in JSON format:
您可以以JSON格式输出日志：

```bash
echo
```

becomes: 变为：

```json
{
   "message": "echo\n",
   "timestamp": "2017-02-06T14:51:38.896Z",
   "type": "out",
   "process_id": 0,
   "app_name": "app"
}
```

Add this entry in your ecosystem file:
在您的生态系统文件中添加此条目：

`ecosystem file: `"log_type": "json"`

### Timestamp format 时间戳格式

You can output the logs adding a timestamp:
您可以输出日志以添加时间戳：

```bash
echo
```

becomes: 变为：

```bash
12-02-2018: echo
```

Add this entry in your ecosystem file:
在您的生态系统文件中添加此条目：

`"date_log_format": "JJ-MM-YYYY"`

The format must follow a moment.js format, list [here](https://momentjs.com/docs/#/parsing/string-format/).
格式必须遵循moment.js格式，清单在 [此处](https://momentjs.com/docs/#/parsing/string-format/)。

---

## Next step 下一步

[Startup Hook](runtime/guide/startup-hook.md)
[启动挂钩](runtime/guide/startup-hook.md)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论