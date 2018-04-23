---
layout: page
title: Metrics Glossary | Best Practices | PM2 Plus Documentation
menu: starter
lang: en
redirect_from: "/monitoring/best-practices/metrics-glossary"
---

# Metrics Glossary

CPU Usage

Unit: %
Range of values: 0 - 100

The CPU usage is the amount of time the CPU is busy (computed every 25 ms, for the last 25 ms).

Memory Usage

Unit: Megabytes (MB)
Range of values: 0 - total memory of the server

The memory usage is the total amount of memory used by the application.

Issues

The number of issues recorded and not yet set as fixed in the issue dashboard.

Number of restarts

The number of restarts of your application since added in your PM2 process list. PM2 automatically restarts your application whenever needed, for example after an uncaught exception has happened.

Number of processes

The number of cluster on which your app has been spread on the server. Only PM2 cluster appears. 

HTTP Requests per Minutes

Unit: Number of requests / minutes

Loop Delay

Unit: milliseconds (ms)
Range: 0 - less than 100ms

The time the Node.js event loop takes to complete a loop.


Active Handles

Handles represent long-lived objects capable of performing certain operations while active. Some examples:

- A prepare handle gets its callback called once every loop iteration when active.
- A TCP server handle that gets its connection callback called every time there is a new connection.

Active Requests

Requests represent (typically) short-lived operations. These operations can be performed over a handle: write requests are used to write data on a handle; or standalone: getaddrinfo requests don’t need a handle they run directly on the loop.

Node.js Memory

New space used size

Old space used size

Map space used size

Code space used size

Large object space used suze

Heap size

Heap size executable

Used heap size

Heap size limit

Garbage Collector

GC heap size

GC executable heap size

GC used heap size

GC type

Gc Pause