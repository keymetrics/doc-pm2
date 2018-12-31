---
layout: page
title: Installation | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
permalink: "/en/plus/guide/server-apps-overview/"
---

# Presentation

There are 2 main types of overview in PM2 Plus, one is server centric, the other one is App centric. You can jump from one to the other by using the ```"ctrl + K"``` shortcut or just by switching the view in the left sidebar menu.

Let's take this example of architechure
```
└──[SERVER] demo-server-1
    └── demo-application
    └── demo-application
    └── demo-application
└──[SERVER] demo-server-2
    └── demo-application
    └── demo-application
    └── demo-application
```

In the server overview you will see 2 servers and in the apps overview you will only see one app named "demo-application".

## Server Overview

![cpu profiling]({{ site.baseurl }}{% link img/plus/server.png %})
This view is breakdown by server, in our example, we will have 2 servers in this view. 

In the top bar of this section you will find infos about the actual server
- The Server's Name
- Number of cores and memory
- Versions of Node.js & PM2
- The interal and pulic IP

You are able to get realtime infos about a server such as
- CPU
- MEMORY
- HTTP Latency
- Issues 
- Event Loop Lag 
- Number of restarts
- Custom metrics

There also a small action pannel, from where you can enhance
- Logs Display
- Metadata Reset
- Reload the app
- Custom action 

## Apps Overview

![cpu profiling]({{ site.baseurl }}{% link img/plus/apps.png %})
This view is application centric view, in our previous exmaple you will get only one app : "demo-app"
It contains a various of elements like
- Health History Heatmap
- Error history and error rate
- Latency 
- Request / minutes 
- RAM
- CPU

If you click on the heatmap, you will directly go on the app dashboad which is discribed in the following dashboard.

## App Dashboard

![Dashboard](https://raw.githubusercontent.com/keymetrics/branding/master/screenshots/plus/dashboard/dashboard.png)

This is an app centric dashboard, this will give you the infos you need about one app in particular.

If we take our initial example, you will find cross-servers information about "demo-application". This view will give you kind of a mix of metrics that are found previously in apps and server views.

## Next Steps

[pm2/io Configuration]({{ site.baseurl }}{% link en/plus/guide/configuration.md %})
{: .btn-stylized}
