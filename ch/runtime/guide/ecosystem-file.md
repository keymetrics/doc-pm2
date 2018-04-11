# Ecosystem File 生态系统文件

When deploying on multiple server or when using multiple CLI arguments, an alternative to the command line become more conveninent for starting your apps.
当在多个服务器上部署或使用多个CLI参数时，命令行的替代方式对于启动您的应用更加方便。

The purpose of the ecosystem file is to gather options and environment variables of all your applications.
生态系统文件的目的是收集您所有应用的选项和环境变量。

---

## Generate a template 生成一个模版

Generate an `ecosystem.config.js` template with:
生成一个 `ecosystem.config.js` 模版：

```bash
pm2 init
```

This will generate: 这会生成：

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

For more information about available properties, check the [ecosystem file reference](runtime/references/ecosystem-file.md).
有关可用属性的更多信息，请查看[生态系统文件参考](runtime/references/ecosystem-file.md)。

---

## Use your ecosystem file 使用您的生态系统文件

### Routine 常规

Start, stop, restart and reload all your applications at once:
一次性启动，停止，重启并重载您的所有应用程序：

```bash
pm2 start ecosystem.config.js
pm2 stop ecosystem.config.js
pm2 restart ecosystem.config.js
pm2 reload ecosystem.config.js
```

### Action on a specific process 针对特定进程采取行动

Perform an action on a specific application with the option `--only <app_name>`:
使用该选项 `--only <app_name>` 对特定应用执行操作

```bash
pm2 restart ecosystem.config.js --only app
```

---

## Environment variables 环境变量

You can declare multiple, each entry must be format according to `env_<environment-name>`.
您可以多次进行申明,每个条目必须遵照此格式 `env_<environment-name>`。

Here, the `app` process can be start with two environments: `development` and `production`.
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

Select one of them with the `--env` flag:
用 `--env` 标志选择其中的一个

```bash
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
```

---

## Immutable environment 不可变环境

Once added to your process list, the process environment is immutable.
一旦添加到您的流程列表中，流程环境是不可变的。

The process environment is generated when you add a process to your process list, using:
- the current environment
- the ecosystem file

将流程添加到流程列表时生成流程环境，使用：
- 当前环境
- 生态系统文件

Thus, if you restart your process list having a different current environment or having a new ecosystem file, the process environment doesn't change.
因此，如果您重启具有不同于当前环境或具有新生态系统文件的进程列表，进程环境不会更改。

This behavior has been made to ensure consistency across restarts of your app.
此行为是为了确保应用重启时的一致性。

### Updating the environment 更行环境

If you want to force an update, you must use `--update-env` : 
如果您想强制更新，您必须使用 `--update-env` ：

```bash
# refresh the environment
pm2 restart ecosystem.config.js --update-env

# switch the environment
pm2 restart ecosystem.config.js --env production --update-env
```

---

## Next step 下一步

[Process Management 进程管理](runtime/guide/process-management.md)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。