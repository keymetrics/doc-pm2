---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Development Tools 开发工具

pm2 comes with two development tools that will help you on the development stage: a watch and restart mode and a server for static files.
pm2附带两个开发工具，可以帮助您在开发阶段的：观测和重启模式以及静态文件服务器。

---

## Watch and Restart 观测和重启

The watch and restart mode watches the current directory to detect file changes and auto-start.
观测和重启模式可观测当前目录以检测文件更改和自启动。

This mode can be enable in your ecosystem.config.js:
您可以在您的ecosystem.config.js中启用此模式：

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    watch: true,
  }]
}
```

?> Beware that the watch and restart mode makes hard restart, without sending SIGINT.
请注意，观测和重启模式会导致硬重启，不会发送信号。

### Watch options 观测选项

You can use advanced options to specify path to watch or path to ignore. 
您可以使用高级选项来指定要观测的路径或要忽略的路径。

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    watch: ".",
  }]
}
```

- `watch` can also be a string or an array of paths to watch. Current directory is watched when set to `true`.
- `ignore_watch` can be an array of paths or a string. It is used by the [chokidar](https://github.com/paulmillr/chokidar#path-filtering) dependency as a glob or a regular expression.
- `watch_options` is an object that is given as options to [chokidar](https://github.com/paulmillr/chokidar#api) dependency (default options used by pm2 are persistent and ingoreInitial set to true)
- `watch`也可以是一串或一组要观测的路径。 当设置为`true`时，将观测当前目录。
- `ignore_watch`可以是路径或字符串的数组。 它被[chokidar](https://github.com/paulmillr/chokidar#path-filtering)依赖用作一个glob或正则表达式。
- `watch_options`是作为[chokidar](https://github.com/paulmillr/chokidar#api)依赖项的选项给出的对象（pm2使用的默认选项是稳固的，ingoreInitial设置为true）

When working with NFS devices you'll need to set `usePolling: true` as stated in [this chokidar issue](https://github.com/paulmillr/chokidar/issues/242).
在使用NFS设备时，您需要按照此[chokidar问题](https://github.com/paulmillr/chokidar/issues/242)中的说明设置`usePolling: true`。

### With CLI 使用CLI

Watch mode can also be enabled via CLI with
观测模式也可以通过CLI使用

```bash
pm2 start app.js --watch
```

However, please note that when `--watch` is enabled, you must use `pm2 stop --watch <app_name>` to stop the process, as simple stop won't stop the watching.
但是，请注意，启用 `--watch`时，您必须使用 `pm2 stop --watch <app_name>`来停止该进程，因为一般的停止不会使观测停止。

---

## Serve static file over HTTP 通过HTTP服务静态文件

pm2 can serve static files (like a frontend app) over HTTP with:
pm2可以通过HTTP服务静态文件（如前端应用）：

```bash
pm2 serve <path> <port>
```

As default values are `current folder` and `8080`, you can then just use:
由于默认值是 `current folder` 和 `8080`，您可以直接使用：

```bash
pm2 serve
```

In the ecosystem file: 在生态系统文件中：

```javascript
module.exports = {
  apps: [{
    name: "static-file",
    script: "serve",
    env: {
      PM2_SERVE_PATH: ".",
      PM2_SERVE_PORT: 8080,
    },
  }]
}
```

and start with: 并以此开始：

```bash
pm2 start ecosystem.config.js
```

?> All other pm2 options are still available.
所有其他pm2选项仍然可用。

---

## Next step 下一步

[Easy Deploy with SSH ](runtime/guide/deploy.md)
[使用SSH轻松部署 ](runtime/guide/deploy.md)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论