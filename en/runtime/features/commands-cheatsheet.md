---
layout: page
title: Multiple PM2 Runtime | Features | PM2 Documentation
description: PM2 Inception
lang: en
section: runtime
permalink: "/en/runtime/features/commands-cheatsheet/"
---

## CheatSheet

### Start an app

```bash
$ pm2 start app.js
```

### Start and auto-restart on file change

```bash
$ pm2 start app.js --watch [--watch-ignore /*/]
```

### Show infos

```bash
$ pm2 show <app_name>
```

### List apps

```bash
pm2 list
```

### Restart

```bash
$ pm2 restart app
```

### Restart and update env

```bash
$ NODE_ENV=production pm2 restart app --update-env
```

### Stop

```bash
$ pm2 stop app
```

### Delete

```bash
$ pm2 delete app
```

### Show logs

```bash
$ pm2 logs
```

### Show env

```bash
$ pm2 env <pm_id>
```

### Set a name

```bash
$ pm2 start app.js --name="name"
# or update name
$ pm2 restart app --name="new-name"
```

### Reset Restart Counters

```bash
$ pm2 reset all
```

### Monitoring

```bash
$ pm2 monitor
```

### Dump all process data

```bash
$ pm2 prettylist
# or
$ pm2 show <pm_id|app_name>
```
