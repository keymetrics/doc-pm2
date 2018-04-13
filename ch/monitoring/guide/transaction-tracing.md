---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Transaction tracing 事务跟踪

The transaction tracing is useful to troubleshoot performance issues and get detailed low-level insight of how your app is working.
事务跟踪对解决性能问题，获取您的应用如何工作的详细初级信息非常有用。

Slow HTTP calls are identified and the database and external calls are aggregated to understand why.
缓慢的HTTP调用被识别，并且数据库和外部调用都被聚合从而对其进行理解。

![transaction tracing]({{site.baseurl}}/img/monitoring/tracing.png)

---

## Enable the transaction tracing 启用事务跟踪

The transaction tracing is disabled by default. On big infrastructure, you should only use the transaction tracing for a few days to collect informations and then disable it because there is no sampling and all requests are treated.
事务跟踪在默认情况下是禁用的。 在大型基础架构上，您应该只使用事务跟踪几天来收集信息，然后禁用它，因为这其中没有抽样且所有请求都会被处理。

You'll have to wait 10min to let pm2 collects enough data.
您得等待10分钟才能让pm2收集足够的数据。

### PMX

Add `trace: true` at the pmx initialisation. 在pmx初始化时添加 `trace：true`

### Terminal 终端

When the transaction tracing is enabled, you'll see a clock on the side of the process in the process list (`pm2 ls`).
当启用事务跟踪时，您会在进程列表（`pm2 ls`）的进程一侧看到一个时钟。

Enable with: 启用：

```bash
pm2 reload <app_name> --trace
```

Disable with: 禁用：

```bash
pm2 reload <app_name> --disable-trace
```

---

## Advanced options 高级选项

You must use the pmx initialisation to customize your transaction tracing.
您必须使用pmx初始化来自定义您的事务跟踪。

`--trace` enable transaction tracing with default settings, so run `--disable-trace` before using advanced options.
`--trace`使用默认设置启用事务跟踪，因此在使用高级选项之前运行 `--disable-trace`。

 ```javascript
 {
    // Log levels: 0-disabled, 1-error, 2-warn, 3-info, 4-debug
    logLevel: 1,

    // Ignore request based on matching string/regex for each field
    // Only one value need to match for the request to be ignored.
    // Example :
    // ignoreFilter: { path: [/v1/, '/'], ip: [/127.0.0.1/, '::1'] } 
    // will ignore request that contains v1 in their path or the index
    // it will ignore request that has been made by localhost
    ignoreFilter: {
      'path': [],
      'method': [],
      'ip': []
    },

    // An upper bound on the number of traces to gather each second. If set to 0,
    // sampling is disabled and all transactions are recorded. Sampling rates greater
    // than 1000 are not supported and will result in at most 1000 samples per
    // second.
    samplingRate: 0
 }
 ```
 

---

## Transaction tracing dashboard 事务跟踪仪表板

### Latency graph 延迟图像

Under the graph you can select which values you want drawn on the graph:
在该图下，您可以选择要在图上绘制哪些值：
* The [median](https://en.wikipedia.org/wiki/Median) of the application tells you what an ordinary user can expect as a response time.
该应用的[中位数](https://en.wikipedia.org/wiki/Median) 会告诉您一个普通用户可以依靠什么作为响应时间。
* P95 and P99 curves lets you explore the evolution of the slowest latencies of your application.
P95和P99曲线可让您探索应用最慢延迟的演变。
* The database latencies shows you how much time they consume in a standard request.
数据库延迟显示您在标准请求中消耗多少时间。

### Transaction list 事物列表

You can sort the recorded path of your app according to:
您可以根据以下来为您的应用的记录路径排序：

* Most time consuming: Total time spent in this route for the whole application
大部分时间消耗：整个应用在此路线上花费的总时间
* Slowest routes: Which routes take the most time
最慢的路线：哪些路线花费最多的时间
* Number of calls: how many calls are made to every route
调用次数：每条路由有多少个调用

### Transaction details and Variances 事物细节和差异

Some transactions have the same path but respond differently: a forbidden access on a route can return a 403 and be executed differently than usual. We call those **variances**: for each path we log up 5 most used variances that you can examine here.
一些事务具有相同的路径，但响应方式不同：路由上的一个禁止访问可以返回403，并且执行的操作与平时不同。 我们将这此称为 **差异** ：对于每条路径，我们记录5个最常用的差异，以便您在此查看。

Let's examine a specific variance: 
我们来分析一个具体的差异：
* median, slowest and fastest call response time 中位数，最慢和最快的调用响应时间
* Metadata about the call 有关调用的元数据
* List of registered subcalls. If no call to an external [entity](http://docs.keymetrics.io/docs/pages/tracing/#under-the-hood) is made, nothing will appear here. The call display and information depends on the stack logged. For databases, you will for example see the database call made.
注册的子控制列表。 如果没有对外部 [实体](http://docs.keymetrics.io/docs/pages/tracing/#under-the-hood) 进行调用，则此处不显示任何内容。 调用显示和信息取决于记录的堆栈。 关于数据库，您将可能看到数据库调用的情况。


You can then click on another **variance** to examine why and how the behaviour was different.
然后，您可以点击另一个 **variance** 来检查行为不同的原因和方式

---

## Under the hood 在hood下

PMX will wrap below modules if they exist in your application : 
如果它们存在于您的应用中，PMX将包装在模块之下
 - `express` version 4
 - `hapi` versions 8 - 13
 - `restify` versions 3 - 4
 - `koa` version v1.x
 - Outbound HTTP requests using `http` core module 出站HTTP请求使用`http`核心模块
 - `mongodb-core` version 1 (used by mongoose)
 - `redis` versions 0.12 - 2
 - `mysql` version ^2.9
 - `pg` version ^6.x

Then record all requests made or received by them then sended to PM2 to be aggregated. 
The impact on performance should be low since there is no heavy logic done in your process except wrap modules and sending data. 
然后记录他们发出或接收的所有请求，然后发送给PM2进行汇总。
对性能的影响应该会很低，因为除了包装模块和发送数据之外，您的进程中没有大量逻辑语言需要完成。

---

## Things to know 须知

- When received by PM2, transactions are aggregated depending on their path (so without the query), for example :
当被PM2接收时，事务会根据其路径汇总（因此没有query）,例如：
  - `/api/users/1` and `/api/users/2` will be aggregated together because PM2 detected the `1` and `2` has identifier
  - `/api/users/1`和 `/api/users/2` 将被聚合在一起，因为PM2检测到`1`和`2`有标识符
  - `/api/users/search` and `/api/users/1` will not be aggregated together because `search` isnt a identifier
  - `/api/users/search`和 `/api/users/1`不会被聚合在一起，因为`search`不是一个标识符

- PM2 detect identifier with multiples regex :
PM2使用多个正则表达式检测标识符：
  - UUID v1/v4 with or without dash (`/[0-9a-f]{8}-[0-9a-f]{4}-[14][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}[14][0-9a-f]{19}/`)
  - 带或不带破折号的UUID v1/v4 (`/[0-9a-f]{8}-[0-9a-f]{4}-[14][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}[14][0-9a-f]{19}/`)
  - any number (`/\d+/`) 任何数字 (`/\d+/`)
  - suit of number and letter (`/[0-9]+[a-z]+|[a-z]+[0-9]+/`) : this one is used by mongo for document id
  - 数字和字幕的组合 (`/[0-9]+[a-z]+|[a-z]+[0-9]+/`)：这个被mongo用于文件ID
  - most SEO optimized webpages (articles, blog posts...): `/((?:[0-9a-zA-Z]+[@\-_.][0-9a-zA-Z]+|[0-9a-zA-Z]+[@\-_.]|[@\-_.][0-9a-zA-Z]+)+)/`
  - 大多数SEO优化网页（文章，博客帖子...）：`/((?:[0-9a-zA-Z]+[@\-_.][0-9a-zA-Z]+|[0-9a-zA-Z]+[@\-_.]|[@\-_.][0-9a-zA-Z]+)+)/`

- This feature has some known problems with other modules :
- 此功能与其他模块有一些已知的问题：
  - `request-promise`: clears the node cache and requires a new clean version of the `http` module. To solve this, require `http` again after requiring `request-promise` to get the correctly wrapped `http` module.
  - `request-promise`：清除节点缓存并请求一个新的干净版本的`http`模块。 为了解决这个问题，需要`request-promise`来获得正确包装的`http`模块后再次请求`http`。
  - `node-newrelic`: works as we do, so you might encounter problems with it.
  - `node-newrelic`：和我们一样工作，所以你可能会遇到问题。
  

---

## Next steps 下一步

[Profiling 分析](monitoring/guide/profiling.md)

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support
