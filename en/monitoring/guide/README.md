---
layout: page
title: Guide | PM2 Plus Documentation
menu: starter
lang: en
permalink: "/en/monitoring/guide/"
redirect_from: "/monitoring/guide/"
---

# Guide

This guide will get your node.js app monitored by pm2 monitoring in minutes.

### Terminology

Let's explain some terminology we use across this guide:

A **bucket** is an entity that we use to gather multiple servers. A bucket is generally used to gather multiple server from a single project.

A **server** is an entity from which pm2 monitoring receive informations from one or more processes.

A **process** is an entity of the process list (`pm2 ls`).

<p align="center">[Let's start]({{ site.baseurl }}{% link en/monitoring/guide/installation.md %})</p>