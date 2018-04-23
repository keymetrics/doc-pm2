---
layout: page
title: Quick Start | PM2 Plus Documentation
menu: starter
lang: en
redirect_from: "/plus/quick-start"
---

# Quick Start

In seconds, this Quick Start tutorial will show you how to start monitoring your node.js application with pm2.

We assume that your app has been started or wrapped with pm2. If not, follow the [Quick Start]({{site.baseurl}}/process-manager/quickstart.md) tutorial.

---

## Create an account

Register [here](https://app.keymetrics.io/api/oauth/register).

---

## Connect your server to the dashboard

Connect your server to your dashboard and start collecting metrics with:

```bash
pm2 link <secret> <public>
```

Or, if you don't have access to the CLI, add `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY` environment variables set with your public and private keys.

?> The secret and public keys can be found at the top right of your dashboard

---

## Install CPU/Memory profiling

### g++

You must have `g++` installed:

On Linux, enter `sudo apt-get install build-essential`.

On Mac, enter `g++` in terminal and then follow the instructions.

### CPU/Memory profiler

Use the pm2 installer:

```bash
pm2 install profiler
```

Then reload your application to enable the profiler:

```bash
pm2 reload all
```

---

## You are done

Go back to the dashboard, you have now access to realtime metrics of your app.

![dashboard view]({{site.baseurl}}/img/plus/unified.png)

---

## Next steps

[Configuration]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support



