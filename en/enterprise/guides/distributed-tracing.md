---
layout: page
title: Distributed Tracing | Guide | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
permalink: "/en/enterprise/guides/distributed-tracing/"
---

# Overview

![Dashboard](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/enterprise/distributed_tracing/distributed_tracing.png)

The Distributed Tracing allows to captures and propagates distributed traces through your system, allowing you to visualize how customer requests flow across services, rapidly perform deep root cause analysis, and better analyze latency across a highly distributed set of services.

## Vocabulary

A trace is a tree of spans. It is a collective of observable signals showing the path of requests through a system.
This is an example of what a trace looks like:

<img src="https://opencensus.io/img/trace-trace.png" alt="Trace" width="700">

Above, you can see a trace with various spans. In order to respond to /messages, several other internal requests are made. Firstly, we check if the user is authenticated. Next we check if their messages were cached. Since their message wasn’t cached, that’s a cache miss and we then fetch their content from MySQL, cache it and then provide the response containing their messages.

A span may or may not have a parent span:
 - A span without a parent is called a “root span” for example, span “/messages”
 - A span with a parent is called a “child span” for example, spans “auth”, “cache.Get”, “mysql.Query”, “cache.Put”

## Requirements

In the following documention, we assume that you already have connected your application to PM2 Enterprise (either on-premise or cloud).
Also there are different requirements depending on the runtime you are using:
  - NodeJS: 
    - You must at least use node `6.0.0`.
    - If you use PM2, be sure that its version is above `3.4.0`
    - If you use the standalone agent, the `@pm2/io` version should be above `4.1.1`
  - Golang: 
    - You must at least Golang `1.8`

Of course in any cases, we advise to use the latest version since they improved the suppot for tracing a lot recently.

## Configuration

### NodeJS

**Note: Please note that you can't use multiples APMs at the same time with the Tracing system (ex: you can't use Newrelic while using PM2 Enterprise, there will be conflict)**

#### When using PM2

As stated above, please make sure you are using pm2 version `3.4.0` or newer (check with `pm2 --version`)
Then you can just run the following command to enable the tracing :

```bash
pm2 reload myapp --trace
```

If you want to customize the configuration, you will need to following those steps:

- Add the `@pm2/io` module in your application
- Add this snippet at the very first line of your application:
```js
const io = require('@pm2/io').init({
  tracing: {
    enabled: true,
    // then you can customize your configuration as you wish
    detailedDatabasesCalls: true
  }
})
```

#### When using the standalone agent (without PM2)

If you are only using the `@pm2/io` module to connect your apps to PM2 Enterprise, you will need to modify your call to `io.init` to include the tracing options.

```javascript
const io = require('@pm2/io').init({
  tracing: {
    enabled: true,
    // will add the actual queries made to database, false by default
    detailedDatabasesCalls: true,
    // if you want you can ignore some endpoint based on their path
    ignoreIncomingPaths: [
      // can be a regex
      /misc/,
      // or a exact string
      '/api/bucket'
      // or a function with the request
      (url, request) => {
        return true
      }
    ],
    // same as above but used to match entire URLs
    ignoreOutgoingUrls: [],
    // by default we only trace half of your request
    // but you may want to trace all of them
    samplingRate: 1
  }
})
```

By default we ignore specific incoming requests (you can override this by setting `ignoreIncomingPaths: []`):
- Request with the OPTIONS or HEAD method
- Request fetching a static ressources (`*.js`, `*.css`, `*.ico`, `*.svg`, `.png` or `*webpack*`)

#### What's get traced

When your application will receive a request from either `http`, `https` or `http2` it will start a trace. After that, we will trace the following modules:

 - `http` outgoing requests
 - `https` outgoing requests
 - `http2` outgoing requests
 - `mongodb-core` version 1 - 3
 - `redis` versions > 2.6
 - `ioredis` versions > 2.6
 - `mysql` version 1 - 3
 - `mysql2` version 1 - 3
 - `pg` version > 6
 - `vue-server-renderer` version 2

#### Custom Tracing API

The custom tracing API can be used to create custom trace spans. A span is a particular unit of work within a trace, such as an RPC request. Spans may be nested; the outermost span is called a root span, even if there are no nested child spans. Root spans typically correspond to incoming requests, while child spans typically correspond to outgoing requests, or other work that is triggered in response to incoming requests. This means that root spans shouldn't be created in a context where a root span already exists; a child span is more suitable here. Instead, root spans should be created to track work that happens outside of the request lifecycle entirely, such as periodically scheduled work. To illustrate:

```js
const io = require('@pm2/io').init({ tracing: true })
const tracer = io.getTracer()
// ...

app.get('/:token', function (req, res) {
  const token = req.params.token
  // the '2' correspond to the type of operation you want to trace
  // can be 0 (UNKNOWN), 1 (SERVER) or 2 (CLIENT)
  // 'verifyToken' here will be the name of the operation
  const customSpan = tracer.startChildSpan('verifyToken', 2)
  // note that customSpan can be null if you are not inside a request
  req.Token.verifyToken(token, (err, result) => {
    if (err) {
      // you can add tags to the span to attach more details to the span
      customSpan.addAttribute('error', err.message)
      customSpan.end()
      return res.status(500).send('error')
    }
    customSpan.addAttribute('result', result)
    // be sure to always .end() the spans
    customSpan.end()
    // redirect the user if the token is valid
    res.send('/user/me')
  })
})

// For any significant work done _outside_ of the request lifecycle, use
// runInRootSpan.
const startRootSpan = {
    name: 'my custom trace',
    // the '1' correspond to the type of operation you want to trace
    // can be 0 (UNKNOWN), 1 (SERVER) or 2 (CLIENT)
    kind: 1
  }
plugin.tracer.startRootSpan(traceOptions, rootSpan => {
  // ...
  // Be sure to call rootSpan.end().
});
```

#### Options for the tracing

```javascript
io.init({
  tracing: {
    /**
    * Enabled the distributed tracing feature.
    */
    enabled: boolean
    /**
    * If you want to report a specific service name
    * the default is the same as in apmOptions
    */
    serviceName?: string
    /**
    * Generate trace for outgoing request that aren't connected to a incoming one
    * default is false
    */
    outbound?: boolean
    /**
    * Determines the probability of a request to be traced. Ranges from 0.0 to 1.0
    * default is 0.5
    */
    samplingRate?: number,
    /**
    * Add details about databases calls (redis, mongodb, mysql etc)
    */
    detailedDatabasesCalls?: boolean,
    /**
    * Ignore specific incoming request depending on their path
    */
    ignoreIncomingPaths?: Array<IgnoreMatcher<httpModule.IncomingMessage>>
    /**
    * Ignore specific outgoing request depending on their url
    */
    ignoreOutgoingUrls?: Array<IgnoreMatcher<httpModule.ClientRequest>>
  }
})
```

If you are interested, there are more documentation in the NodeJS APM readme there:

[Go the NodeJS Agent](https://github.com/keymetrics/pm2-io-apm#distributed-tracing)
{: .btn-stylized}

### Golang

Please directly see the documentation of the Golang agent available in it's readme there:

[Go the Golang Agent](https://github.com/keymetrics/pm2-io-apm-go#distributed-tracing)
{: .btn-stylized}

## Common Questions/Issues

* The UI miss some graphic to have an historical view of latency

  We agree and we are open to any feedback for visualization or amelioration for the issue, please use the feedback buttom at the top-right of the application.

* It fail to capture request with my application

  Please launch your application with the debug log of the apm with the env var `DEBUG=axm:tracing`, and send us the logs with a support ticket (available at the bottom left of the application or at tech@keymetrics.io)