---
layout: page
title: Installation | Guide | PM2 Plus Documentation
menu: starter
lang: en
redirect_from: "/monitoring/guide/installation"
---

# Installation

We assume that your app have been started with pm2 Runtime. If not, follow the [Quick Start](runtime/quickstart.md) tutorial.

---

## Create an account

Register [here](https://app.keymetrics.io/api/oauth/register).

---

## Connect your server to the dashboard

Connect your server to your dashboard and start collecting metrics with:

```bash
pm2 link <secret> <public>
```

or, if you don't have access to the CLI, add the `PM2_PUBLIC_KEY` and `PM2_SECRET_KEY` environment variables with your public and private keys.

?> The secret and public keys can be found at the top right of your dashboard

### If you are behind a company proxy/firewall

In order to make Keymetrics works, ensure that this ports are open:
- 80 (TCP outbound)
- 443 (HTTPS outbound)
- 43554 (TCP outbound)

If you also need to whitelist IP adresses, allow these ones:
163.172.76.240, 62.210.94.153, 195.154.156.78, 62.210.100.99, 62.210.102.213, 62.4.21.42, 62.4.21.98 and 163.172.20.79.

---

## Install CPU/Memory profiling

### g++

You must have `g++` installed:

On Linux, enter `sudo apt-get install build-essential`.

On Mac, enter `g++` in terminal and then follow the instructions.

### CPU/Memory profiler

Use the pm2 installer :

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

![dashboard view]({{site.baseurl}}/img/monitoring/unified.png)

---

## Next steps

[Configuration]({{ site.baseurl }}{% link en/monitoring/guide/configuration.md %})

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support