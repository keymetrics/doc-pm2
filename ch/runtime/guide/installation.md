---
layout: page
title: 安装 | 指南 | PM2教程
title-en: Installation | Guide | PM2 Documentation
menu: starter
lang: ch
section: runtime
---

# 安装

---

## 安装PM2

使用yarn:
```bash
yarn global add pm2
```

使用npm
```bash
npm install pm2 -g
```

在debian操作系统下，使用安装脚本：
```bash
apt update && apt install sudo curl && curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
```

使用docker，请遵循 [本教程]({{ site.baseurl }}{% link ch/runtime/integration/docker.md %}).

### CLI autocompletion CLI自动完成

默认情况下，CLI自动完成不与PM2一起安装，我们推荐：

```bash
pm2 completion install
```

### 源地图支持

如果存在的话，源地图文件在默认情况下会自动被检测 (`app.js.map` for `app.js`）。

?> 什么是源地图文件？如果正使用Babel，Typescript或任何其他Javascript超集，您可能已经注意到堆栈跟踪没有意义，错误不会指向正确的行。源地图文件则可以用来解决这个问题。

---

## 更新

让您的PM2保持最新状态：

```bash
npm install pm2 -g && pm2 update
```

?> `pm2 update` 是必要的，以便刷新pm2的守护进程。

---

## 下一步

[生态系统文件]({{ site.baseurl }}{% link ch/runtime/guide/ecosystem-file.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。