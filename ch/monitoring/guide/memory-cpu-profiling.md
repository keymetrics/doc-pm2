---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Memory & CPU profiling 内存和CPU分析

Profiling tools help you diagnose memory and CPU usage and other application-level issues.
分析工具可帮助您诊断内存和CPU使用情况以及其他应用级别的问题。

The profiling in pm2 monitoring allows you to take remote CPU/memory snapshots of your production servers. You get the associated files ready to be inspected with the chrome developer tools.
pm2 monitoring中的配置文件允许您获取生产服务器的远程CPU /内存快照。 您可以使用chrome开发者工具以准备好相关文件进行检查。

![cpu and memory profiling](../overview/profiling.png)

---

## Memory profiling 内存分析

Click to take a heapdump and download the file. It may take some time depending on the weight of the heap file.
点击获取堆转储并下载文件。 这个过程取决于堆文件的权重，可能需要一些时间。

Inspect with the Google Chrome developer tool into the Profiles tab (**Load** button).
使用谷歌Chrome开发者工具检查配置文件标签（**Load**按钮）。

### Tracking memory leaks 跟踪内存泄漏

To track memory leak you will need to compare multiple heapdump files to see which element is increasing over time.
要跟踪内存泄漏，您需要比较多个堆转储文件以查看随着时间的推移哪个元素在增加。

To know more about memory analysis check the [google tutorial](https://developer.chrome.com/devtools/docs/heap-profiling).
要详细了解内存分析，请查看[google教程](https://developer.chrome.com/devtools/docs/heap-profiling)。

---

## CPU profiling CPU分析

For CPU profiling, you decide how long you want to record.
关于CPU分析，您得决定想要记录多久。

It gets you a visualisation of the stack and still offer the ability to download the CPU profiling file.
它为您提供了堆栈的可视化，并且还提供了下载CPU分析文件的功能。

---

## Next steps 下一步

Thanks for finishing this guide. 感谢您读完本指南。

You can now take a look at the [reference](../reference/pmx.md) to master all the capabilities of pm2.
您现在可以查看 [reference](../reference/pmx.md)来掌握pm2的所有功能。

---

## Questions ? 疑问？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum. You can also have a look at our support github https://github.com/keymetrics/keymetrics-support
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support
