---
layout: page
title: Heroku | Integration | PM2 Documentation
menu: starter
lang: en
section: process-manager
redirect_from: "/process-manager/integration/heroku"
---

# Using PM2 with Heroku

This page will guide you step by step through the PM2 integration with Heroku.

We will use Git and the Heroku CLI.

---

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
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

?> Learn more about ecosystem file [here]({{ site.baseurl }}{% link en/process-manager/guide/ecosystem-file.md %}).

We recommend to use the cluster mode with Heroku, as each dyno has multi-core CPU.

?> Learn more about the [cluster mode]({{ site.baseurl }}{% link en/process-manager/guide/load-balancing.md %}).

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

---

## Deploy with Heroku

### Create an account on Heroku

Sign up for an account on Heroku [here](https://signup.heroku.com/).

### Install the CLI

Follow the instructions to install [here](https://devcenter.heroku.com/articles/heroku-cli).

Then, run `heroku login` to connect the CLI to your account.

### Init your Heroku app

We will first create a new empty application on Heroku and an associated empty Git repository.

Run this command from your app root folder:
```bash
heroku create

Creating app... done, ⬢ guarded-island-32432
https://guarded-island-32432.herokuapp.com/ | https://git.heroku.com/guarded-island-32432.git
```

You now have a new git remote named `heroku`. If you push to this repository, your code is automatically deployed at the given URL.

### Deploy your app on Heroku

Add and commit all your changes, then run:

```bash
git push heroku master
Initializing repository, done.
updating 'refs/heads/master'
remote: Compressing source files... done.
remote: Building source:
...
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/aqueous-temple-78487.git
```

## You are ready

That's all! The last line of the deployment will give you the URL where your app is available.

---

## Next step

Complete your configuration with the [Ecosystem File]({{ site.baseurl }}{% link en/process-manager/guide/ecosystem-file.md %})

Monitor your app on a web dashboard, with [Keymetrics]({{ site.baseurl }}{% link en/plus/integration/heroku.md %})

---

### Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
