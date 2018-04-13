---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Graceful Shutdown 正常关机

Your applications will restart several times in its lifetime, be it on deployment or, more sadly, if your application crashes.
您的应用将在其整个生命周期中重启几次，无论是在部署中还是更糟糕的情况，应用崩溃。

But on a restart, a user can face two problems: 但在重启时，用户可能面临两个问题：
- a **downtime period**, your server returning "503 Service Unavailable" responses
- a **failed request**, if the request was in progress at the time of restart
- 一段**停机时间**,服务器返回到“503服务不可用”响应
- 一个**失败请求**,如果重启时请求正在进行

**Downtime periods** can be avoided with the pm2 cluster mode and reload action.
使用pm2群集模式和重载操作可以避免**停机时间段** 

**Failed requests** can be avoided with graceful shutdown and restart. This tutorial introduce you how to implement it.
正常关机并重启可以避免**失败请求**。 本教程将向您介绍如何实现它。

---

## Graceful Shutdown 正常关机

In a graceful shutdown, your app must go through 5 steps:
在一次正常关机时，您的应用必须经过5个步骤：

- receives a notification to stop
- asks the load balancer to stop receiving requests
- finishes all ongoing requests
- releases all resources (databases, queues...)
- exits
- 收到通知停止
- 要求负载均衡器停止接收请求
- 完成所有正在进行的请求
- 释放所有资源（数据库，队列...）
- 退出

Let's say we have the following express app:
假设我们有以下express应用:

```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

const server = require('http').createServer(app)
server.listen(port, () => {
  console.log('Express server listening on port ' + server.address().port)
})
```

We need first to intercept the **SIGINT** signal (emitted by `pm2 stop`):
我们首先需要拦截 **SIGINT**信号（由 `pm2 stop`发出）:

```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

const server = require('http').createServer(app)
server.listen(port, () => {
  console.log('Express server listening on port ' + server.address().port)
})

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
})
```

We then ask HTTP server to stop receiving requests and finish ongoing ones:
然后，我们要求HTTP服务器停止接收请求并完成正在进行的请求：

```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

const server = require('http').createServer(app)
server.listen(port, () => {
  console.log('Express server listening on port ' + server.address().port)
})

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')

  // Stops the server from accepting new connections and finishes existing connections.
  server.close(function(err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
})
```

At last, we close connection to all resources:
最后，我们关闭所有资源的连接：

```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

const server = require('http').createServer(app)
server.listen(port, () => {
  console.log('Express server listening on port ' + server.address().port)
})

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')

  // Stops the server from accepting new connections and finishes existing connections.
  server.close(function(err) {
    // if error, log and exit with error (1 code)
    if (err) {
      console.error(err)
      process.exit(1)
    }

    // close your database connection and exit with success (0 code)
    // for example with mongoose
    mongoose.connection.close(function () {
      console.log('Mongoose connection disconnected')
      process.exit(0)
    })
  })
})
```

---

## Timeout for kill 超时终止

By default, pm2 waits 1600ms before sending SIGKILL signal if the applications doesn't exit itself.
默认情况下，如果应用不自行退出，pm2在发送SIGKILL信号之前会等待1600毫秒。

You can change this value, in ms, in your ecosystem.config.js:
您可以在您的ecos.config.js中以毫秒为单位更改此值：

```javascript
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    kill_timeout: 1600,
  }]
}
```

---

## Windows graceful stop windows的正常关机

When signals are not available your process gets killed. In that case, you need to listen for `shutdown` events:
当信号不可用时，您的进程将被终止。 在这种情况下，您需要遵从 `shutdown`事件：

```javascript
process.on('message', (msg) => {
  if (msg == 'shutdown') {
    console.log('Closing all connections...')
    setTimeout(() => {
      console.log('Finished closing connections')
      process.exit(0)
    }, 1500)
  }
})
```

---

## Graceful start 正常启动

Your application often require to be connected to your database or other resources before serving HTTP requests.
在提供HTTP请求之前，您的应用通常需要连接到您的数据库或其他资源。

Your app must go through these 3 steps to avoid errors:
您的应用经过这3个步骤才能避免错误：

- opens DB connections
- starts listening to a port
- notifies pm2 that the application is ready
- 打开数据库连接
- 开始询问一个端口
- 通知pm2应用程已准备就绪

First, enable the `ready` signal in pm2 in your ecosystem.config.js:
首先，在您的ecos.config.js中启用pm2中的 `ready`信号：
```javascript
module.exports = {
  apps : [{
    name: "api",
    script: "./api.js",
    wait_ready: true,
    listen_timeout: 3000,
  }],
}
```

?> By default, after 3000ms, pm2 will consider your app ready. Change this value with the `listen_timeout` value.
默认情况下，在3000毫秒后，pm2会考虑准备好您的应用。 使用 `listen_timeout`值更改此值。

Let's keep using the previous express app:
让我们继续使用之前的express app:
```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

server.listen(port, () => {
  console.log('Express server listening on port ' + server.address().port)
})

...
```

First, wait for your database connection to be ready:
首先，等待数据库连接准备就绪:
```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

const server = require('http').createServer(app)
mongoose.connect('mongodb://mongosA:27501,mongosB:27501', (err) => {
  server.listen(port, () => {
    console.log('Express server listening on port ' + server.address().port)
  })
})

...
```

At last, notify pm2 that the application is ready with `process.send('ready')`:
最后，使用 `process.send('ready')`通知pm2应用已准备好：

```javascript
const app = express()
const port = process.env.port || 8000

app.get('/', (req, res) => { res.end('Hello world') })

const server = require('http').createServer(app)
mongoose.connect('mongodb://mongosA:27501,mongosB:27501', (err) => {
  server.listen(port, () => {
    console.log('Express server listening on port ' + server.address().port)
    process.send('ready')
  })
})

...
```

---

## Graceful start in cluster mode 群集模式下的正常启动

In cluster mode, there is a default system that sets each cluster ready when the app accepts a connection. There is also a time out, which default to 3000ms, that you can set with the `listen_timeout` property in your ecosystem file.
在群集模式下，有一个默认系统，可在应用接受连接时设置每个群集。 还有一个超时时间，默认为3000ms，您可以使用生态系统文件中的`listen_timeout`属性进行设置。