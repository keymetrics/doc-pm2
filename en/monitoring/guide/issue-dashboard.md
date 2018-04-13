---
layout: page
title: Issue Dashboard | Guide | PM2 Plus Documentation
menu: starter
lang: en
redirect_from: "/monitoring/guide/issue-dashboard"
---

# Issue dashboard

You can track all exceptions that happens on your servers along with:
- stack trace
- line code number
- logs before exception

The issue dashboard primarily reports all the uncaught exceptions. When happening, node.js process crashes and pm2 automatically restarts the application while emiting an exception.

![issue dashboard]({{site.baseurl}}/img/monitoring/issue.png)

---

## Manually emit an issue

If you properly uses `try... catch` in your code, errors will be catch and will never be reported in the dashboard.

To reporte them anyway, emit yourself an exception with `pmx.notify()`:

```javascript
const pmx = require('pmx')

try {
    // Critical action to be tested
}
catch(error) {
    // Your code in case of an exception
    pmx.notify(new Error('This is an error'))
}
```

---

## Express.js middleware

By default, express catches all exceptions that happen.

You need to add the PMX middleware if you want them to be reported:

```javascript
// all your routes here
// app.get((req, res) => {})
app.use(pmx.expressErrorHandler())
```

?> Use it after the routes declaration.

---

## Next steps

[Transaction Tracing]({{site.baseurl}}/monitoring/guide/transaction-tracing.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support