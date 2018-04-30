---
layout: page
title: 使用云供应商 | 综合 | PM2教程
title-en: Cloud Providers | Integration | PM2 Documentation
menu: starter
lang: ch
section: process-manager
---

# 在云供应商中使用PM2

您可能会发现自己处于一个无法访问CLI来启动Node.js应用的情况下。

在这种情况下，必须将pm2作为依赖项添加，且必须使用启动脚本调用。

---

## 准备您的应用

### 设置您的生态系统文件

使用以下命令生成一个 `ecosystem.config.js`模版：

```bash
pm2 init
```

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

?> 在[此处]({{ site.baseurl }}{% link ch/process-manager/guide/ecosystem-file.md %})了解更多有关生态系统文件的内容

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

### package.json中启动脚本

在您的`package.json`中，修改`start`脚本，如下所示：

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"
  }
```

---

## 部署您的应用

现在，您可以将应用部署到您的云供应商中，就像您对常规node.js应用所做的那样。

---

## 下一步

使用[生态系统文件]({{ site.baseurl }}{% link ch/process-manager/guide/ecosystem-file.md %})完成您的配置

使用 [PM2 Plus]({{ site.baseurl }}{% link ch/plus/integration/docker.md %})在仪表板上监控您的应用

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。