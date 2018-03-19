# FAQ

### Disable logging

You can redirect to '/dev/null' if you don't want to stoe

```javascript
module.exports = {
  apps: [{
      name      : 'API',
      script    : 'server.js',
      'out_file': '/dev/null',
      'error_file': '/dev/null',
    }]
}
```

### Special `ext_type`

- min_uptime
  Value of `min_uptime` can be:
    - **Number**
      e.g. `"min_uptime": 3000` means 3000 milliseconds.
    - **String**
      Therefore, we are making it short and easy to configure: `h`, `m` and `s`, e.g.: `"min_uptime": "1h"` means one hour, `"min_uptime": "5m"` means five minutes and `"min_uptime": "10s"` means ten seconds (those will be transformed into milliseconds).

- max_memory_restart
  Value of `max_memory_restart` can be:
    - **Number**
        e.g. `"max_memory_restart": 1024` means 1024 bytes (**NOT BITS**).
    - **String**
        Therefore, we are making it short and easy to configure: `G`, `M` and `K`, e.g.: `"max_memory_restart": "1G"` means one gigabyte, `"max_memory_restart": "5M"` means five megabytes and `"max_memory_restart": "10K"` means ten kilobytes (those will be transformed into byte(s)).

- Optional values
  For example `exec_mode` can take `cluster` (`cluster_mode`) or `fork` (`fork_mode`) as possible values.

- Things to know
  - `"instances": 0` means that PM2 will launch the maximum processes possible according to the numbers of CPUs (cluster mode)
  - array
  `args`, `node_args` and `ignore_watch` could be type of `Array` (e.g.: `"args": ["--toto=heya coco", "-d", "1"]`) or `string` (e.g.: `"args": "--to='heya coco' -d 1"`)

### Max Memory Restart

PM2 can restart an application reaching a memory limit.

In the cli:

```bash
pm2 start big-array.js --max-memory-restart 20M
```

#### Declaration file

```javascript
module.exports = {
  "apps" : [{
    "name"   : "max_mem",
    "script" : "big-array.js",
    "max_memory_restart" : "20M"
  }]
}
```

#### Programmatic

```
pm2.start({
  name               : "max_mem",
  script             : "big-array.js",
  max_memory_restart : "20M"
}, function(err, proc) {
  // Processing
});
```

#### Units

Units can be K(ilobyte), M(egabyte), G(igabyte).

```
50M
50K
1G
```

### Update

```bash
npm install pm2 -g && pm2 update
```

?> `pm2 update` is necessary in order to refresh the pm2 daemon.

### Folder structure of pm2

All configuration files of pm2 are kept in `$HOME/.pm2`.

Tree structure :
- `$HOME/.pm2/logs` application log files
- `$HOME/.pm2/pids` application pid files
- `$HOME/.pm2/pm2.log` pm2 logs
- `$HOME/.pm2/pm2.pid` pm2 pid
- `$HOME/.pm2/rpc.sock` Socket file for remote commands
- `$HOME/.pm2/pub.sock` Socket file for publishable events
- `$HOME/.pm2/conf.js` pm2 Configuration

If you have a suggestion or if you want to report an issue, please read the troubleshooting process below first. 
If this does not help you please do not hesitate reach out to us on our in app-chat.

## Troubleshooting for Keymetrics/PM2

### I can't seem to connect my local PM2 to the Keymetrics dashboard

If you are in this situation, it might be for several reasons.

- You are behind a company proxy or firewall.
Make sure that the ports 80 (TCP outbound), 443 (HTTPS outbound) and 43554 (TCP outbound) are allowed on your firewall.

If you need to whitelist IPs, please allow these ones: 163.172.76.240, 62.210.94.153, 195.154.156.78, 62.210.100.99, 62.210.102.213, 62.4.21.42,  62.4.21.98 and 163.172.20.79

- You are using an old version of Node.js or PM2.
Make sure you are using at least Node.js v0.12.x or higher (node v0.12.x or iojs v.2.x is recommended).
Make sure you are using the latest version of PM2 https://github.com/Unitech/PM2/releases.

- You have concurrent PM2 sending data to the same bucket with an identical server name.
Make sure you have only one PM2 instance launched `ps -ax | grep PM2`

- Refresh your connection to Keymetrics. `pm2 interact stop` then `pm2 interact` should help. Also don't forget to refresh the dashboard itself, it might help sometimes.

## The dashboard displays "Reverse connection not established"

It means that PM2 have not managed to initialize the full duplex connection. Not any actions will work (restart, pull, module install...).

Please make sure that the port 43554 (TCP outbound) is opened and check the logs in ~/.pm2/agent.log.

Type `pm2 link` to re-try the connection.

## I cannot link new servers but no server is linked at the moment

Go to the setting page of your bucket and delete servers in the server box.

### The versioning buttons (Rollback/Pull/Upgrade) aren't working

- If the buttons are disabled, make sure that the `Local changes` and `Local commit` indicators are green.

- If you get a warning `Not authorized` when trying to perform such actions, it means you have not the admin privileges in this bucket.

- If none of the above happens, but the precedure just hangs, make sure you have a recent version of Node.js as well as the latest version of PM2.

- Also, your repository should not ask for a password input (it means you must clone it via ssh), try typing `git remote update` manually in the folder and see if it asks for a password or not.

### 3. The versioning block displays `File modified (unstaged changes)`

It means that there are local files that has been changed and not committed.

To see which files have been modified do a `git status`. Once it is fixed (via git commit or git stash) do a `pm2 restart all`.

### In the dashboard I've linked two servers and they are continuously flickering

You made a `pm2 link <public_id> <private_id> [name]` without setting the name option. By default if the name is empty, it becomes the $HOSTNAME env variable.

To fix this:

```
# Server 1
$ pm2 link <private_id> <public_id> server1

# Server 2
$ pm2 link <private_id> <public_id> server2
```

## Documentation

[PM2 Documentation](http://pm2.keymetrics.io/)

[Keymetrics Documentation](http://docs.keymetrics.io/)


---
layout: docs
title: Keymetrics pricing FAQ
description: pricing FAQ
permalink: /docs/pages/pricing-faq
---

This page lists the frequently asked questions about the Keymetrics pricing system and the specificities of our plan limitations.

## Process-based pricing

### What is a process?

A 'process' represents a system process, put simply each entry in `pm2 list` is a process.
It can be a worker in a cluster, a app in fork mode or a module.

### What about the cluster mode?

When you use the [cluster mode](http://pm2.keymetrics.io/docs/usage/cluster-mode/) (with `pm2 start -i`) each instance will be counted as a process.
If you start 3 instances of the same application they will all count towards your process plan limit.

### Can I select which processes I want monitored?

Yes, you **need PM2 v2.7.0+**

You can then use the command `pm2 unmonitor [APP_NAME|ID]` to stop monitoring a process via Keymetrics.
When using `pm2 ls` you should see a red dot indicating the application will not be followed by Keymetrics.

If you want to monitor the process again use `pm2 monitor [APP_NAME|ID]`.

### What is a server?

A 'server' represents one linked PM2 instance. Normally, each bare metal server/container/VM have one PM2 instance.

### When does the notification limitation reset?

The counter resets every day at midnight at GMT+1.

### What happens to the notification limit when I upgrade?

When you upgrade the notification counter will be reset.

### What happens to the notification counter when I downgrade?

When you downgrade the notification counter will not be reset to prevent abuse.

### Ports usage

The 80 port is used to push monitoring data from PM2 to Keymetrics.
The 43554 port is used by Keymetrics to send asynchronous command from Keymetrics to PM2.

### User permissions

You can add as many users as you want to your buckets. There are four different roles: User, Developer, Admin and Owner.
Only the Owner can change a user's role.

1. User
  * Has read-only permission on the bucket
  * This is the default role when you add a user

2. Developer
  * This should be assigned to your tech team members as they can do the following:
  * Trigger remote actions (e.g: restart, custom actions)
  * Delete exceptions
  * Delete HTTP monitoring data
  * Subscribe to new events
  * Update alert settings

3. Admin
  * Has the same rights as developer
  * Can add a user to the bucket
  * Can delete a server

4. Owner
  * Cannot be changed
  * Update bucket metadata (name, description...)
  * Can remove users from the bucket
  * Delete the bucket
  * Change user permissions
  * Upgrade the bucket to a premium plan




Else use our sample application:

```bash
$ git clone https://github.com/keymetrics/app-playground.git
$ cd app-playground
$ pm2 start app.js --watch
```

### Security

> How do you protect the data stream between my server and the dashboard ?

Data is ciphered while transfered into network (HTTPS and AES256). Data stored in database is normalized but each bucket has his own database (with database name ciphered).

> What information about our services / servers / applications is collected and sent to your systems?

**Server**: Hostname, IP, Load average, Memory, CPU infos, distribution type
**Applications**: CPU, Memory, PM2 metadata (exec mode, id, restart nb, unstable restart nb, probes, actions name), Git metadata
**Services** (via module system): Custom metrics, Custom actions name (no storage of results)

> Do you adhere to any industry security standards, such as ISO or PCI?

We use [Stripe](https://stripe.com/) as our payment system, we never store any informations about credit cards of our customers. 

> Isn't it risky to allow remote actions triggerable from the dashboard ?

About pm2 actions, a strict list of allowed remote functions are hard-coded into pm2 itself, forbidding any critical actions to be called. This strict list of allowed remote functions are splitted in two packs.

The first one, non-offensive functions like `pm2 restart | reload | gracefulReload` that cannot change deeply the state of your software.

Then the second one, sensitive functions like `pm2 stop | updateDeep | pm2 set [...]`. These sensitive functions can be called from Keymetrics but asks to the one who wants to trigger the function, a password, previously set at PM2 level.

This password, that you configured at the PM2 level via the command `pm2 set pm2:passwd <password>`, is not shared with Keymetrics.

If you however want to forbid remote actions, you can use :

```bash
PM2_REVERSE_INTERACT=false pm2 link
```
