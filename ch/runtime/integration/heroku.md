---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Using PM2 with Heroku 用Heroku使用PM2

This page will guide you step by step through the PM2 integration with Heroku.
此页面将逐步引导您通过使用Heroku进行PM2集成。

We will use Git and the Heroku CLI.
我们将使用Git和Heroku CLI.

---

## Prepare your app 准备您的应用

### Set your ecosystem file 设置您的生态系统文件

Generate an `ecosystem.config.js` template with:
使用以下命令生成一个 `ecosystem.config.js`模板：

```bash
pm2 init
```

Modify the ecosystem file to match your needs:
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

?> Learn more about ecosystem file [here](runtime/guide/ecosystem-file.md).
在[此处](runtime/guide/ecosystem-file.md)了解更多有关生态系统文件的内容。

We recommend to use the cluster mode with Heroku, as each dyno has multi-core CPU.
我们建议在Heroku中使用群集模式，因为每个dyno都有多核CPU。

?> Learn more about the [cluster mode](runtime/guide/cluster.md).
详细了解 [群集模式](runtime/guide/cluster.md)

### Add PM2 as a module 将PM2添加为模块

Add pm2 as a dependency to your projet.
将pm2作为依赖项添加到您的项目中。

With npm: 使用npm:

```bash
npm install --save pm2
```

With yarn: 使用yarn:

```bash
yarn add pm2
```

### Set your package.json 设置您的package.json

In your `package.json`, modify your `start` script like the following:
在您的 `package.json`中，像下面这样修改您的 `start`脚本：

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"  }
```

---

## Deploy with Heroku 用Heroku部署

### Create an account on Heroku 在Heroku上创建一个帐户

Sign up for an account on Heroku [here](https://signup.heroku.com/).
在[这里](https://signup.heroku.com/)注册Heroku帐户。

### Install the CLI 安装CLI

Follow the instructions to install [here](https://devcenter.heroku.com/articles/heroku-cli).
按照说明在[这里](https://devcenter.heroku.com/articles/heroku-cli)安装。

Then, run `heroku login` to connect the CLI to your account.
然后，运行 `heroku login`将CLI连接到您的帐户。

### Init your Heroku app 初始化您的Heroku应用

We will first create a new empty application on Heroku and an associated empty Git repository.
我们将首先在Heroku和关联的空Git存储库上创建一个新的空应用。

Run this command from your app root folder:
从您的应用根文件夹运行此命令：
```bash
heroku create

Creating app... done, ⬢ guarded-island-32432
https://guarded-island-32432.herokuapp.com/ | https://git.heroku.com/guarded-island-32432.git
```

You now have a new git remote named `heroku`. If you push to this repository, your code is automatically deployed at the given URL.
您现在有一个名为 `heroku`的新git remote。 如果您推送到此存储库，您的代码将自动部署在给定的URL处。

### Deploy your app on Heroku 在Heroku上部署您的应用

Add and commit all your changes, then run:
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

## You are ready 您准备好了

That's all! The last line of the deployment will give you the URL where your app is available.
就是这样！ 部署的最后一行将为您提供应用可用的URL。

---

## Next step 下一步

Complete your configuration with the [Ecosystem File](runtime/guide/ecosystem-file.md)
使用[生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

Monitor your app on a dashboard, with [PM2 Monitoring](monitoring/integration/heroku.md)
使用 [PM2 Monitoring](monitoring/integration/docker.md)在仪表板上监控您的应用

---

### Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。