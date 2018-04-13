---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# CLI reference CLI参考

---

## pm2 Flags   pm2 Flags

Flag name Flag名称|Description 描述
---|---
-V, --version|output the version number 输出版本号
-v --version|get version 获取版本
-s --silent|hide all messages 隐藏所有消息
-m --mini-list|display a compacted list without formatting 显示没有格式的压缩列表
-f --force|force actions 强制执行
--disable-logs|do not write logs 不要写日志
-n --name &lt;name&gt;|set a &lt;name&gt; for script 为脚本设置一个 &lt;name&gt;
-i --instances &lt;number&gt;|launch [number] instances (for networked app)(load balanced) 启动[number]实例（针对联网应用）（负载均衡）
--parallel &lt;number&gt;|number of parallel actions (for restart/reload)并行操作数（用于重启/重载）
-l --log [path]|specify entire log file (error and out are both included)指定整个日志文件（包括错误和输出）
-o --output &lt;path&gt;|specify out log file 指定日志文件
-e --error &lt;path&gt;|specify error log file 指定错误日志文件
-p --pid &lt;pid&gt;|specify pid file 指定pid文件
-k --kill-timeout &lt;delay&gt;|delay before sending final SIGKILL signal to process 在发送最终SIGKILL信号处理进程前延迟
--listen-timeout &lt;delay&gt;|listen timeout on application reload 应用重载时监听超时
--max-memory-restart &lt;memory&gt;|specify max memory amount used to autorestart (in octet or use syntax like 100M) 指定用于自重启的最大内存量（以八位字节为单位或使用100M等syntax语法）
--restart-delay &lt;delay&gt;|specify a delay between restarts (in milliseconds)指定重启之间的延迟（以毫秒为单位）
--env &lt;environment_name&gt;|specify environment to get specific env variables (for JSON declaration) 指定环境以获取特定的env变量（用于JSON声明）
--log-type &lt;type&gt;|specify log output style (raw by default, json optional) 指定日志输出样式（默认情况下为原始，json可选）
-x --execute-command|execute a program using fork system 使用fork系统执行程序
--max-restarts [count]|only restart the script COUNT times 只能重启脚本COUNT次
-u --user &lt;username&gt;|define user when generating startup script 在生成启动脚本时定义用户
--uid &lt;uid&gt;|run target script with &lt;uid&gt; rights 使用&lt;uid&gt;权限运行目标脚本
--gid &lt;gid&gt;|run target script with &lt;gid&gt; rights 使用&lt;gid&gt;权限运行目标脚本
--cwd &lt;path&gt;|run target script as &lt;username&gt; 将目标脚本作为&lt;username&gt;运行
--hp &lt;home path&gt;|define home path when generating startup script 生成启动脚本时定义主路径
--wait-ip|override systemd script to wait for full internet connectivity to launch pm2 重写systemd脚本以等待完整的互联网连接以启动pm2
--service-name &lt;name&gt;|define service name when generating startup script 生成启动脚本时定义服务名称
-c --cron &lt;cron_pattern&gt;|restart a running process based on a cron pattern 基于cron模式重启正在运行的进程
-w --write|write configuration in local folder 在本地文件夹中写入配置
--interpreter &lt;interpreter&gt;|the interpreter pm2 should use for executing app (bash, python...)解释器pm2应该用于执行应用（bash，python ...）
--interpreter-args &lt;arguments&gt;|interpret options (alias of --node-args) 解释选项（--node-args的别名）
--log-date-format &lt;date format&gt;|add custom prefix timestamp to logs 为日志添加自定义前缀时间戳
--no-daemon|run pm2 daemon in the foreground if it doesn't exist already 如果pm2守护程序不存在，则在前台运行pm2守护程序
-a --update-env|update environment on restart/reload (-a &lt;=&gt; apply)在重启/重载时更新环境(-a &lt;=&gt; apply)
--source-map-support|force source map support 强制源图支持
--only &lt;application-name&gt;|with json declaration, allow to only act on one application 与json声明，允许只运行一个应用
--disable-source-map-support|force source map support 强制源图支持
--wait-ready|ask pm2 to wait for ready event from your app 请求pm2等待您的应用中准备就绪的事件
--merge-logs|merge logs from different instances but keep error and out separated 合并来自不同实例的日志，但保持错误并分离
--watch [paths]|watch application folder for changes (default: ) 观察应用文件夹的更改(default: )
--ignore-watch &lt;folders&#124;files&gt;|folder/files to be ignored watching, should be a specific name or regex - e.g. --ignore-watch="test node_modules "some scripts"" 文件夹/文件被忽略观测，应该是一个特定的名称或正则表达式 - 例如 --ignore-watch="test node_modules "some scripts""
--node-args &lt;node_args&gt;|space delimited arguments to pass to node in cluster mode - e.g. --node-args="--debug=7001 --trace-deprecation" 空间定界参数以群集模式传递给节点 - e.g. --node-args="--debug=7001 --trace-deprecation"
--no-color|skip colors 跳过颜色代码
--no-vizion|start an app without vizion feature (versioning control) 在无vizion功能的情况下启动一个应用（版本控制）
--no-autorestart|start an app without automatic restart 在无自重启下启动一个应用
--no-treekill|Only kill the main process, not detached children 只kill主进程，不分离子进程
--no-pmx|start an app without pmx 在无pmx下启动一个应用
--no-automation|start an app without pmx 在无pmx下启动一个应用
--trace|enable transaction tracing with km 使用km启用事务跟踪
--disable-trace|disable transaction tracing with km 使用km禁用事务跟踪
--attach|attach logging after your start/restart/stop/reload 在启动/重启/停止/重载后附加日志记录
--sort &lt;field_name:sort&gt;|sort process according to field's name 根据字段名称进行排序
--v8|enable v8 data collecting 启用v8数据收集
--event-loop-inspector|enable event-loop-inspector dump in pmx 在pmx中启用事件循环检查器转储
--deep-monitoring|enable all monitoring tools (equivalent to --v8 --event-loop-inspector --trace)启用所有监控工具（相当于--v8 --event-loop-inspector --trace）
-h, --help|output usage information 输出使用信息

---

## pm2 Commands pm2命令

Command name 命令名称|Description 描述
---|---
start [options] &lt;file&#124;json&#124;stdin&#124;app_name&#124;pm_id...&gt;|start and daemonize an app 启动并守护应用
trigger &lt;proc_name&gt; &lt;action_name&gt; [params]|deploy your json 部署您的json
deploy &lt;file&#124;environment&gt;|deploy your json 部署您的json
startOrRestart &lt;json&gt;|start or restart JSON file 启动或重启JSON文档
startOrReload &lt;json&gt;|start or gracefully reload JSON file 启动或正常重载JSON文件
pid [app_name]|return pid of [app_name] or all 返回[app_name]的pid或全部
startOrGracefulReload &lt;json&gt;|start or gracefully reload JSON file 启动或正常重载JSON文件
stop [options] &lt;id&#124;name&#124;all&#124;json&#124;stdin...&gt;|stop a process (to start it again, do pm2 restart &lt;app&gt;) 停止一个进程（想再次启动，执行pm2 restart &lt;app&gt;）
restart [options] &lt;id&#124;name&#124;all&#124;json&#124;stdin...&gt;|restart a process 重启一个进程
scale &lt;app_name&gt; &lt;number&gt;|scale up/down a process in cluster mode depending on total_number param 根据total_number参数在群集模式中放大/缩小进程
snapshot|snapshot PM2 memory 快照PM2内存
profile &lt;command&gt;|profile CPU 配置文件CPU
reload &lt;name&#124;all&gt;|reload processes (note that its for app using HTTP/HTTPS) 重载进程（请注意，它是作用于使用HTTP / HTTPS的应用）
gracefulReload &lt;name&#124;all&gt;|gracefully reload a process. Send a "shutdown" message to close all connections. 正常重载一个进程。 发送“关机”消息关闭所有连接。
id &lt;name&gt;|get process id by name 按名称获取进程ID
delete &lt;name&#124;id&#124;script&#124;all&#124;json&#124;stdin...&gt;|stop and delete a process from pm2 process list 停止并从pm2进程列表中删除一个进程
sendSignal &lt;signal&gt; &lt;pm2_id&#124;name&gt;|send a system signal to the target process 发送一个系统信号给目标进程
ping|ping pm2 daemon - if not up it will launch it  ping pm2守护进程 - 如果没有作用，它会启动它
updatePM2|update in-memory PM2 with local PM2 用本地PM2更新内存PM2
update|(alias) update in-memory PM2 with local PM2 （alias）使用本地PM2更新内存中的PM2
install&#124;module:install [options] [module&#124;git:/]|install or update a module (or a set of modules) and run it forever 安装或更新模块（或一组模块）并永久运行
module:update &lt;module&#124;git:/&gt;|update a module and run it forever 更新模块并永久运行
module:generate [app_name]|Generate a sample module in current folder 在当前文件夹中生成一个样本模块
uninstall&#124;module:uninstall &lt;module&gt;|stop and uninstall a module 停止并卸载模块
publish&#124;module:publish|Publish the module you are currently on 发布您当前所在的模块
set [key] [value]|sets the specified config &lt;key&gt; &lt;value&gt;设置指定的配置&lt;key&gt; &lt;value&gt;
multiset &lt;value&gt;|multiset eg "key1 val1 key2 val2 多重集，例如"key1 val1 key2 val2
get [key]|get value for &lt;key&gt; 获取&lt;key&gt;的值
conf [key] [value]|get / set module config values 获取/设置模块配置值
config &lt;key&gt; [value]|get / set module config values 获取/设置模块配置值
unset &lt;key&gt;|clears the specified config &lt;key&gt; 清除指定的配置 &lt;key&gt;
report|give a full pm2 report for https://github.com/Unitech/pm2/issues 为  https://github.com/Unitech/pm2/issues 提供完整的pm2报告
link&#124;interact [options] [secret] [public] [name]|linking action to keymetrics.io - command can be stop&#124;info&#124;delete&#124;restart 将操作链接到 keymetrics.io  - 命令可以停止&#124;询问&#124;删除&#124;重启
unlink|linking action to keymetrics.io - command can be stop&#124;info&#124;delete&#124;restart 将操作取消链接到 keymetrics.io - 命令可以停止&#124;询问&#124;删除&#124;重启
unmonitor [name]|unmonitor target process 不监控目标进程
monitor [name]|monitor target process 监控目标进程
open|open dashboard in browser 在浏览器中打开仪表板
register|create an account on keymetrics 在keymetrics上创建一个帐户
login|login to keymetrics and link current PM2 登录keymetrics并链接当前的PM2
web|launch a health API on 0.0.0.0:9615 在0.0.0.0:9615上启动一个health API
dump&#124;save|dump all processes for resurrecting them later 转储所有进程以便稍后复活它们
send &lt;pm_id&gt; &lt;line&gt;|send stdin to &lt;pm_id&gt; 发送stdin到&lt;pm_id&gt;
attach &lt;pm_id&gt; [comman]|attach stdin/stdout to application identified by &lt;pm_id&gt;将标准输入/标准输出附加到由&lt;pm_id&gt;标识的应用
resurrect|resurrect previously dumped processes 反串行化以前被废弃的进程
unstartup [platform]|disable and clear auto startup - [platform]=systemd,upstart,launchd,rcd 禁用并清除自启动 -  [platform]=systemd,upstart,launchd,rcd
startup [platform]|setup script for pm2 at boot - [platform]=systemd,upstart,launchd,rcd 在启动时为pm2设置脚本 -  [platform]=systemd,upstart,launchd,rcd
logrotate|copy default logrotate configuration 复制默认的logrotate配置
ecosystem&#124;init [mode]|generate a process conf file. (mode = null or simple) 生成一个进程配置文件。(mode = null or simple) 
reset &lt;name&#124;id&#124;all&gt;|reset counters for process 重置进程的计数器
describe &lt;id&gt;|describe all parameters of a process id 描述进程ID的所有参数
desc &lt;id&gt;|(alias) describe all parameters of a process id (alias) 描述进程ID的所有参数
info &lt;id&gt;|(alias) describe all parameters of a process id (alias) 描述进程ID的所有参数
show &lt;id&gt;|(alias) describe all parameters of a process id (alias) 描述进程ID的所有参数
list&#124;ls|list all processes 列出所有进程
l|(alias) list all processes (alias) 列出所有进程
ps|(alias) list all processes (alias) 列出所有进程
status|(alias) list all processes (alias) 列出所有进程
jlist|list all processes in JSON format 以JSON格式列出所有进程
prettylist|print json in a prettified JSON 以prettified JSON输出json
monit|launch termcaps monitoring 开展短期监测
imonit|launch legacy termcaps monitoring 启动传统的termcap监测
dashboard&#124;dash|launch dashboard with monitoring and logs 启动带有监控和日志的仪表板
flush|flush logs 刷新日志
reloadLogs|reload all logs 重载所有日志
logs [options] [id&#124;name]|stream logs file. Default stream all logs 流日志文件。 默认流所有日志
kill|kill daemon 杀死守护进程
pull &lt;name&gt; [commit_id]|updates repository for a given app 更新给定应用的存储库
forward &lt;name&gt;|updates repository to the next commit for a given app 将存储库更新为给定应用的下一次提交
backward &lt;name&gt;|downgrades repository to the previous commit for a given app 将存储库降级到给定应用的前一次提交
gc|force PM2 to trigger garbage collection 强制PM2触发垃圾收集
deepUpdate|performs a deep update of PM2 执行PM2的深层更新
serve&#124;expose [path] [port]|serve a directory over http via port 运用端口通过http服务一个目录
