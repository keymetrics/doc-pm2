---
layout: page
title: Installation | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/guide/installation/"
---

# Installation

We assume that your app have been started with PM2. If not, follow the [Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %}) tutorial.

## Create an account

Register [here](https://id.keymetrics.io/api/oauth/register).

## Connect your server to the dashboard

Connect your server to your dashboard and start collecting metrics with:

```bash
pm2 link <secret> <public>
```

or, if you don't have access to the CLI, add the `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY` environment variables with your public and private keys.

 The secret and public keys can be found at the top right of your dashboard
{: .tip}

### If you are behind a company proxy/firewall

Starting from PM2 3.2, we changed the networking connection by using a direct Websocket connection to our server on the port 443, so you only need OUTBOUND on port 443 TCP open. If you are using an older version, we of course advise to update but the ports that you need to open are 80 (TCP outbound), 443 (HTTPS outbound) and 43554 (TCP outbound), so verify everything is allowed on your firewall.

You also may need to whitelist IPs, please allow these ones: 62.210.102.213, 163.172.76.240, 62.4.21.98, 163.172.253.187, 163.172.67.152, 195.154.79.25, 195.154.79.34

## Install CPU/Memory snapshot


### Starting from Node 10

When using Node 10, all profilers are available out of box without installing anything.

### Node 8.X and 9.X

The profilers are available but you need to explicity enable them using the environement variable `FORCE_INSPECTOR` set to `1`.
You have different way to enable them : 

```
FORCE_INSPECTOR=1 pm2 reload app --update-env
```
```
export FORCE_INSPECTOR=1
pm2 reload app --update-env
```

In a persistent way:
```
echo "FORCE_INSPECTOR=1" >> /etc/environment
source /etc/environment
pm2 reload app --update-env
```

Or you can add it inside your `ecosystem.json` file.

### For older version (Node 4, 6, 7)

**NOTE:** We advise to use the latest version of nodejs to profile your applications since the profilers are native and a lot more stable.

You must have `g++` installed:

- For Linux, enter `sudo apt-get install build-essential`.
- For macOS, enter `g++` in terminal and then follow the instructions.

Then you must install the addon used to profile your application :
```bash
pm2 install profiler
```

Then reload your application to enable the profiler:

```bash
pm2 reload all
```

## You are all set

Go back to the dashboard, you have now access to realtime metrics of your app.

![dashboard view]({{ site.baseurl }}{% link img/plus/unified.png %})

## Next Steps

[Configuration]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})
{: .btn-stylized}
