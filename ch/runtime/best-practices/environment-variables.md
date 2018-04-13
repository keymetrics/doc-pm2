---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Environment Variables in Node.js Node.js中的环境变量

Environment variables are special variables that can be set outside of your Node.js applications, particularly useful to make your application configurable externally. Let's say a cloud provider wants to change the listening port of your app or if you want to enable verbose logging without getting into the code.
环境变量是可以在您的Node.js应用之外设置的特殊变量，对于使应用可以在外部进行配置特别有用。 假设云供应商想要更改应用程序的侦听端口，或者您希望启用详细日志记录而无需进入代码。

This tutorial will give you an overview on how to use environment variables in Node.js.
本教程将向您介绍如何在Node.js中使用环境变量。

---

## Set environment 设置环境

When starting an app with Node.js, the current environment of your shell is injected into your app environment. These variables are available in `process.env.ENV_NAME`.
当使用Node.js启动应用时，您外壳的当前环境将被注入到您的应用环境中。 这些变量在 `process.env.ENV_NAME`中可用

---

## The NODE_ENV environment variable NODE_ENV环境变量

A common convention in Node.js is that the NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production).
Node.js中的常见约定是NODE_ENV环境变量指定应用运行的环境（通常是开发或生产）。

For example, with express, setting NODE_ENV to “production” can improve performance by a factor of 3 according to the [documentation](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production). This enables:
例如，通过express，将NODE_ENV设置为“production”可根据此[文档](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)将性能提高3倍。 这能使：
- Cache for view templates.
- Cache for CSS files generated from CSS extensions.
- Generate less verbose error messages.
- 缓存视图模板.
- 缓存CSS扩展生成的CSS文件.
- 生成较少的冗长错误信息。

You can define your different environment in your ecosystem file:
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

Start your application with `pm2 start app --env production` to start your app in production mode.
使用`pm2 start app --env production`在生产模式下启动您的应用。