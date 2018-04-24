---
layout: page
title: Quick Start | PM2 Documentation
menu: starter
lang: en
redirect_from: "/process-manager/quick-start"
---

# Quick Start

In seconds, this Quick Start tutorial will show you how to set up to production a node.js application with pm2.

---

## Installation

With yarn:
```bash
yarn global add pm2
```

With npm:
```bash
npm install pm2 -g
```

With debian, use the install script:

```bash
apt update && apt install sudo curl && curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
```

With docker, follow this [tutorial]({{site.baseurl}}{% link en/process-manager/integration/docker.md %}).

### CLI autocompletion

We recommend you to install the CLI autocompletion:

```bash
pm2 completion install
```

---

## Manage multiple processes

pm2 keeps a list of your processes to be able to start, restart and stop them easily.

### Process list

Manage your process list with few commands:

```bash
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```

?> Default process name is the filename without `.js` (eg: `app` for `app.js`). Use `--name`or `-n` to change.

### Routine

Once setup your process list, every day actions only use the process name.

```bash
# stop the process (kill the process but keep it in the process list)
pm2 stop app

# start the process
pm2 start app

# both stop and start
pm2 restart app
```

You can also setup a [startup script]({{site.baseurl}}{% link en/process-manager/guide/startup-hook.md %}), to automatically start your process list at machine restart.

---

## Access your logs

Access your logs in **realtime** with `pm2 logs app`.

Consult your logs **history** files in the `~/.pm2/logs` folder.

---

## Clusterize

The cluster mode scales your app accross all CPUs available, without any code modifications.

?> Before using the load balancer, make sure your application is stateless, meaning that no local data is stored in the process (sessions/websocket connections, session-memory and related).

To start in cluster mode, pass the -i option followed by the number of clusters that you want:

```bash
pm2 start app.js -i 4
```

or, to automatically detect number of CPUs available:

```bash
pm2 start app.js -i max
```

Use reload instead of restart for 0-second-downtime reloads:

```bash
pm2 reload app
```

---

## Do more with the CLI

Using tabulation, you can use the autocompletion:

![pm2 autocompletion]({{site.baseurl}}{% link img/process-manager/autocomplete.png %})

Use `--help`to get more information on a command:

![pm2 help]({{site.baseurl}}{% link img/process-manager/help.png %})

---

## Next steps

[Ecosystem File]({{ site.baseurl }}{% link en/process-manager/guide/ecosystem-file.md %})

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
