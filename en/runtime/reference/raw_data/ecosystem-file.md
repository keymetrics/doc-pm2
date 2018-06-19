 To be finished
{: .warn}

# Ecosystem file reference

Entry name | Description | Type | Default
---|---|---|---|---|
script|Script path.|string,|
name|Set a custom name in the process list.|string,|
cwd|The working directory to start the process with.|string,|
args|Arguments to pass to the script.|array or string|
exec_interpreter|Interpreter absolute path.|string,|
node_args|Arguments to call the interpreter with|Array or String|
out_file|The path to a file to append stdout output to. Can be the same file as error.|string,|
error_file|The path to a file to append stderr output to. Can be the same file as output.|string,|
log_file|Combined output and error.||
disable_logs|Disable logs.|boolean,|
log_type|Set to json to enable json logs.|string,|
log_date_format|The display format for log timestamps (eg YYYY-MM-DD HH:mm Z). The format is from moment.js|string,|
env|env variables that will be injected in your app.|object or string|
env_<env_name>|env variables that will be injected in your app when started with --env <env_name>.|Object or String|
max_memory_restart|Restart the app if amount of memory specified is exceeded. Uses human-friendly format: 'K' for kilobytes, 'M' for megabytes, 'G' for gigabytes', etc. Eg 150M.|String or Number|
pid_file|File where the pid of the started process is written by pm2.|string,|
restart_delay|Time in ms to wait before restarting a crashing app.|number|
source_map_support|Enable or disable the source map support|boolean,|
disable_source_map_support||boolean|
wait_ready|Instead of reload waiting for listen event, wait for process.send('ready')|boolean,|
instances|Number of app instances to be started with cluster exec_mode.|number,|
kill_timeout|Time in ms before sending the final SIGKILL signal.|number,|
listen_timeout|Time in ms before forcing a reload if app is still not listening.|number,|
cron_restart|a cron pattern to restart your app. Application must be running for cron feature to work|string,|
merge_logs|If true, merges the log files for all instances of `script` into one stderr log and one stdout log. Only applies in 'cluster' mode. For example, if you have 4 instances of 'test.js' started via pm2, normally you would have 4 stdout log files and 4 stderr log files, but with this option set to true you would only have one stdout file and one stderr file.|boolean,|
vizion|if false, PM2 will start without vizion features (versioning control metadatas)|boolean,|
autorestart|If false, pm2 will *not* attempt to restart it following successful completion or process failure.|boolean,|
watch|Enable watch & restart.|boolean or array or string|
ignore_watch|List of regex to ignore some files or folder in watch mode.|array or string|
watch_options|Object that will be used as an options with chokidar. Refer to chokidar documentation for the definition.|object,|
min_uptime|Minimum uptime of the app to be considered started.|number or string|
max_restarts|The maximum times a script is restarted when it exits in less than min_uptime.|number,|
exec_mode|Must be set to cluster to enable the load-balancer.|string,|
write||boolean|
force|By default, pm2 will only start a script if that script isn't already running (a script is a path to an application, not the name of an application already running). If force is set to true, pm2 will start a new instance of that script.|boolean,|
append_env_to_name||boolean|
post_update|a list of commands which will be executed after you perform a Pull/Upgrade operation from Keymetrics dashboard|array,|
trace|Enable the transaction tracing.|boolean|
disable_trace|Enable the transaction tracing.|boolean|
increment_var|Add environnement variable to be incremented for each application started|string,|
instance_var|Rename the NODE_APP_INSTANCE environement variable|string,|
pmx|Does not inject pmx.|boolean,|
automation|See --no-automation flag|boolean,|
treekill|See --no-treekill flag  |boolean,|
port||number|
uid|Set user id||
gid|Set group id||