 To be finished
{: .warn}

# pm2 CLI

```bash
# Actions
pm2 start all          # Start all processes
pm2 start 0            # Start specific process id

pm2 stop all           # Stop all processes
pm2 stop 0             # Stop specific process id

pm2 reload all         # 0s downtime reload all processes
pm2 reload 0           # 0s downtime reload specific process id

pm2 restart all        # Restart all processes
pm2 restart 0          # Restart specific process id

pm2 delete all         # Remove all processes from pm2 list
pm2 delete 0           # Remove process from pm2 list

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs
```

### *42 starts*

*ndlr;* 42 is the answer to life, the universe and everything.

```bash
pm2 start app.js           # Start app.js

pm2 start app.js -- -a 23  # Pass arguments '-a 23' argument to app.js script

pm2 start app.js --name serverone # Start a process and name it as serverone
                                    # you can now stop the process by doing
                                    # pm2 stop serverone

pm2 start app.js --node-args="--debug=7001" # --node-args to pass options to node V8

pm2 start app.js -i 0             # Start maximum processes depending on available CPUs (cluster mode)

pm2 start app.js --log-date-format "YYYY-MM-DD HH:mm Z"    # Log will be prefixed with custom time format

pm2 start app.json                # Start processes with options declared in app.json
                                    # Go to chapter Multi process JSON declaration for more

pm2 start app.js -e err.log -o out.log  # Start and specify error and out log

```

For scripts in other languages:

```bash
pm2 start echo.pl --interpreter=perl

pm2 start echo.coffee
pm2 start echo.php
pm2 start echo.py
pm2 start echo.sh
pm2 start echo.rb
```

The interpreter is set by default with this equivalence:

```json
{
  ".sh": "bash",
  ".py": "python",
  ".rb": "ruby",
  ".coffee" : "coffee",
  ".php": "php",
  ".pl" : "perl",
  ".js" : "node"
}
```

### Options

```
Options:

   -h, --help                           output usage information
   -V, --version                        output the version number
   -v --version                         get version
   -s --silent                          hide all messages
   -m --mini-list                       display a compacted list without formatting
   -f --force                           force actions
   -n --name <name>                     set a <name> for script
   -i --instances <number>              launch [number] instances (for networked app)(load balanced)
   -l --log [path]                      specify entire log file (error and out are both included)
   -o --output <path>                   specify out log file
   -e --error <path>                    specify error log file
   -p --pid <pid>                       specify pid file
   --max-memory-restart <memory>        specify max memory amount used to autorestart (in megaoctets)
   --env <environment_name>             specify environment to get specific env variables (for JSON declaration)
   -x --execute-command                 execute a program using fork system
   -u --user <username>                 define user when generating startup script
   -c --cron <cron_pattern>             restart a running process based on a cron pattern
   -w --write                           write configuration in local folder
   --interpreter <interpreter>          the interpreter pm2 should use for executing app (bash, python...)
   --log-date-format <momentjs format>  add custom prefix timestamp to logs
   --no-daemon                          run pm2 daemon in the foreground if it doesn't exist already
   --merge-logs                         merge logs from different instances but keep error and out separated
   --watch                              watch application folder for changes
   --ignore-watch <folders|files>       folder/files to be ignored watching, chould be a specific name or regex - e.g. --ignore-watch="test node_modules "some scripts""
   --node-args <node_args>              space delimited arguments to pass to node in cluster mode - e.g. --node-args="--debug=7001 --trace-deprecation"
   --no-color                           skip colors
   --no-vizion                          skip vizion features (versioning control)
   --no-autorestart                     do not automatically restart apps
```