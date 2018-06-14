---
layout: page
title: Issue Dashboard | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/guide/issue-dashboard"
---

# Issue dashboard

![issue dashboard]({{ site.baseurl }}{% link img/plus/issue.png %})

PM2 always keep your application so you are not afraid anymore of the exception crashing you app.

But wait, what if many exceptions happen and you are now not aware of it?

With PM2 Plus, we've got your back. You can track all exceptions that happens on your servers along with:
- stack trace
- line code number
- logs before exception

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

## Next Steps

[Transaction Tracing]({{ site.baseurl }}{% link en/plus/guide/transaction-tracing.md %})

---

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on our [support github](https://github.com/keymetrics/keymetrics-support/issues).