---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Installation 安装

---

## Install pm2 安装pm2

With yarn: 使用yarn:
```bash
yarn global add pm2
```

With npm: 使用npm
```bash
npm install pm2 -g
```

With debian, use the install script: 在debian操作系统下，使用安装脚本：
```bash
apt update && apt install sudo curl && curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
```

With docker, follow this [tutorial](runtime/integration/docker.md).
使用docker，请遵循 [本教程](runtime/integration/docker.md).

### CLI autocompletion CLI自动完成

By default, CLI autocompletion is not installed with pm2, we recommend it:
默认情况下，CLI自动完成不与pm2一起安装，我们推荐：

```bash
pm2 completion install
```

### Source map support 源地图支持

Source map files are autodetected by default if they are present (`app.js.map` for `app.js`).
如果存在的话，源地图文件在默认情况下会自动被检测 (`app.js.map` for `app.js`）。

?> What are source map files ? If using Babel, Typescript or any other Javascript superset, you may have noticed that stacktraces are not meaningful, errors not pointing to the right line. Source map files can be used to solve this problem.
什么是源地图文件？如果正使用Babel，Typescript或任何其他Javascript超集，您可能已经注意到堆栈跟踪没有意义，错误不会指向正确的行。源地图文件则可以用来解决这个问题。

---

## Update 更新

Keep your pm2 up to date with:让您的pm2保持最新状态：

```bash
npm install pm2 -g && pm2 update
```

?> `pm2 update` is necessary in order to refresh the pm2 daemon.
`pm2 update` 是必要的，以便刷新pm2的守护进程。

---

## Next step 下一步

[Ecosystem File 生态系统文件]({{site.baseurl}}/ch/runtime/guide/ecosystem-file)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。