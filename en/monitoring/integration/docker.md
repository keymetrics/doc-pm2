---
layout: page
title: Quick Start with PM2
menu: starter
lang: en
redirect_from: "/runtime/quick-start.html"
---

# Monitor your Node.js app in a Docker container

In seconds, this tutorial will show you how to monitor a node.js application with `pm2` inside a container.

We assume that your app has already been wrapped with pm2. If not, follow the [docker tutorial]({{site.baseurl}}/runtime/integration/docker.md).

---

## Create an account

Register [here](https://app.keymetrics.io/api/oauth/register).

---

## Install the profiler

Add this to your Dockerfile to install the profiler:

```Dockerfile
RUN pm2 install profiler
```

---

## Link your app with pm2 Monitoring

In order to connect pm2 to the dashboard, you need to add your public and private keys in the environment.

Create a .env file with:
```.env
PM2_SECRET_KEY=XXXXX
PM2_PUBLIC_KEY=YYYYY
```
and restart your container with `docker run`adding `--env-file .env` to load the environment variables.

---

## Set the server name in pm2 Monitoring

Set the `PM2_MACHINE_NAME` environment variable to specify a server nam. Add this to the .env file:

```.env
PM2_SECRET_KEY=XXXXX
PM2_PUBLIC_KEY=YYYYY
PM2_MACHINE_NAME=docker-server
```

?> The default server name is the hostname (`HOST` environment variable) with a random string.

?> Be careful, in case of duplicate hostnames the dashboard will receive data from both instances and flicker.

---

## Next step

Complete your [dashboard configuration]({{site.baseurl}}/monitoring/guide/configuration.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.



### Use Keymetrics.io dashboard

[Keymetrics.io](https://keymetrics.io/) is a monitoring service built on top of PM2 that allows to monitor and manage applications easily (logs, restart, exceptions monitoring, etc...). Once you created a Bucket on Keymetrics you will get a public and a secret key.

To enable Keymetrics monitoring with pm2-runtime, you can whether use the CLI option –public `XXXX` and –secret `YYYY` or you can pass the environment variables `KEYMETRICS_PUBLIC` and `KEYMETRICS_SECRET`.

From your Node.js app project folder launch those commands:

```bash
$ docker build -t your-app-name .
$ docker run -e KEYMETRICS_PUBLIC=XXXX -e KEYMETRICS_SECRET=YYYY your-app-name
```

Make sure that the ports 80 (TCP outbound), 443 (HTTPS outbound) and 43554 (TCP outbound) are allowed on your firewall.

See the [troubleshooting](http://docs.keymetrics.io/docs/pages/faq-troubleshooting/#troubleshooting-for-keymetrics-pm2) in case you encounter any problem.