---
layout: page
title: Issue Dashboard | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/guide/issue-dashboard/"
---

# Issue dashboard

![issue dashboard]({{ site.baseurl }}{% link img/plus/issue.png %})

PM2 always keep your application so you are not afraid anymore of the exception crashing you app.

But wait, what if many exceptions happen and you are now not aware of it?

With PM2 Plus, we've got your back. You can track all exceptions that happens on your servers along with:
- stack trace
- line code number
- logs before exception

## Manually emit an issue

If you properly use `try... catch` in your code, errors will be caught and will never be reported in the dashboard.

To report them anyway, emit an exception with `io.notify()`:

```javascript
const io = require('@pm2/io')

try {
    // Critical action to be tested
}
catch(error) {
    // Your code in case of an exception
    io.notify(new Error('This is an error'))
}
```

## Next Steps

[Transaction Tracing]({{ site.baseurl }}{% link en/plus/guide/transaction-tracing.md %})
{: .btn-stylized}
