---
layout: page
title: 生态系统文件 | 指南 | PM2教程
title-en: Ecosystem File | Guide | PM2 Documentation
menu: starter
lang: zh
section: runtime
---

# 生态系统文件

当在多个服务器上部署或使用多个CLI参数时，命令行的一种替代方式对于启动您的应用更加方便。

生态系统文件的目的是收集您所有应用的选项和环境变量。

## 生成一个模版

生成一个 `ecosystem.config.js` 模版：

```bash
pm2 init
```

这会生成：

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

有关可用属性的更多信息，请查看[生态系统文件参考]({{ site.baseurl }}{% link zh/runtime/reference/ecosystem-file.md %})。

## 使用您的生态系统文件

### 常规

一次性启动，停止，重启并重载您的所有应用程序：

```bash
pm2 start ecosystem.config.js
pm2 stop ecosystem.config.js
pm2 restart ecosystem.config.js
pm2 reload ecosystem.config.js
```

### 针对特定进程采取行动

使用该选项 `--only <app_name>` 对特定应用执行操作：

```bash
pm2 restart ecosystem.config.js --only app
```

## 环境变量

您可以多次进行申明,每个条目必须遵照此格式 `env_<environment-name>`。

在这里，`app`流程可以从两个环境开始：`development` 和 `production`。

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

用 `--env` 标志选择其中的一个：

```bash
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
```

## 不可变环境

一旦添加到您的流程列表中，流程环境是不可变的。

将流程添加到流程列表时生成流程环境，使用：
- 当前环境
- 生态系统文件

因此，如果您重启具有不同于当前环境或具有新生态系统文件的进程列表，进程环境不会更改。

此行为是为了确保应用重启时的一致性。

### 更新环境

如果您想强制更新，您必须使用 `--update-env` ：

```bash
# refresh the environment
pm2 restart ecosystem.config.js --update-env

# switch the environment
pm2 restart ecosystem.config.js --env production --update-env
```

## 下一步

[进程管理]({{ site.baseurl }}{% link zh/runtime/guide/process-management.md %})

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。