# Ecosystem File

When deploying on multiple server or when using multiple CLI arguments, an alternative to the command line become more conveninent for starting your apps.

The purpose of the ecosystem file is to gather options and environment variables of all your applications.

---

## Generate a template

Generate an `ecosystem.config.js` template with:

```bash
pm2 init
```

This will generate:

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

For more information about available properties, check the [ecosystem file reference]({{site.baseurl}}/runtime/references/ecosystem-file/).

---

## Use your ecosystem file

### Routine

Inside the folder, add all the applications to your process list with:

```bash
pm2 start
```

You can also load the ecosystem from an other folder with:

```bash
pm2 start ~/my-app/ecosystem.config.js
```

### Only use a specific app

Use your ecosystem file only on a specific application with the option `--only <app_name>`:

```bash
pm2 start --only app
```

---

## Environment variables

You can declare multiple, each entry must be format according to `env_<environment-name>`.

Here, the `app` process can be start with two environments: `development` and `production`.

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

Select one of them with the `--env` flag:

```bash
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
```

---

## Immutable environment

Once added to your process list, the process environment is immutable.

The process environment is generated when you add a process to your process list, using:
- the current environment
- the ecosystem file

Thus, if you restart your process list having a different current environment or having a new ecosystem file, the process environment doesn't change.

This behavior has been made to ensure consistency across restarts of your app.

### Updating the environment

If you want to force an update, you must use `--update-env` :

```bash
# refresh the environment
pm2 restart ecosystem.config.js --update-env

# switch the environment
pm2 restart ecosystem.config.js --env production --update-env
```

---

## Next step

[Process Management]({{site.baseurl}}/runtime/guide/process-management/)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.