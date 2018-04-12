---
layout: page
title: Quick Start with PM2
menu: starter
lang: en
redirect_from: "/runtime/quick-start.html"
---

# Load-Balancing (cluster mode)

The built-in load-balancer provides networked Node.js applications (http(s)/tcp/udp server) to be scaled accross all CPUs available, without any code modifications.

![scale across all cpu's available]({{site.baseurl}}/assets/img/runtime/cluster-mode.png)

---

## Usage

To enable the cluster mode, just pass the `-i <number-instances>` option:

```bash
pm2 start app.js -i max
```

`max` means that PM2 will auto detect the number of available CPUs and run as many processes as possible

Or via your ecosystem file (ecosystem.config.js):

```javascript
module.exports = {
  apps: [{
    script: "app.js",
    instances: "max",
  }]
}
```

The *instances* option can be:
- an Integer. This spreads the app across a specific number of clusters.
- the String 'max'. This spreads the app across all CPU cores.

?> You can also use a negative integer. If 4 cores, `pm2 start -i -1` will spread 3 clusters (max - integer).

---

## Stateless Application

In the context of clustering, you first need to be sure that your application has no internal state.

An internal state is typically some local data stored into its processes. It can be an array of websocket connections or a local session-memory for example. Use Redis or other databases instead to share the states between processes.

Follow our [tutorial]({{site.baseurl}}/runtime/production-best-practices/stateless-application/) to make your app stateless.

---

## 0 second downtime reload

When you use `restart`, pm2 kills and restarts the process so there is a short period of time during which the service is unavailable.

With reload, pm2 restarts all instances one by one always kepping at least one process running:
```bash
pm2 reload <app_name>
```

Or:

```bash
pm2 reload ecosystem.config.js
pm2 reload ecosystem.config.js --only app
```

If the reload system hasn't managed to reload your application, a timeout will fallback to a classic restart.

---

## Graceful Start & Shutdown

To be sure that all requests are properly handled in a reload, you need to be sure that your application shutdown, not leaving unanswered requests.

A graceful shutdown makes sure to handle all remaining queries before exiting the application and closes all external connections.

Get help to setup graceful shutdown with our [tutorial]({{site.baseurl}}/runtime/production-best-practices/graceful-shutdown/).

---

## Cluster environment variable

The `NODE_APP_INSTANCE` environment variable is used to make a difference between cluster.

For example, if you want to run a cronjob only on one cluster, you can check if `process.env.NODE_APP_INSTANCE === 0`.

This variable can be renamed in the ecosystem file:

```javascript
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    instance_var: "INSTANCE_ID",
  }]
}
```

?> This is useful with the `node-config` package where name conflicts have been reported, check the [issue](https://github.com/Unitech/pm2/issues/2045).

---

## Next steps

[Development tools]({{site.baseurl}}/runtime/guide/development-tools/)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.