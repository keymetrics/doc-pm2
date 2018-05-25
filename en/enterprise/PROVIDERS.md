---
layout: page
title: Providers | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
redirect_from: "/enterprise/providers"
---

### What is a provider?

A 'provider' is simply the place from where you are retrieving the keymetrics software. For example if you are deploying our AMIs inside AWS, you'll retrieve them from AWS. You can also deploy them with docker and in this case you will get them from the docker hub.

### What do i need to give to get access to the keymetrics software from a provider?

- AWS : you will need to provide your Amazon Account ID (so you can access the AMIs) and your Amazon Region
- docker : you will need to provide the username of the hub.docker.com account that you'll use to pull the docker images
