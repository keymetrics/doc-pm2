---
layout: page
title: Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
hide_comments: true
permalink: "/en/plus/guide/"
redirect_from: "/plus/guide/"
---

# Guide

Follow this guide and get your Node.js app monitored by PM2 Plus in minutes!

---

## Terminology

Let's first explain some terminology we will use across this guide:

A **bucket** is an entity related to PM2 Plus which is associated to a billing plan. Buckets are generally used to group and monitor multiple servers of a single project.

A **server** is a container or a machine with a PM2 daemon managing one or more processes.

A **process** is an entity of the process list (`pm2 ls`). This is one instance of an app which has been started by PM2.

<p align="center">[Let's start]({{ site.baseurl }}{% link en/plus/guide/installation.md %})</p>