---
layout: page
title: Guide | PM2 Documentation
menu: starter
lang: en
section: runtime
hide_comments: true
permalink: "/en/runtime/guide/"
redirect_from: "/runtime/guide"
---

# Guide

This guide will show you how to install and use PM2 to set up your application to production.

---

## Terminology

Before starting, some terminology we use across this guide:

A **daemon** is a program that is run as a background process. pm2 in essence is a daemon: always alive in the background, it takes care of all your processes, keeping them alive. Also, all your applications started with pm2 are daemonized.

The **process list** is where all your applications along with options and environment are registered. This list simply contains all the processes pm2 has started.

<div>
  <p align="center">[Let's start]({{ site.baseurl }}{% link en/runtime/guide/installation.md %})</p>
</div>
