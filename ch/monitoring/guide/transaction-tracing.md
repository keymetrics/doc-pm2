---
layout: page
title: 事务跟踪 | 指南 | PM2 Plus教程
title-en: Transaction Tracing | Guide | PM2 Plus Documentation
menu: starter
lang: ch
---

# 事务跟踪

事务跟踪对解决性能问题，获取您的应用如何工作的详细初级信息非常有用。

缓慢的HTTP调用被识别，并且数据库和外部调用都被聚合从而对其进行理解。

![事物跟踪]({{site.baseurl}}/img/monitoring/tracing.png)

---

## 启用事务跟踪

事务跟踪在默认情况下是禁用的。 在大型基础架构上，您最好只在几天内使用事务跟踪来收集信息，然后禁用它，因为这其中没有抽样且所有请求都会被处理。

您得等待10分钟才能让pm2收集足够的数据。

### PMX

在pmx初始化时添加 `trace：true`

### 终端

当启用事务跟踪时，您会在进程列表（`pm2 ls`）的进程一侧看到一个时钟。

启用：

```bash
pm2 reload <app_name> --trace
```

禁用：

```bash
pm2 reload <app_name> --disable-trace
```

---

## 高级选项

您必须使用pmx初始化来自定义您的事务跟踪。

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

## 事务跟踪仪表板

### 延迟图像

在该图下，您可以选择要在图上绘制哪些值：
* 该应用的[中位数](https://en.wikipedia.org/wiki/Median) 会告诉您一个普通用户可以依靠什么作为响应时间。
* P95和P99曲线可让您探索应用最慢延迟的演变。
* 数据库延迟显示您在标准请求中消耗多少时间。

### 事物列表

您可以根据以下来为您的应用的记录路径排序：

* 大部分时间消耗：整个应用在此路由上花费的总时间
* 最慢的路线：哪些路由花费最多的时间
* 调用次数：每条路由有多少个调用

### 事物细节和差异

一些事务具有相同的路径，但响应方式不同：路由上的一个禁止访问可以返回403，并且执行的操作与平时不同。 我们将这此称为 **差异** ：对于每条路径，我们记录5个最常用的差异，以便您在此查看。
 
我们来分析一个具体的差异：
* 中位数，最慢和最快的调用响应时间
* 有关调用的元数据
* 注册的子控制列表。 如果没有对外部 [实体](http://docs.keymetrics.io/docs/pages/tracing/#under-the-hood) 进行调用，则此处不显示任何内容。 调用显示和信息取决于记录的堆栈。 关于数据库，您将可能看到数据库调用的情况。


然后，您可以点击另一个 **variance** （差异）来检查行为不同的原因和方式

---

## 在hood下
 
如果存在于您的应用中，PMX将包装在模块之下
 - `express` version 4
 - `hapi` versions 8 - 13
 - `restify` versions 3 - 4
 - `koa` version v1.x
 - 出站HTTP请求使用`http`核心模块
 - `mongodb-core` version 1 (used by mongoose)
 - `redis` versions 0.12 - 2
 - `mysql` version ^2.9
 - `pg` version ^6.x
 
然后记录他们发出或接收的所有请求，发送给PM2进行汇总。
对性能的影响应该会很低，因为除了包装模块和发送数据之外，您的进程中没有大量逻辑语言需要完成。

---

## 须知

- 当被PM2接收时，事务会根据其路径汇总（因此没有query）,例如：
  - `/api/users/1`和 `/api/users/2` 将被聚合在一起，因为PM2检测到`1`和`2`有标识符
  - `/api/users/search`和 `/api/users/1`不会被聚合在一起，因为`search`不是一个标识符

- PM2使用多个正则表达式检测标识符：
  - 带或不带破折号的UUID v1/v4 (`/[0-9a-f]{8}-[0-9a-f]{4}-[14][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}[14][0-9a-f]{19}/`)
  - 任何数字 (`/\d+/`)
  - 数字和字幕的组合 (`/[0-9]+[a-z]+|[a-z]+[0-9]+/`)：这个被mongo用于文件ID
  - 大多数SEO优化网页（文章，博客帖子...）：`/((?:[0-9a-zA-Z]+[@\-_.][0-9a-zA-Z]+|[0-9a-zA-Z]+[@\-_.]|[@\-_.][0-9a-zA-Z]+)+)/`

- 此功能与其他模块有一些已知的问题：
  - `request-promise`：清除节点缓存并请求一个新的干净版本的`http`模块。 为了解决这个问题，需要`request-promise`来获得正确包装的`http`模块后再次请求`http`。
  - `node-newrelic`：和我们一样工作，您可用此解决遇到的问题。
  

---

## 下一步

[分析]({{ site.baseurl }}{% link ch/monitoring/guide/memory-cpu-profiling.md %})

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support
