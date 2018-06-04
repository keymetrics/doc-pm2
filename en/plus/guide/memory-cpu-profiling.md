---
layout: page
title: Memory & CPU Profiling | Guide | PM2 Plus Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/guide/memory-cpu-profiling"
---

# Memory & CPU profiling

Profiling tools help you diagnose memory and CPU usage and other application-level issues.

The profiling in PM2 Plus allows you to take remote CPU/memory snapshots of your production servers. You get the associated files ready to be inspected with the chrome developer tools.

![cpu and memory profiling]({{ site.baseurl }}{% link img/plus/profiling.png %})

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

[Modules]({{ site.baseurl }}{% link en/plus/guide/modules.md %})

---

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on our [support github](https://github.com/keymetrics/keymetrics-support/issues).
