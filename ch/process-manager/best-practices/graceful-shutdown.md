---
layout: page
title: 正常关机 | 生产最佳实践 | PM2教程
title-en: Graceful Shutdown | Best Practices | PM2 Documentation
menu: starter
lang: ch
section: process-manager
---

# 正常关机

您的应用将在其整个生命周期中重启几次，无论是在部署中还是更糟糕的情况，应用崩溃。

但在重启时，用户可能面临两个问题：
- 一段**停机时间**,服务器返回到“503服务不可用”响应
- 一个**失败请求**,如果重启时请求正在进行

使用PM2群集模式和重载操作可以避免**停机时间段** 

正常关机并重启可以避免**失败请求**。 本教程将向您介绍如何实现它。

---

## 正常关机

在一次正常关机时，您的应用必须经过5个步骤：

- 收到通知停止
- 要求负载均衡器停止接收请求
- 完成所有正在进行的请求
- 释放所有资源（数据库，队列...）
- 退出

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

## 超时终止

默认情况下，如果应用不自行退出，PM2在发送SIGKILL信号之前会等待1600毫秒。

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

## windows的正常关机

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

## 正常启动

在提供HTTP请求之前，您的应用通常需要连接到您的数据库或其他资源。

您的应用需经过这3个步骤来避免错误：

- 打开数据库连接
- 开始请求一个端口
- 通知PM2应用已准备就绪

首先，在您的ecos.config.js中启用PM2中的 `ready`信号：
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

?> 默认情况下，在3000毫秒后，PM2会考虑准备好您的应用。 使用 `listen_timeout`值更改此值。

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

最后，使用 `process.send('ready')`通知PM2应用已准备好：

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

## 群集模式下的正常启动

在群集模式下，有一个默认系统，可在应用接受连接时设置每个群集。 还有一个超时时间，默认为3000毫秒，您可以使用生态系统文件中的`listen_timeout`属性进行设置。