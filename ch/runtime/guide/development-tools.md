---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# 开发工具

pm2附带两个开发工具，可以帮助您在开发阶段的：观测和重启模式以及静态文件服务器。

---

## 观测和重启

观测和重启模式可观测当前目录以检测文件更改和自启动。

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

?> 请注意，观测和重启模式会导致硬重启，且不会发送SIGINT。

### 观测选项
 
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

- `watch`也可以是一串或一组要观测的路径。 当设置为`true`时，将观测当前目录。
- `ignore_watch`可以是路径或字符串的数组。 它被[chokidar](https://github.com/paulmillr/chokidar#path-filtering)依赖用作一个glob或正则表达式。
- `watch_options`是作为[chokidar](https://github.com/paulmillr/chokidar#api)依赖项的选项给出的对象（pm2使用的默认选项是持久稳固的，且ingoreInitial设置为true）

在使用NFS设备时，您需要按照此[chokidar问题](https://github.com/paulmillr/chokidar/issues/242)中的说明设置`usePolling: true`。

### 使用CLI

观测模式也可以通过CLI使用

```bash
pm2 start app.js --watch
```

但是，请注意，启用 `--watch`时，您必须使用 `pm2 stop --watch <app_name>`来停止该进程，因为一般的停止不会使观测停止。

---

## 通过HTTP服务静态文件

pm2可以通过HTTP服务静态文件（如前端应用）：

```bash
pm2 serve <path> <port>
```

由于默认值是 `current folder` 和 `8080`，您可以直接使用：

```bash
pm2 serve
```

在生态系统文件中：

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

并以此开始：

```bash
pm2 start ecosystem.config.js
```

?>所有其他pm2选项仍然可用。

---

## 下一步

[使用SSH轻松部署 ]({{site.baseurl}}/ch/runtime/guide/easy-deploy-with-ssh)

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论