---
layout: page
title: FAQ | PM2 Plus Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/faq"
---

# FAQ

If you have a suggestion or if you want to report an issue, please read the troubleshooting process below first. 

## Process-based pricing

### What is a process?

A process is an entry in the process list. Display all your process on a server with `pm2 ls`.

### What is a server?

A server represents one linked PM2 instance. You can have as much server as you want, only the total number of processes is taken into account for the pricing.

### Example

If you have a pro_4 plan, you can have 4 processes monitored.

You can have 4 servers with 1 process on each or 1 server with 4 processes. Only the sum of all processes monitored is taken into account.

### What about the cluster mode?

When you use the cluster mode (with `pm2 start -i max`) each instance is counted as a process and the same rule is applied. If you start 4 instances of the same application, 4 processes are counted.

### How to select the processes to monitor?

You can then use the command `pm2 unmonitor [APP_NAME|ID]` to stop monitoring a process with PM2 Plus.
`pm2 ls` will display a red dot indicating the application will not be monitored by PM2 Plus.

If you want to monitor the process again use `pm2 monitor [APP_NAME|ID]`.

## My PM2 is not connected to the PM2 Plus dashboard

### Refresh all connections

Run `pm2 link` on your server and refresh your browser.

### Are you behind a company proxy or firewall?

Make sure that the ports 80 (TCP outbound), 443 (HTTPS outbound) and 43554 (TCP outbound) are allowed on your firewall.

If you need to whitelist IPs, please allow these ones: 62.210.102.213, 163.172.76.240, 62.4.21.98, 163.172.253.187, 163.172.67.152, 195.154.79.25, 195.154.79.34

### Are you using an old version of Node.js or PM2?

With the last version of PM2 (> 3.0), Node.js is supported starting from 4.0 version.
Upgrade to the last version of PM2 with `npm install -g pm2 && pm2 update`.

If you are using PM2 > 2.0, Node.js is supported starting from 0.12 version.

### New servers can be link even if no server is already linked

Go to the setting page of your bucket and delete servers in the server box.

## Dashboard issues

### Multiple PM2 sending data to the same bucket with an identical server name?

Make sure you have only one PM2 instance launched `ps -ax | grep PM2`

### Dashboard says "Reverse connection not established"

It means that PM2 have not managed to initialize the full duplex connection. Not any actions will work (restart, pull, module install...).

Please make sure that the port 43554 (TCP outbound) is opened and check the logs in `~/.pm2/agent.log`.

Run `pm2 link` to refresh the connection.

### In the dashboard I've linked two servers and they are continuously flickering

You made a `pm2 link <public_id> <private_id> [name]` without setting the name option. By default if the name is empty, it becomes the $HOSTNAME env variable.

To fix this:

```
# Server 1
$ pm2 link <private_id> <public_id> server1

# Server 2
$ pm2 link <private_id> <public_id> server2
```

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on our [support github](https://github.com/keymetrics/keymetrics-support/issues).


