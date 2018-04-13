---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Using PM2 in a Cloud Provider 在云供应商中使用PM2

You might find yourself in a situation in which you do not have access to the CLI to start your Node.js applications.
您可能会发现自己处于一个无法访问CLI来启动Node.js应用的情况下。

In such a situation, pm2 must be added as a dependency and must be called with the start script.
在这种情况下，必须将pm2作为依赖项添加，并且必须使用启动脚本调用。

---

## Prepare your app 准备您的应用

### Set your ecosystem file 设置您的生态系统文件

Generate an `ecosystem.config.js` template with:
使用以下命令生成一个 `ecosystem.config.js`模版：

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
在[此处](runtime/guide/ecosystem-file.md)了解更多有关生态系统文件的内容

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

### Start script in package.json 在package.json中启动脚本

In your `package.json`, modify your `start` script like the following:
在您的`package.json`中，修改您的`start`脚本，如下所示：

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"
  }
```

---

## Deploy your app 部署您的应用

You can now deploy your application in your cloud providers like you would have done for a regular node.js app.
现在，您可以将应用部署到您的云供应商中，就像您对常规node.js应用所做的那样。

---

## Next step 下一步

Complete your configuration with the [Ecosystem File](runtime/guide/ecosystem-file.md)
使用[生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

Monitor your app on a dashboard, with [PM2 Monitoring](monitoring/integration/cloud-providers.md)
使用 [PM2 Monitoring](monitoring/integration/docker.md)在仪表板上监控您的应用

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。