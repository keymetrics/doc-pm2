# Monitor your Node.js app in a cloud provider

In seconds, this tutorial will show you how to monitor a node.js application with `pm2` and a cloud provider.

We assume that your app has already been wrapped with pm2. If not, follow the [cloud provider tutorial](/runtime/integration/cloud-providers.md).

---

## Create an account

Register [here](https://app.keymetrics.io/api/oauth/register).

---

## Link your app with pm2 Monitoring

In order to connect pm2 to the dashboard, you need to add your public and private keys in the environment.

```bash
export PM2_PUBLIC_KEY="YYYYY"
export PM2_SECRET_KEY="XXXXXXXXX"
pm2 update
```

---

## Set the server name in pm2 Monitoring

Set the `PM2_MACHINE_NAME` environment variable to specify a server name:

```bash
export PM2_MACHINE_NAME="my-cloud-provider-server"
```

?> The default server name is the hostname (`HOST` environment variable) with a random string.

?> Be careful, in case of duplicate hostnames the dashboard will receive data from both instances and flicker.

---

## Next step

Complete your [dashboard configuration](/monitoring/guide/configuration.md)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.