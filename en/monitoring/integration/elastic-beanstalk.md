# Monitor your Node.js app in AWS Elastic Beanstalk

In seconds, this tutorial will show you how to monitor a Node.js application with `pm2` in an AWS Elastic Beanstalk environment.

We assume that your app has already been wrapped with pm2. If not, follow our [AWS Elastic Beanstalk tutorial]({{site.baseurl}}/runtime/integration/beanstalk.md).

---

## Create an account on pm2

You can register [here](https://app.keymetrics.io/api/oauth/register).

---

## Link your app with pm2 Monitoring

In order to connect pm2 to the dashboard, you need to add your public and private keys in the environment.

Inject your keys into your eb environment:
```bash
eb setenv PM2_PUBLIC_KEY=YYYYY PM2_SECRET_KEY=XXXXXXXX
```

?> You can access your keys at the top right of your dashboard

!> We unadvise to use the ecosystem file to set your keys into your environment, doing so your ecosystem file can stay public

---

## Set the server name in pm2 Monitoring

Set the `PM2_MACHINE_NAME` environment variable to specify a server name:

```bash
eb setenv PM2_MACHINE_NAME=aws-eb-server
```

?> The default server name is the hostname (`HOST` environment variable) with a random string.

?> Be careful, in case of duplicate hostnames the dashboard will receive data from both instances and flicker.

---

## Next step

Complete your [dashboard configuration]({{site.baseurl}}/monitoring/guide/configuration.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.