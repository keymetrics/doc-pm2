# Environment Variables in Node.js

Environment variables are special variables that can be set outside of your Node.js applications, particularly useful to make your application configurable externally. Let's say a cloud provider wants to change the listening port of your app or if you want to enable verbose logging without getting into the code.

This tutorial will give you an overview on how to use environment variables in Node.js.

---

## Set environment 

When starting an app with Node.js, the current environment of your shell is injected into your app environment. These variables are available in `process.env.ENV_NAME`.

---

## The NODE_ENV environment variable

A common convention in Node.js is that the NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production).

For example, with express, setting NODE_ENV to “production” can improve performance by a factor of 3 according to the [documentation](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production). This enables:
- Cache for view templates.
- Cache for CSS files generated from CSS extensions.
- Generate less verbose error messages.

You can define your different environment in your ecosystem file:

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