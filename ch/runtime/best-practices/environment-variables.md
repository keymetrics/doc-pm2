---
layout: page
title: 中的环境变量 | 生产最佳实践 | PM2教程
title-en: Environment Variables | Best Practices | PM2 Documentation
menu: starter
lang: ch
section: runtime
---

# Node.js中的环境变量

环境变量是可以在您的Node.js应用之外设置的特殊变量，对于使应用可以在外部进行配置特别有用。 假设是在这样的情况下，云供应商想要更改您应用的侦听端口，或您希望启用详细日志记录而无需进入代码。

本教程将向您介绍如何在Node.js中使用环境变量。

---

## 设置环境

当使用Node.js启动应用时，您外壳的当前环境将被注入到您的应用环境中。 这些变量在 `process.env.ENV_NAME`中可用

---

## NODE_ENV环境变量

Node.js中的常见约定是NODE_ENV环境变量指定应用运行的环境（通常是开发或生产）。

例如，通过express，将NODE_ENV设置为“production”可根据此[文档](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)将性能提高3倍。 这能：
- 缓存视图模板.
- 缓存CSS扩展生成的CSS文件.
- 生成较少的冗长错误信息。

您可以在您的生态系统文件中定义您的不同环境：

```javascript
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

使用`pm2 start app --env production`在运行模式下启动您的应用。