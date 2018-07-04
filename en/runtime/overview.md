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

<p align="center">
    <img width="450px" src="{{ site.baseurl }}/img/runtime/runtime-black.png" alt="pm2 logo">
</p>
<p align="center">
    <b>P</b>(rocess) <b>M</b>(anager) <b>2</b><br/>
    <i>Runtime</i>
</p>

# Overview

Why use PM2 ? At the end of this overview, you will better understand the benefits of using PM2 as a process manager.

## Forever Alive

Once started, your app is forever alive, auto-restarting across crashes and machine restarts.

This is as simple as running:
```bash
pm2 start app.js
```

[Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %})
{: .btn-stylized}
{: .btn-stylized}

## Process Management

![pm2 listing]({{ site.baseurl }}{% link img/runtime/pm2ls.png %})

All your applications are run in the background and can be easily managed.

PM2 creates a list of processes, that you can access with:

```bash
pm2 ls
```

Add and delete processes to your process list with `pm2 start` and `pm2 delete`.

Manage your processes with `pm2 start`, `pm2 stop`, `pm2 restart`.

[Process Management]({{ site.baseurl }}{% link en/runtime/guide/process-management.md %})
{: .btn-stylized}


## Log Management

Application logs are saved in the hard disk of your servers into `~/.pm2/logs/`.

Access your realtime logs with:

```bash
pm2 logs <app_name>
```

[Log Management]({{ site.baseurl }}{% link en/runtime/guide/log-management.md %})
{: .btn-stylized}


## Zero-config Load-Balancer

PM2 can scale up your application by creating several child processes that share the same server port. Doing this also allow you to restart your app with zero-seconds downtimes.

Start in cluster mode with:
```bash
pm2 start -i max
```

[Load-Balancing]({{ site.baseurl }}{% link en/runtime/guide/load-balancing.md %})
{: .btn-stylized}

## In-terminal monitoring

![Local monitoring with PM2]({{ site.baseurl }}{% link img/runtime/monit.png %})

You can monitor your app in the terminal and check app health (CPU usage, memory used, request/min and more).

```bash
pm2 monit
```

## Easy deploy with SSH

Automate your deployment and avoid to ssh in all your servers one by one.

```bash
pm2 deploy
```

[Easy deploy with SSH]({{ site.baseurl }}{% link en/runtime/guide/easy-deploy-with-ssh.md %})
{: .btn-stylized}

## Next Steps

[Quick Start]({{ site.baseurl }}{% link en/runtime/quick-start.md %})
{: .btn-stylized}
