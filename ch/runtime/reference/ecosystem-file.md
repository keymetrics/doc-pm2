---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Ecosystem file reference 生态系统文件参考

---

## Options 选项

Entry name 条目名称|Description 描述|Type 类型|Default 默认
---|---|---|---
script|Path of the script to launch, required field 要启动的脚本路径，必填字段|string|
name|Process name in the process list 进程列表中的进程名称|string|Script filename without the extension (app for app.js) 没有扩展名的脚本文件名（app.js的应用）
cwd|Current working directory to start the process with 当前工作目录以启动进程|string|CWD of the current environment (from your shell) 当前环境的CWD（来自您的shell）
args|Arguments to pass to the script 传递给脚本的参数|array,string|
interpreter|Interpreter absolute path 解释器绝对路径|string|node
node_args|Arguments to pass to the interpreter 参与传递给解释器|array,string|
output|File path for stdout (each line is appended to this file) studout的文件路径（每行都附加到该文件中）|string|~/.pm2/logs/<app_name>-out.log
error|File path for stderr (each line is appended to this file) stderr的文件路径（每行都附加到此文件中）|string|~/.pm2/logs/<app_name>-error.err
log|File path for combined stdout and stderr (each line is appended to this file) 组合stdout和stderr的文件路径（每行都附加到此文件中)|boolean,string|/dev/null
disable_logs|Disable all logs storage 禁用所有日志存储|boolean|
log_type|Define a specific log output type, possible value: json 定义一个特定的日志输出类型，可能的值为：json|string|
log_date_format|Format for log timestamps in moment.js format (eg YYYY-MM-DD HH:mm Z) 日志时间戳的格式，采用moment.js格式（例如YYYY-MM-DD HH：mm Z）|string|
env|Specify environment variables to be injected 指定要注入的环境变量|object,string|
^env_\S*$|Specify environment variables to be injected when using --env <env_name> 指定使用--env <env_name>时要注入的环境变量|object,string|
max_memory_restart|Restart the app if an amount of memory is exceeded (format: /[0-9](K&#124;M&#124;G)?/ K for KB, 'M' for MB, 'G' for GB, default to B) 如果超出内存量，重新启动应用（格式：/ [0-9](K&#124;M&#124;G)?/ K for KB, 'M' for MB, 'G' for GB, default to B）|string,number|
pid_file|File path where the pid of the started process is written by pm2 pm2写入已启动进程的pid的文件路径|string|~/.pm2/pids/app_name-id.pid
restart_delay|Time in ms to wait before restarting a crashing app 在重新启动崩溃应用之前，需要等待毫秒|number|
source_map_support|Enable or disable the source map support 启用或禁用源映射支持|boolean|true
disable_source_map_support|Enable or disable the source map support 启用或禁用源映射支持|boolean|
wait_ready|Make the process wait for a process.send('ready') 让进程等待process.send（'ready'）|boolean|
instances|Number of instances to be started in cluster mode 在群集模式下启动的实例数|number|1
kill_timeout|Time in ms before sending the final SIGKILL signal after SIGINT 在SIGINT之后发送最终的SIGKILL信号之前，以ms为单位等待|number|1600
listen_timeout|Time in ms before forcing a reload if app is still not listening/has still note sent ready 时间以毫秒为单位，如果应用仍未收听/仍然发送准备就绪，则强制重载|number|
cron_restart|A cron pattern to restart your app 一个cron模式来重启您的应用|string|
merge_logs|In cluster mode, merge each type of logs into a single file (instead of having one for each cluster) 在群集模式下，将每种类型的日志合并到一个文件中（而不是每个群集都单独一个）|boolean|
vizion|Enable or disable the versioning metadatas (vizion library) 启用或禁用版本控制元数据（vizion库）|boolean|true
autorestart|Enable or disable auto restart after process failure 进程失败后启用或禁用自重启|boolean|true
watch|Enable or disable the watch mode 启用或禁用观察模式|boolean,array,string|
ignore_watch|List of paths to ignore (regex) 要忽略的路径列表（正则表达式）|array,string|
watch_options|Object that will be used as an options with chokidar (refer to chokidar documentation) 用作chokidar选项的对象（请参阅chokidar文档）|object|
min_uptime|Minimum uptime of the app to be considered started (format is /[0-9]+(h&#124;m&#124;s)?/, for hours, minutes, seconds, default to ms) 考虑应用启动的最小正常运行时间（格式为/[0-9]+(h&#124;m&#124;s)?/, for hours, minutes, seconds, default to ms）|number,string|1000
max_restarts|Number of times a script is restarted when it exits in less than min_uptime 脚本存在小于最小运行时间时退出的次数|number|16
exec_mode|Set the execution mode, possible values: fork&#124;cluster 设置执行模式，可能的值为：fork&#124;cluster | cluster|string|fork
force|Start a script even if it is already running (only the script path is considered) 即使脚本已经运行，也要将其启动（只考虑脚本路径）|boolean|
append_env_to_name|Append the environment name to the app name 将环境名称附加到应用名称|boolean|
post_update|List of commands executed after a pull/upgrade operation performed from Keymetrics dashboard 在从Keymetrics仪表板执行的提取/升级操作之后执行的命令列表|array|
trace|Enable or disable the transaction tracing 启用或禁用事务跟踪|boolean|
disable_trace|Enable or disable the transaction tracing 启用或禁用事务跟踪|boolean|true
increment_var|Specify the name of an environnement variable to inject which increments for each cluster 指定环境变量的名称以注入每个群集的增量|string|
instance_var|Rename the NODE_APP_INSTANCE environment variable 重命名NODE_APP_INSTANCE环境变量|string|NODE_APP_INSTANCE
pmx|Enable or disable pmx wrapping 启用或禁用pmx包装|boolean|true
automation|Enable or disable pmx wrapping 启用或禁用pmx包装|boolean|true
treekill|Only kill the main process, not detached children 只kill主进程，不分离子进程|boolean|true
port|Shortcut to inject a PORT environment variable 注入PORT环境变量的快捷方式|number|
uid|Set user id设置用户ID|string|Current user uid
gid|Set group id 设置群组ID|string|Current user gid
