---
layout: page
title: Quick Start | PM2 Documentation
menu: starter
lang: en
section: runtime
redirect_from: "/runtime/quick-start"
---

# Quick Start

In seconds, this Quick Start tutorial will show you how to set up to production a Node.js application with PM2.

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

With docker, follow this [tutorial]({{ site.baseurl }}{% link en/runtime/integration/docker.md %}).

### CLI autocompletion

Complete your installation with the CLI autocompletion:

```bash
pm2 completion install
```

---

## Manage multiple processes

PM2 keeps a list of your processes to be able to start, restart and stop them easily.

All your app are started in the background, letting you access to the command line. Use the PM2 CLI to interact with your apps.

### Process list

Add processes to your process list with the start and delete commands.

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

Once in your process list, use the process name to interact with your application.

```bash
# stop the process (kill the process but keep it in the process list)
pm2 stop app

# start the process
pm2 start app

# both stop and start
pm2 restart app
```

You can then setup a [startup script]({{ site.baseurl }}{% link en/runtime/guide/startup-hook.md %}), to automatically start your process list across machine restarts.

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

Use reload instead of restart for 0-seconds downtime reloads:

```bash
pm2 reload app
```

---

## Do more with the CLI

Use the tabulation to autocomplete and discover new commands:

![pm2 autocompletion]({{ site.baseurl }}{% link img/runtime/autocomplete.png %})

Use the `--help` flag to get more informations:

![pm2 help]({{ site.baseurl }}{% link img/runtime/help.png %})

---

## Next steps

[Ecosystem File]({{ site.baseurl }}{% link en/runtime/guide/ecosystem-file.md %})

---

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on the [PM2 github repository](https://github.com/Unitech/pm2/issues).