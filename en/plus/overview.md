---
layout: page
title: Overview | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/overview/"
---

<p align="center">
    <img class="pm2-logo" src="{{ site.baseurl }}/img/plus/plus-black.png" alt="pm2 logo">
</p>
<p align="center">
    <b>P</b>(rocess) <b>M</b>(anager) <b>2</b><br/>
    <i>Plus</i>
</p>

<br/>
<center>
Welcome to the Overview of <b>PM2 Plus</b>!
</center>

Once you go serious about production, you need to make sure that your application is running properly, without bugs, without performance issues and without downtimes.

That's why we created PM2 Plus. It's a set of advanced features for both hardening your current PM2 Runtime Process manager and monitoring applications in production.

With PM2 Plus you get:

- A Real-time Monitoring Web Interface
- Issues & Exception Tracking
- Deployment reporting
- PM2 Runtime High Availability Fallback
- Realtime logs
- Email & Slack notifications
- Custom Metrics Monitoring
- Custom Actions Center

To start using PM2 Plus via CLI:

```bash
pm2 plus
```

Here are some of the features available in PM2 Plus:

## Global Dashboard

### Unified Overview

![a unified overview](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/overview/servers_overview.png)

PM2 Plus allows you to have an extended view of all your apps and databases in one single place, at real-time or through history. **Stop ssh in all your servers one by one**, instead, save time by having a condensed infrastructure plus view.

[Quick Start]({{ site.baseurl }}{% link en/plus/quick-start.md %})
{: .btn-stylized}

### Custom Metrics Histogram

![custom metrics](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/histograms/histograms.png)

Expose the important variables from your Node.js applications source code and display them as performance metrics on the PM2 Plus dashboard. **Monitor values that matter.**

[Configuration]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})
{: .btn-stylized}

### Notifications

![notifications]({{ site.baseurl }}{% link img/plus/notifications.png %})

Know when a data reaches a threshold, when an error occurred in your application or when your production application is down.

Even though PM2 makes sure that your application have no downtime, be notified in these critical situation in order to react. **Be notified and reactive in any critical situations.**

[Notifications]({{ site.baseurl }}{% link en/plus/guide/notifications.md %})
{: .btn-stylized}

## Debug & Optimize

### Issue Dashboard

![issue dashboard](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/issues/issues.png)

PM2 Plus reports the list of all errors in the "Issue Dashboard" occurred in your Node.js and gets you notified.

Stop spending time finding bugs or trying to replay them, we provide you an "Issue Dashboard" with everything in one place, to make debugging easier. **Drill down in your code and get the answer.**

[Issue Dashboard]({{ site.baseurl }}{% link en/plus/guide/issue-dashboard.md %})
{: .btn-stylized}

## Extra-features

### Remote control

![remote action](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/actionCenter/actionCenter.png)

PM2 Plus makes possible to enhance custom functions in the source code of your application.

For example, you can assign values to your application variables or just switch it to maintenance mode. In other words you can **expose triggerable functions in your code**.

You will to use the the [@pm2/io module](https://github.com/keymetrics/pm2-io-apm) comes along with PM2. It is the PM2 part responsible for gathering the metrics, reporting exceptions, exposing remote actions and every outside interaction with your application.

[Remote action]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})
{: .btn-stylized}

### Third-party modules

![modules]({{ site.baseurl }}{% link img/plus/modules.png %})

Extend the capabilities of the PM2 Plus dashboard by using external modules listed in our module page.

**Anyone can create and publish its own module.**

[Modules]({{ site.baseurl }}{% link en/plus/guide/modules.md %})
{: .btn-stylized}

### Next Steps

[Quick Start]({{ site.baseurl }}{% link en/plus/quick-start.md %})
{: .btn-stylized}
