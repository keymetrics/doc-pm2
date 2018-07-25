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

Re-Run `pm2 link` on your server and refresh your browser.

### Make sure your firewall is properly configured

Make sure that the ports 80 (TCP outbound), 443 (HTTPS outbound) and 43554 (TCP outbound) are allowed on your firewall.

If you need to whitelist IPs, please allow these ones: 62.210.102.213, 163.172.76.240, 62.4.21.98, 163.172.253.187, 163.172.67.152, 195.154.79.25, 195.154.79.34

### Make sure that you use the latest PM2 Runtime version

[Updating PM2](https://pm2.io/doc/en/runtime/guide/installation/#update)

## Dashboard issues

### Servers are blinking

Make sure that each PM2 runtime has a different name when linking to PM2 plus via:

```
$ pm2 plus xxxx yyyy [SERVER_NAME]
````

Also make sure you have only one PM2 instance launched `ps -ax | grep PM2`

## Security & Data Transfer

### What information is sent from PM2 runtime to PM2 plus?

- **Process**: pm_id, pid, app name, restart_time, created_at, watch mode, uptime, cpu, memory, NODE_ENV, versioning informations, custom actions, custom metrics
- **Server**: Hostname, internal ip, server_name, load average, free mem, used mem, cpu infos, username, platform, pm2_version, pm2_agent_version, node version

### How is the data transfered from PM2 runtime to PM2 plus?

Data is ciphered while transfered into network (HTTPS and AES256). Data stored in database is normalized but each bucket has his own database (with database name ciphered).

### How do PM2 plus handle payments?

We use Stripe as our payment system, we never store any informations about credit cards used on PM2 plus.

## Billing and settings Issues

### Transfer ownership

To Transfer ownership, you must create a free account with the next owner email and add credit card details.

Then with the current owner email, you must connect to the concerned bucket and in the Settings menu, in General, you must click on the Action TRANSFER OWNERSHIP and enter the next owner email.

The new owner will be notified by email and the bucket will be from now on locked to his email and credit card details as the owner.



To fix this:

```
# Server 1
$ pm2 link <private_id> <public_id> server1

# Server 2
$ pm2 link <private_id> <public_id> server2
```






