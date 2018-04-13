---
layout: page
title: Process Management | Guide | PM2 Documentation
menu: starter
lang: en
redirect_from: "/runtime/guide/process-management"
---

# Process management

pm2 is a process kept in the background, a daemon, that takes care of all your running processes.

We'll learn how to manage process with pm2 and discover a key concept : the process list.

---

## The process list

The process list is where all running applications are registered.

Manage your process list in a few commands:

```bash
# start and add a process to your list
pm2 start app.js

# show your list
pm2 ls

# stop and delete a process from the list
pm2 delete app
```

When you use `pm2 start app.js`, two actions are performed:
- the app is registered in the process list of pm2
- the app is started in the background.

?> Default name in the process list is the name of the script without his extension. Use `--name`or `-n` to change.

---

## Routine

Once setup your process list, every day actions are done with the process name.

```bash
# kill the process but keep it in the process list
pm2 stop app

# start the process again
pm2 start app

# both stop and start
pm2 restart app
```

Multiple app can be specified at once:
```bash
pm2 restart app1 app2 app3
```

Or, shorter with a regexp:
```bash
pm2 restart /app/
```

---

## Save your process list

You can save and resurrect your process list with:

```bash
# save your list in hard disk memory
pm2 save

# resurrect your list previously saved
pm2 resurrect
```

?> Your process list is saved into `$HOME/.pm2/dump.pm2`.

You can then setup a [startup script]({{site.baseurl}}/runtime/guide/installation?id=install-a-startup-script), to automatically start your process list through machine restarts.

---

## Manage any application type

pm2 is compatible with other programming languages, using this equivalence:

```json
{
  ".sh": "bash",
  ".py": "python",
  ".rb": "ruby",
  ".coffee": "coffee",
  ".php": "php",
  ".pl": "perl",
  ".js": "node"
}
```

?> Without extension, the app is started as a binary file.

To start a script in python for example, use:

```bash
pm2 start echo.py
```

If you want to specify the path of an interpreter, specify it in your ecosystem file:

```javascript
module.exports = {
  "apps" : [{
    name: "script",
    script: "./script.py",
    interpreter: "/usr/bin/python",
  }]
}
```

---

## Local Monitoring

The local monitoring tool get you insight about CPU usage, memory usage, loop delay or request/min for each process:

```bash
pm2 monit
```

![pm2 local monitoring]({{site.baseurl}}/img/runtime/monit.png)

---

## Next step

[Log Management]({{site.baseurl}}/runtime/guide/log-management/)

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
