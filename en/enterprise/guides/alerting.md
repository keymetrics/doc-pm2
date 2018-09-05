---
layout: page
title: Alerting | Guides | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
hide_comments: true
redirect_from: "/enterprise/guides/alerting"
---

# Alerting Feature

This document present the alerting feature and explain how to configure it.

## Requirements

In the following documention, we assume that you already have connected your application to PM2 Enterprise (either on-premise and cloud).
We also assume that you know how custom metrics and customs actions works.

## Overview

<br>
<p align="center">
    <img width="70%" src="{{ site.baseurl }}/img/enterprise/alert_global.png" alt="alert feature">
</p>

This feature allow to get alerted when a metric goes above a specific treshold that you configured.
You can configure different conditions to trigger the alert :
  - Metric: Choose the metric value that will be watched
  - Operator: Choose the operator that the value will be checked against (available: > < = <= =>)
  - Treshold: Choose the value to not go above or under
  - Window: Choose how much time we will use the compute the average from
  - Application Name: only trigger for application with a specific name
  - Server Name: only trigger for application that are in a specific server

When a alert is triggered, you can choose different `Actions` to run :

  - Send an email: Choose the people in your bucket to send the alert to
  - Send a slack message: Set the webhook URL used to post the message
  - Send a webhook: Set the URL used to post the message
  - Run a custom action: Trigger a custom action inside the application that triggered the alert

Note: You can add actions as much as you want, they will all be run. Note that they are all launched in parralel and don't respect any order.

## Common Questions

* If i choose a custom action, where will it be run ?
  
  The alerting engine will send the custom action do all processes that have gone above the treshold automatically, you can't configure which process will receive it or not.

* I filter by the application name and i received multiples emails at the same time for the same name, how is that possible ?

  If you have an application is on multiple server or even if the application is in cluster mode, you will receive an different alert for each process on every server that match the alert's condition.

## Common Issues

* It didn't trigger an alert when it should have done !

  The worker that check for metric that goes above a specific threshold use the `window` to compute the average, it may have been too big to get a average above the treshold, you should try lowering it. Note that the minimum window is `60` seconds.

If you have any issue regarding the feature, please contact us at tech@pm2.io