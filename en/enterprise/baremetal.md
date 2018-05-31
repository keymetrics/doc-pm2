---
layout: page
title: Deployment on Baremetal Servers | PM2 Enterprise Documentation
menu: starter
lang: en
section: enterprise
redirect_from: "/enterprise/baremetal"
---

# Deployment on Baremetal Servers

---

## Requirements

Install Docker & Docker compose (minimum required version is 1.19.0) in your host machine:

```bash
$ sudo wget -qO- https://get.docker.com/ | sh
$ sudo curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

Then make sure you have logged-in on the hub to be able to pull the private images:

```bash
$ docker login
```

---

## Steps to Install

1. Get the docker-compose.yml file corresponding to your version:

```bash
$ wget https://raw.githubusercontent.com/keymetrics/on-premise/master/docker/docker-compose.yml
```

2. Edit the docker-compose.yml:

`KM_DEDICATED_KEY` with the license key provided<br/>
`KM_SMTP_*` with the SMTP informations (for receiving email notification/alerts)<br/>
`KM_SITE_URL` with the url that will be bound to the backend (or the ip address directly)<br/>

*For full information about the configuration flag, check the related [documentation](https://github.com/keymetrics/on-premise/blob/master/docs/BACKEND.md#keymetrics-core-documentation)*

Once you have configured the `docker-compose.yml` file start it:

```bash
$ docker-compose up -d
```

Check the logs via:

```bash
$ docker-compose logs
```

*In the beginning some connections errors might appears but it's not critical (elasticsearch take few seconds to boot so the backend will restart for few seconds then connect when his ready)*

---

## Update Procedure

Just run docker-compose up again and it will pull the latest backend image:

```bash
$ docker-compose pull km-api km-front
$ docker-compose restart km-api km-front
```

A downtime of around 30 seconds maximum will happen.

---

## FAQ

- *Backend cannot connect to Elasticsearch*: make sure you have a clean docker installation and there are no conflicting networks (docker networks)

- *Everything is started as expected but I cannot access the interface / I cannot link PM2*: Make sure you have set the right `KM_SITE_URL` because without a proper value PM2 agent will not be able to connect to the Backend

- *Do I loose the ES/Mongo data on restart?* No, by default, there are local volumes bound to the 

- *I want to use specific version of mongodb/redis/elasticsearch, is this possible ?* No, we currently support mongodb up to 3.4, redis 2/3/4 and elasticsearch 5.5.
