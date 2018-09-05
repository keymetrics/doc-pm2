---
layout: page
title: Log Storage | Guides | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
hide_comments: true
redirect_from: "/enterprise/guides/log"
---

# Log Storage Feature

This document present the log feature and explain how to enable it on your applications

## Requirements

In the following documention, we assume that you already have connected your application to PM2 Enterprise (either on-premise and cloud).
We also assume that you know how the ecosystem file works.

## Overview

<br>
<p align="center">
    <img width="90%" src="{{ site.baseurl }}/img/enterprise/logs.png" alt="logs feature">
</p>

This feature allow to store all of your application logs directly in PM2 Enterprise so you can retrieve them later to inspect them.
It take the standard output / standard error and forward them to the product to be stored.

To use the feature, you need to configure that you want the logs of the application, **by default the logs aren't stored**

## Installation

### Using an ecosystem

When using an ecosystem, you can tell to our Agent to forward all the logs using this configuration :

```js
{
  "apps": [
    {
      "name": "my-application",
      "script": "index.js",
      "broadcast_logs": true // set it to true
    }
  ]
}
```

### Using an environment variable

When launching your app with the CLI, you can add an environment variable to tell our agent to forward the logs : 

```bash
BROADCAST_LOGS=1 pm2 reload app --update-env
```

You can also set it directly inside your dockerfile with the `ENV` instruction : 

```docker
FROM node:10-alpine

# add pm2
RUN npm install -g pm2 2> /dev/null

# broadcast all the logs
ENV BROADCAST_LOGS 1

# ....
# copy the files and install all the dependencies
# ....

CMD [ "pm2-runtime", "app.js" ]

```

## Common Questions

* Can i forward my logger to PM2 Enterprise ? (in the case of winston for example)
  
  No, we currently only support sending the `stdout` and `stderr` of the process, in the winston case just tell him to output to the console

* Do i need to use `pm2` or `pm2-runtime` to send the logs ?
  
  Currently yes, we only support sending the logs when the application is managed by `pm2`

* Can i search in those logs ?
    
  You cannot search in all your logs for a specific string for now, however if you fetch logs in the frontend application, you will be able to  search inside them via the filter at the top

* Is it aggregated by app or server ?
  
  You must first choose an application before going into the log feature so you only be able to get the log for one app at the same time. However we show you the log for all the servers, you can see the details at the left side (Date, Server, Process id)

## Common Issues

* I can't see any logs in PM2 Enterprise !

  You first need to check if the connection is working between the agent and PM2 Enterprise, we advise to run `pm2 unlink` and then `pm2 plus <private> <public>` to make sure the connection is fine.
  You also need to be sure that the environment variable is correctly set, you can restart your app with `--update-env` to make sure its correctly updated.

If you have any issue regarding the feature, please contact us at tech@pm2.io