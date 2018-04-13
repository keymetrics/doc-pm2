---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# PM2 API PM2 API

pm2 can also be used programmatically, meaning that you can embed a process manager directly in your code, spawn processes, keep them alive even if the main script is exited.
pm2也可以以编程方式使用，这意味着您可以直接在代码中嵌入流程管理器，产生流程，即使退出主脚本也能保持它们持续运行。

---

## Simple example 简单范例

This example shows you how to start app.js with some configuration attributes. Elements passed to start are the same than those you can declare in an ecosystem file:
这个例子展示了如何用一些配置属性来启动app.js。 传递给初始的元素与您可以在生态系统文件中声明的元素相同：


```bash
npm install pm2 --save
```

```javascript
const pm2 = require('pm2')

pm2.connect(function(err) {
  if (err) {
    console.error(err)
    process.exit(2)
  }
  
  pm2.start({
    script: 'app.js',
  }, (err, apps) => {
    pm2.disconnect()
    if (err) { throw err }
  })
})
```

?> If your script does not exit by itself, make sure you call `pm2.disconnect()`.
如果您的脚本不能自行退出，请确保您调用 `pm2.disconnect()`。

---

## Programmatic API 程序化API

**`pm2.connect(errback)` or `pm2.connect(noDaemonMode, errback)`**
**`pm2.connect(errback)` 或 `pm2.connect(noDaemonMode, errback)`**
* `noDaemonMode` - (Default: false) If true is passed for the first argument, pm2 will not be run as a daemon and will die when the related script exits. If pm2 is already running, your script will link to the existing daemon but will die once your process exits.
* `noDaemonMode` - （默认值：false）如果第一个参数传递为true，那么pm2将不会作为守护进程运行，并在相关脚本退出时停止运行。 如果pm2已经在运行，您的脚本将链接到现有的守护进程，但一旦您的进程退出就会停止运行。
* `errback(error)` - Called when finished connecting to or launching the pm2 daemon process.
* `errback(error)` - 在完成连接或启动pm2守护程序进程时调用。

Either connects to a running pm2 daemon ("God") or launches and daemonizes one. Once launched, the pm2 process will keep running after the script exits.
要么连接到正在运行的pm2守护进程（“God”），要么启动并守护进程。 一旦启动，pm2进程将在脚本退出后继续运行。


**`pm2.disconnect()`** **`pm2.disconnect()`**

Disconnects from the pm2 daemon.
断开与pm2守护进程的连接。


**`pm2.killDaemon(errback)`** **`pm2.killDaemon(errback)`**

Kills the pm2 daemon (same as `pm2 kill`). Note that when the daemon is killed, all its processes are also killed. Also note that you still have to explicitly disconnect from the daemon even after you kill it.
终止pm2守护进程（与pm2 kill相同）。 请注意，当守护进程被终止时，其所有进程也被终止。 另外请注意，即使终止守护进程，您仍然必须明确断开它。


**`pm2.start(options, errback)`**
**`pm2.start(jsonConfigFile, errback)`**
**`pm2.start(script, errback)`**
**`pm2.start(script, options, errback)`**
**`pm2.start(script, jsonConfigFile, errback)`**

* `script` - The path of the script to run.要运行的脚本路径。
* `jsonConfigFile` - The path to a JSON file that can contain the same options as the `options` parameter.JSON文件的路径，它可以包含与`options`参数相同的选项。
* `errback(err,proc)` - An errback called when the `script` has been started. The `proc` parameter will be a [pm2 process object](https://github.com/soyuka/pm2-notify#templating). 当 `script`启动时调用errback。`proc`参数将是一个 [pm2 进程对象](https://github.com/soyuka/pm2-notify#templating)
* `options` - An object with the following options (additional descriptions of these options are [here](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/#graceful-reload)):
具有以下选项的一个对象（这些选项的附加说明在[此处](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/#graceful-reload)):
 

**`pm2.stop(process, errback)`**
**`pm2.restart(process, errback)`** 
**`pm2.delete(process, errback)`**
**`pm2.reload(process, errback)`**

* `process` - Can either be the `name` as given in the `pm2.start` `options`, a process id, or the string "all" to indicate that all scripts should be restarted.
`process`  - 既可以是 `pm2.start``options`中给出的`name`，也可以是进程ID，或者是字符串“all”，以表示应该重启所有脚本。
* `errback(err, proc)`


**`pm2.list(errback)`**

* `errback(err, processDescriptionList)` - The `processDescriptionList` parameter will contain a list of `processDescription` objects as defined under `pm2.describe`. 
`errback（err，processDescriptionList）` - `processDescriptionList`参数将包含`pm2.describe`中定义的`processDescription`对象列表。


**`pm2.describe(process,errback)`**

* `errback(err, processDescription)`
* `processDescription` - An object with information about the process. Contains the properties:
包含有关过程信息的一个对象。 这包含以下属性：
  * `name` - The name given in the original `start` command. 原始`start`命令中给出的名称。
  * `pid` - The pid of the process.过程中的pid.
  * `pm_id` - The pid for the `pm2` God daemon process. `pm2`God守护进程的pid
  * `monit` - An object containing: 一个包含以下内容的对象：
    * `memory` - The number of bytes the process is using. 进程正在使用的字节数。
    * `cpu` - The percent of CPU being used by the process at the moment.此时进程正在使用的CPU百分比。
  * `pm2_env` - The list of path variables in the process's environment. These variables include:
  进程环境中的路径变量列表。 这些变量包括：
    * `pm_cwd` - The working directory of the process.进程的工作目录。
    * `pm_out_log_path` - The stdout log file path.标准输出流日志文件路径。
    * `pm_err_log_path` - The stderr log file path.标准错误流日志文件路径。
    * `exec_interpreter` - The interpreter used.使用的解释器。
    * `pm_uptime` - The uptime of the process. 该进程的正常运行时间。
    * `unstable_restarts` - The number of unstable restarts the process has been through.该进程经历的不稳定的重启次数。
    * `restart_time`
    * `status` - "online", "stopping", "stopped", "launching", "errored", or "one-launch-status"
    “在线”，“正在停止”，“已停止”，“启动”，“错误”或“一次启动状态”
    * `instances` - The number of running instances.运行实例的数量。
    * `pm_exec_path` - The path of the script being run in this process. 脚本在此进程中运行的路径。


**`pm2.dump(errback)`**

* `errback(err, result)`


**`pm2.startup(platform, errback)`**

* `errback(err, result)`


**`pm2.flush(process, errback)`** 

* `errback(err, result)`


**`pm2.reloadLogs(errback)`** - *Rotates* the log files. The new log file will have a higher number in it (the default format being `${process.name}-${out|err}-${number}.log`).
*Rotates* 日志文件。 新的日志文件将包含更高的数字（默认格式为 `${process.name}-${out|err}-${number}.log`）。

* `errback(err, result)`


**`pm2.launchBus(errback)`** - Opens a message bus.打开一个消息总线。

* `errback(err, bus)` - The `bus` will be an [Axon Sub Emitter](https://github.com/tj/axon#pubemitter--subemitter) object used to listen to and send events.
此`bus`将是一个用于收听和发送事件的[Axon子发射](https://github.com/tj/axon#pubemitter--subemitter)对象。


**`pm2.sendSignalToProcessName(signal, process, errback)`**

* `errback(err, result)`

---

## Send message to processes 发送消息给进程

```javascript
// pm2-call.js:
pm2.connect(() => {
  pm2.sendDataToProcessId({
    type: 'process:msg',
    data: {
      some: 'data',
      hello: true
    },
    id: 0,
    topic: 'some topic'
  }, (err, res) => {
  })
})

pm2.launchBus((err, bus) => {
  pm2_bus.on('process:msg', (packet) => {
    packet.data.success.should.eql(true)
    packet.process.pm_id.should.eql(proc1.pm2_env.pm_id)
    done()
  })
})
```

```javascript
// pm2-app.js:
process.on('message', (packet) => {
  process.send({
    type: 'process:msg',
    data: {
     success: true
    }
 })
})
```

