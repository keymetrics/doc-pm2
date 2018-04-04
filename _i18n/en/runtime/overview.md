# Overview

Why use pm2 ? At the end of this overview, you will better understand the benefits of using pm2 as a process manager.

---

## Forever Alive

Once started, your app is forever alive, auto-restarting across crashes and machine restarts.

This as simple as running:
```bash
pm2 start app.js
```

---

## Process Management

All your applications are run in the background and can be easily managed.

pm2 creates a list of processes, that you can access with:

```bash
pm2 ls
```

![pm2 listing](/runtime/overview/pm2ls.png)

Manage your process list with `pm2 start` and `pm2 delete`.

Once added to your process list, manage a process with `pm2 start`, `pm2 stop`, `pm2 restart`.

---

## Logs Management

All app logs are saved in the hard disk of your servers into `~/.pm2/logs/`.

```bash
pm2 logs
```

---

## Zero-config Load-Balancer

pm2 scales up your app by creating multiple child processes that all share the same server ports. Doing this, you can restart your app with zero-seconds downtimes.

Start clusterize your app with:
```bash
pm2 start -i max
```

---

## In-terminal monitoring

Monitor your app in the terminal to check your app health (CPU usage, memory used, request/min and more).

```bash
pm2 monit
```

![local monitoring with pm2](/runtime/overview/monit.png)

---

## Easy deploy with SSH

Automate your deployment and don't ssh in all your servers one by one.

```bash
pm2 deploy
```

---

## Next steps

[Quick Start](/runtime/quickstart/)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.



