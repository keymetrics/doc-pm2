---
layout: page
title: Quick Start | PM2 Plus Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/quick-start"
---

# Quick Start

In seconds, this Quick Start tutorial will show you how to start monitoring your Node.js application with PM2 Plus.

We will assume that your app is already started or wrapped by PM2. If not, follow the [PM2 Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %}) tutorial.

## Create an account

Register [here](https://id.keymetrics.io/api/oauth/register).

## Connect your server to the dashboard

Connect your server to your dashboard and start collecting metrics with:

```bash
pm2 link <secret> <public>
```

Or, if you don't have access to the CLI, add `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY` environment variables set with your public and private keys.

 Use the `Link an app` help on the top left of your dashboard
{: .tip}

## Install CPU/Memory profiling

### g++

You must have `g++` installed:

On Linux, enter `sudo apt-get install build-essential`.

On Mac, enter `g++` in terminal and then follow the instructions.

### CPU/Memory profiler

Use the PM2 installer:

```bash
pm2 install profiler
```

Then reload your application to enable the profiler:

```bash
pm2 reload all
```

## You are done

Go back to the dashboard, you will have access to realtime metrics of your app.

![dashboard view]({{ site.baseurl }}{% link img/plus/unified.png %})

## Next Steps

[Configuration]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})
{: .btn-stylized}







