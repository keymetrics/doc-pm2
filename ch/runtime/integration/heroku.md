---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# 与Heroku一起使用PM2

此页面将逐步引导您通过使用Heroku进行PM2集成。

我们将使用Git和Heroku CLI.

---

## 准备您的应用

### 设置您的生态系统文件

使用以下命令生成一个 `ecosystem.config.js`模板：

```bash
pm2 init
```

修改生态系统文件以符合您的需求：

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

?> 在[此处](runtime/guide/ecosystem-file.md)了解更多有关生态系统文件的内容。

我们建议在结合群集模式使用Heroku，因为每个dyno都有多核CPU。

?> 详细了解 [群集模式](runtime/guide/cluster.md)

### 将PM2添加为模块

将pm2作为依赖项添加到您的项目中。

使用npm:

```bash
npm install --save pm2
```

使用yarn:

```bash
yarn add pm2
```

### 设置您的package.json

在您的 `package.json`中，像下面这样修改您的 `start`脚本：

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"  }
```

---

## 用Heroku部署

### 在Heroku上创建一个帐户

在[这里](https://signup.heroku.com/)注册Heroku帐户。

### 安装CLI

按照说明在[这里](https://devcenter.heroku.com/articles/heroku-cli)安装。

然后，运行 `heroku login`将CLI连接到您的帐户。

### 初始化您的Heroku应用

我们将首先在Heroku和关联的空Git存储库上创建一个新的空应用。

从您的应用根文件夹运行此命令：
```bash
heroku create

Creating app... done, ⬢ guarded-island-32432
https://guarded-island-32432.herokuapp.com/ | https://git.heroku.com/guarded-island-32432.git
```

您现在有一个名为 `heroku`的新git remote。 如果您推送到此存储库，您的代码将自动部署在给定的URL处。

### 在Heroku上部署您的应用

添加并提交您的所有更改，然后运行：

```bash
git push heroku master
Initializing repository, done.
updating 'refs/heads/master'
remote: Compressing source files... done.
remote: Building source:
...
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/aqueous-temple-78487.git
```

## 您准备好了

就是这样！ 部署的最后一行将为您提供应用程序可用的URL。

---

## 下一步

使用[生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

使用 [PM2 Monitoring](monitoring/integration/docker.md)在仪表板上监控您的应用

---

### 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。