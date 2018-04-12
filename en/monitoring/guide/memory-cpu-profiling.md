---
layout: page
title: Quick Start with PM2
menu: starter
lang: en
redirect_from: "/monitoring/guide/memory-cpu-profiling"
---

# Memory & CPU profiling

Profiling tools help you diagnose memory and CPU usage and other application-level issues.

The profiling in pm2 monitoring allows you to take remote CPU/memory snapshots of your production servers. You get the associated files ready to be inspected with the chrome developer tools.

![cpu and memory profiling]({{site.baseurl}}/img/monitoring/profiling.png)

---

## Memory profiling

Click to take a heapdump and download the file. It may take some time depending on the weight of the heap file.

Inspect with the Google Chrome developer tool into the Profiles tab (**Load** button).

### Tracking memory leaks

To track memory leak you will need to compare multiple heapdump files to see which element is increasing over time.

To know more about memory analysis check the [google tutorial](https://developer.chrome.com/devtools/docs/heap-profiling).

---

## CPU profiling

For CPU profiling, you decide how long you want to record.

It gets you a visualisation of the stack and still offer the ability to download the CPU profiling file.

---

## Next steps

Thanks for finishing this guide.

You can now take a look at the [reference]({{site.baseurl}}/monitoring/reference/pmx.md) to master all the capabilities of pm2.

---

## Questions ?

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
