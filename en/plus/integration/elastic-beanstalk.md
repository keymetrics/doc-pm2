---
layout: page
title: Elastic Beanstalk | Integration | Keymetrics Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/integration/elastic-beanstalk"
---

# Monitor your Node.js app in AWS Elastic Beanstalk

In seconds, this tutorial will show you how to monitor a Node.js application with Keymetrics in AWS Elastic Beanstalk.

We assume that your app has already been wrapped with PM2. If not, follow our [PM2 AWS Elastic Beanstalk Tutorial]({{site.baseurl}}{% link en/process-manager/integration/elastic-beanstalk.md %}).

---

## Create an account on Keymetrics

You can register [here](https://app.keymetrics.io/api/oauth/register).

---

## Link your app with Keymetrics

In order to connect PM2 to the dashboard, you need to add your public and private keys in the environment.

Inject your keys into your eb environment:
```bash
eb setenv PM2_PUBLIC_KEY=YYYYY PM2_SECRET_KEY=XXXXXXXX
```

?> You can access your keys at the top right of your dashboard

!> We unadvise to use the ecosystem file to set your keys into your environment, doing so your ecosystem file can stay public

---

## Set the server name in Keymetrics

Set the `PM2_MACHINE_NAME` environment variable to specify a server name:

```bash
eb setenv PM2_MACHINE_NAME=aws-eb-server
```

?> The default server name is the hostname (`HOST` environment variable) with a random string.

?> Be careful, in case of duplicate hostnames the dashboard will receive data from both instances and flicker.

---

## Next step

Complete your [dashboard configuration]({{site.baseurl}}{% link en/plus/guide/configuration.md %})

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.