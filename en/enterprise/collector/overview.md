---
layout: page
title: Overview | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
hide_comments: true
redirect_from: "/enterprise/collector/"
---

## Overview

When installing PM2 Enterprise, you need to choose how you want to fetch monitoring data. We have multiples way to "collect" the data :

- PM2 itself embed a agent, which is the default way used by most of our clients : [checkout there]({{ site.baseurl }}{% link en/enterprise/collector/pm2.md %})
- If you want to monitor a NodeJS app without PM2 (usually used in containers), you can use our standalone nodejs agent : [checkout there]({{ site.baseurl }}{% link en/enterprise/collector/standalone.md %})
- Use Golang in production ? you can use our beta agent : [checkout there]({{ site.baseurl }}{% link en/enterprise/collector/go.md %})
- You already have a Prometheus instance running ? You can broadcast metrics from Prometheus to PM2 Enterprise : [checkout there]({{ site.baseurl }}{% link en/enterprise/collector/prometheus.md %})




<center>
Contact our team at <a href="mailto:tech@keymetrics.io">tech@keymetrics.io</a> if you have any questions/issues
</center>
