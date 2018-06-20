 Now.sh is actually not supported
{: .warn}

# Using PM2 with Now.sh

This page will guide you step by step through the PM2 integration with Now.sh.

## Prepare your app

### Set your ecosystem file

Generate an `ecosystem.config.js` template with:

```bash
pm2 init
```

Modify the ecosystem file to match your needs:

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

 Learn more about ecosystem file [here]({{ site.baseurl }}{% link en/runtime/guide/ecosystem-file.md %}).
{: .tip}

### Add PM2 as a module

Add pm2 as a dependency to your projet.

With npm:

```bash
npm install --save pm2
```

With yarn:

```bash
yarn add pm2
```

### Set your package.json

In your `package.json`, modify your `start` script like the following:

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"  }
```

## Deploy with Now.sh

### You are ready

You can now deploy your application on Now.sh like you would have done for a regular node.js app.

---

## Next Steps

Complete your configuration with the [Ecosystem File]({{ site.baseurl }}{% link en/runtime/guide/ecosystem-file.md %}).

<!-- Monitor your app on a dashboard, with [PM2 Plus]({{ site.baseurl }}{% link en/plus/integration/now.md %}). -->

---

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on the [PM2 github repository](https://github.com/Unitech/pm2/issues).