---
layout: page
title: 日志管理 | 指南 | PM2教程
title-en: Log Management | Guide | PM2 Documentation
menu: starter
lang: ch
section: runtime
---

# 日志管理

日志可以实时获取并存储到您硬盘中。

日志格式化的方式，创建日志文件的方式：所有内容都可以自定义。

---

## 访问日志

### 实时日志

```bash
# all apps logs
pm2 logs

# only app logs
pm2 logs app
```

### 日志文件

默认情况下，所有日志都被保存到 `$HOME/.pm2/logs`。

您可以以此清空所有应用日志：

```bash
pm2 flush
```

---

## 日志文件配置

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

- `output` 只是标准输出 (console.log)
- `error` 只是错误输出 (console.error)
- `log` 结合了 `output` 和 `error`, 默认是禁用的

### 循环日志

如果您想将日志分成多个文件而不是大文件，请使用循环日志logrotate：

```bash
pm2 install pm2-logrotate
```

在[这里](https://github.com/keymetrics/pm2-logrotate)了解如何配置模块。

---

## 合并日志

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

?> 日志仍然分为output/error/log

---

## 禁用日志

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

## 格式化日志

### JSON

您可以以JSON格式输出日志：

```bash
echo
```

变为：

```json
{
   "message": "echo\n",
   "timestamp": "2017-02-06T14:51:38.896Z",
   "type": "out",
   "process_id": 0,
   "app_name": "app"
}
```

在您的生态系统文件中添加此条目：

`ecosystem file: `"log_type": "json"`

### Timestamp format 时间戳格式

您可以以添加时间戳来输出日志：

```bash
echo
```

变为：

```bash
12-02-2018: echo
```

在您的生态系统文件中添加此条目：

`"date_log_format": "JJ-MM-YYYY"`

格式必须遵循moment.js格式，清单在 [此处](https://momentjs.com/docs/#/parsing/string-format/)。

---

## 下一步

[启动挂钩]({{ site.baseurl }}{% link ch/runtime/guide/startup-hook.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论