---
layout: page
title:  Snippet API | Frontend Monitoring | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
permalink: "/en/enterprise/frontend-monitoring/snippet-api/"
---

# Frontend Monitoring snippet API

Once [installed](../install/), you will be able to configure how your Website is monitored via the
`apm` object.  The `apm` object is only accessible through the `pm2Ready` function exposed by the
snippet.

## `pm2Ready(callback)`

The callback function will be called when the PM2 APM will be ready (or immediately if it is already
ready).  The callback will receive the `apm` object as first argument.  Usage example:
```js
pm2Ready(apm => {
  apm.setMeta('user', user.email)
})
```

## `apm.setBucket(bucketId)`

Set your bucket id.  This will be used to authenticate and store the data transmitted by the browser
APM.

### `apm.setApplication(applicationName)`

Set your application name.  This will be used to authenticate and store the data transmitted by the
browser APM.

### `apm.setMeta(name, value)`

Attach a custom meta value to all data sent by the browser APM.  For example, this can be used to
identify the current logged-in user, or your application release version.  Example:

```js
apm.setMeta('user', user.email)
```

### `apm.removeMeta(name)`

Remove a meta from future data packets.

### `apm.reportTimings()`

Automatically report various metrics from the current page.  It will track the time your page takes
to load, among other performance metrics.

### `apm.reportIssues()`

Automatically report unexpected issues triggered during the users sessions.  It will capture
uncaught JS exceptions to help you improve your user experience.

### `new apm.ZipkinLogger()`

Create a [Zipkin](https://zipkin.io/) logger to send distributed traces started from your website
frontend.  See the [zipkin-js
documentation](https://github.com/openzipkin/zipkin-js/blob/master/README.md) for further
informations.  Usage example:

```js
const tracer = new Zipkin.Tracer({
  ctxImpl: new Zipkin.ExplicitContext(),
  recorder: new Zipkin.BatchRecorder({
    logger: new apm.ZipkinLogger()
  }),
  localServiceName: 'service-a'
})
```
