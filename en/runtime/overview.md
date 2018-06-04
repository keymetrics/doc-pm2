---
layout: page
title: Overview | PM2 Documentation
menu: starter
lang: en
section: runtime
redirect_from:
- "/runtime/overview"
- "/en"
---

# Overview

Why use PM2 ? At the end of this overview, you will better understand the benefits of using PM2 as a process manager.

---

## Forever Alive

Once started, your app is forever alive, auto-restarting across crashes and machine restarts.

This as simple as running:
```bash
pm2 start app.js
```

[Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %})


---

## Process Management

All your applications are run in the background and can be easily managed.

pm2 creates a list of processes, that you can access with:

```bash
pm2 ls
```

![pm2 listing]({{ site.baseurl }}{% link img/runtime/pm2ls.png %})

Manage your process list with `pm2 start` and `pm2 delete`.

Once added to your process list, manage a process with `pm2 start`, `pm2 stop`, `pm2 restart`.

[Process Management]({{ site.baseurl }}{% link en/runtime/guide/process-management.md %})


---

## Log Management

All app logs are saved in the hard disk of your servers into `~/.pm2/logs/`.

```bash
pm2 logs
```

[Log Management]({{ site.baseurl }}{% link en/runtime/guide/log-management.md %})


---

## Zero-config Load-Balancer

pm2 scales up your app by creating multiple child processes that all share the same server ports. Doing this, you can restart your app with zero-seconds downtimes.

Start clusterize your app with:
```bash
pm2 start -i max
```

[Load Balancing]({{ site.baseurl }}{% link en/runtime/guide/load-balancing.md %})

---

## In-terminal monitoring

Monitor your app in the terminal to check your app health (CPU usage, memory used, request/min and more).

```bash
pm2 monit
```

![Local monitoring with PM2]({{ site.baseurl }}{% link img/runtime/monit.png %})

---

## Easy deploy with SSH

Automate your deployment and don't ssh in all your servers one by one.

```bash
pm2 deploy
```

[Easy deploy with SSH]({{ site.baseurl }}{% link en/runtime/guide/easy-deploy-with-ssh.md %})

---

## Next steps

[Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %})

---

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on the [PM2 github repository](https://github.com/Unitech/pm2/issues).
