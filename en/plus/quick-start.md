---
layout: page
title: Installation | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/quick-start/"
---

# Installation

In seconds, this Installation tutorial will show you how to start monitoring your Node.js application with PM2 Plus.

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

Use the `connect` button on the top right of your dashboard to find your `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY`
{: .tip}


## You are done

Go back to the dashboard, you will have access to realtime metrics of your app.

![dashboard view](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/overview/server_overview.png)

## Next Steps

[Discover the Dashboard]({{ site.baseurl }}{% link en/plus/guide/server-apps-overview.md %})
{: .btn-stylized}







