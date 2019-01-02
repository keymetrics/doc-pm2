---
layout: page
title: Quick Start | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/quick-start/"
---

# Quick Start

In seconds, this Quick Start tutorial will show you how to start monitoring your Node.js application with PM2 Plus.

We will assume that your app is already started or wrapped by PM2. If not, follow the [PM2 Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %}) tutorial.

## Create an account

You can create a PM2 plus accoutn by registering [here](https://id.keymetrics.io/api/oauth/register) or juste by typing ```pm2 plus``` in your terminal.

Then just simply follow the in-app tutorial
![Wizard](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/wizard/step1.png)


## Connect your server to the dashboard

Connect your server to your dashboard and start collecting metrics with:

```bash
pm2 link <secret> <public>
```

Or, if you don't have access to the CLI, add `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY` environment variables set with your public and private keys.

Use the `conncet` button on the top right of your dashboard to find your `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY`
{: .tip}


## You are done

Go back to the dashboard, you will have access to realtime metrics of your app.

![dashboard view](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/overview/servers_overview.png)

## Next Steps

[Configuration]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})
{: .btn-stylized}







