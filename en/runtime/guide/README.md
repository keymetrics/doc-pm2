---
layout: page
title: Quick Start with PM2
menu: starter
lang: en
permalink: "/en/runtime/guide/"
redirect_from: "/runtime/quick-start.html"
---

# Guide

This guide will show you how to install and use pm2 to set up your application to production.

---

## Terminology

Before starting, some terminology we use across this guide:

A **daemon** is a program that is run as a background process. pm2 in essence is a daemon: always alive in the background, it takes care of all your processes, keeping them alive. Also, all your applications started with pm2 are daemonized.

The **process list** is where all your applications along with options and environment are registered. This list simply contains all the processes pm2 has started.

<div>
  <p align="center">[Let's start]({{site.baseurl}}/runtime/guide/installation/)</p>
</div>
