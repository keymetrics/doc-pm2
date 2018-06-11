---
layout: page
title: 内存和CPU分析 | 指南 | PM2 Plus教程
title-en: Memory & CPU Profiling | Guide | PM2 Plus Documentation
menu: starter
lang: zh
section: plus
---

# 内存和CPU分析

分析工具可帮助您诊断内存和CPU使用情况以及其他应用级别的问题。

PM2 Plus中的配置文件允许您获取生产服务器的远程CPU/内存快照。 您可以使用chrome开发者工具以准备好相关文件进行检查。

![cpu和内存分析]({{ site.baseurl }}{% link img/plus/profiling.png %})

---

## 内存分析

点击获取堆转储并下载文件。 这个过程取决于堆文件的权重，可能需要一些时间。

使用谷歌Chrome开发者工具检查配置文件标签（**Load**按钮）。

### 跟踪内存泄漏

要跟踪内存泄漏，您需要比较多个堆转储文件以查看随着时间的推移哪个元素在增加。

要详细了解内存分析，请查看[google教程](https://developer.chrome.com/devtools/docs/heap-profiling)。

---

## CPU分析

关于CPU分析，您来决定想要记录多久。

它为您提供了堆栈的可视化，且仍提供了下载CPU分析文件的功能。

---

## 下一步

感谢您读完本指南。

您现在可以查看 [reference]({{ site.baseurl }}{% link zh/plus/reference/pmx.md %})来掌握PM2的所有功能。

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。您也可以看看我们在github中的帮助部分 https://github.com/keymetrics/keymetrics-support
