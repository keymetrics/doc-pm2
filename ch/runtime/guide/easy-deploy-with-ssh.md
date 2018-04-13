---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Easy Deploy with SSH 使用SSH轻松部署

In many deployment workflow, the routine basically consists of connecting with SSH to multiple servers, git pull the latest version then reload the app.
在许多部署工作流程中，例程基本上由连接到多个服务器的SSH组成，git将最新版本重载到应用中。

The pm2 deploy tool purpose is to automate this task.
pm2部署工具的目的是自动执行此任务。

You set an array of distant hosts, a pre-deploy/post-deploy command line action and you are done.
设置一系列远程主机，一个预先部署/部署后命令行操作，然后你便可以完成。

---

## Installation 安装

### SSH setup SSH设置

Be sure that you have the public ssh key on your local machine:
确保您的本地机器上有公共的ssh密钥：

```bash
ssh-keygen -t rsa
ssh-copy-id node@myserver.com
```

### Ecosystem file 生态系统文件

You first need to configure your ecosystem.config.js with all necessary informations:
您首先需要使用所有必要的信息来配置您的ecosystem.config.js：

```javascript
module.exports = {
  apps: [{
    name: "app",
    script: "app.js"
  }],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "/path/to/some.pem",
      // SSH user
      user: "ubuntu",
      // SSH host
      host: ["192.168.0.13"],
      // SSH options with no command-line flag, see 'man ssh' 
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "git@github.com:Username/repository.git",
      // path in the server
      path: "/var/www/my-repository",
      // Pre-setup command or path to a script on your local machine
      pre-setup: "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      post-setup: "ls -la",
      // pre-deploy action
      pre-deploy-local: "echo 'This is a local executed command'"
      // post-deploy action
      post-deploy: "npm install",
    },
  }
}
```

?> To get more information about the deploy options, check the ecosystem file reference.
要获取有关部署选项的更多信息，请查看生态系统文件参考

?> Note that the distant path must be empty as it will be populated by pm2 deploy.
请注意，远程路径必须为空，因为它将由pm2部署进行填充

### Setup 设置

Make your first deploy and populate the distant path with:
进行第一次部署并填充远程路径：

```bash
pm2 deploy production setup
```

### Deploy 部署

Here are some usefull command:
这里是一些有用的命令：

```bash
# Setup deployment at remote location
pm2 deploy production setup

# Update remote version
pm2 deploy production update

# Revert to -1 deployment
pm2 deploy production revert 1

# execute a command on remote servers
pm2 deploy production exec "pm2 reload all"
```

---

## Deployment options 部署选项

Display deploy help via `pm2 deploy help`:
通过 `pm2 deploy help`显示部署帮助：

```
pm2 deploy <configuration_file> <environment> <command>

  Commands:
    setup                run remote setup commands
    update               update deploy to the latest release
    revert [n]           revert to [n]th last deployment or 1
    curr[ent]            output current release commit
    prev[ious]           output previous release commit
    exec|run <cmd>       execute the given <cmd>
    list                 list previous deploy commits
    [ref]                deploy to [ref], the "ref" setting, or latest tag
```

---

## Force deployment 强制部署

You may get this message:
您可能会收到此消息：

```
--> Deploying to dev environment
--> on host 192.168.1.XX

  push your changes before deploying

Deploy failed
```

That means that you have changes in your local system that aren't pushed inside your git repository, and since the deploy script get the update via `git pull` they will not be on your server.
If you want to deploy without pushing any data, you can append the `--force` option:
这意味着您本地系统中有些改变没有被提交您的git存储库中，且由于部署脚本通过 `git pull`获得更新，它们将不会在您的服务器上。如果您想要在不提交任何数据的情况下进行部署，可以附加 `--force`选项：

```bash
pm2 deploy ecosystem.json production --force
```

---

## Considerations 注意事项

- You can use the option `--force` to skip local change detection
您可以使用 `--force`选项跳过本地更改检测

- Verify that your remote server has the permission to git clone the repository
验证您的远程服务器是否具有git clone存储库的权限

- You can declare specific environment variables depending on the environment you want to deploy the code to. For instance to declare variables for the production environment, add "env_production": {} and declare the variables.
您可以根据要部署代码的环境声明特定的环境变量。 例如，要为生产环境声明变量，请添加 "env_production": {} 并声明变量。

- You can embed the "apps" & "deploy" section in the package.json
您可以在package.json中嵌入 "apps"和 "deploy"分区

---

## Troubleshooting 故障排除

#### SSH clone errors SSh clone错误
In most cases, these errors will be caused by `pm2` not having the correct keys to clone your repository. You need to verify at every step that the keys are available.
在大多数情况下，这些错误都是由 `pm2`没有正确的密钥来clone进您的存储库而引起。 您需要在每一步都验证密钥是否可用。

__Step 1__ __第一步__ 
If you are certain your keys are correctly working, first try running `git clone your_repo.git` on the target server. If it succeeds, move onto the next steps. If it failed, make sure your keys are stored both on the server and on your git account.
如果您确定您的密钥有效，请先尝试在目标服务器上运行 `git clone your_repo.git`。 如果成功，请转到下一步。 如果失败，请确保您的密钥既存储在服务器上，也存储在您的git账户中。

__Step 2__ __第二步__
By default `ssh-copy-id` copies the default identiy, usually named `id_rsa`. If that is not the appropriate key:
默认情况下 `ssh-copy-id`复制默认标识，通常名为`id_rsa`。 如果这不是合适的密钥：

```bash
ssh-copy-id -i path/to/my/key your_username@server.com
```
This adds your public key to the `~/.ssh/authorized_keys` file.
这会将您的公钥添加到 `〜/ .ssh / authorized_keys`文件中。

__Step 3__ __第三步__
If you get the following error:
如果您收到以下错误：
```
--> Deploying to production environment
--> on host mysite.com
  ○ hook pre-setup
  ○ running setup
  ○ cloning git@github.com:user/repo.git
Cloning into '/var/www/app/source'...
Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights and that the repository exists.

**Failed to clone**

Deploy failed
```
...you may want to create a ssh config file. This is a sure way to ensure that the correct ssh keys are used for any given repository you're trying to clone. See [this example](https://gist.github.com/Protosac/c3fb459b1a942f161f23556f61a67d66):
你可能会想创建一个ssh配置文件。 这是确保正确的ssh密钥可用于任何您想要clone的特定存储库的可靠方法。 看[这个例子](https://gist.github.com/Protosac/c3fb459b1a942f161f23556f61a67d66)：

```
# ~/.ssh/config
Host alias
    HostName myserver.com
    User username
    IdentityFile ~/.ssh/mykey
# Usage: `ssh alias` 
# Alternative: `ssh -i ~/.ssh/mykey username@myserver.com`

Host deployment
    HostName github.com
    User username
    IdentityFile ~/.ssh/github_rsa
# Usage:
# git@deployment:username/anyrepo.git 
# This is for cloning any repo that uses that IdentityFile. This is a good way to make sure that your remote cloning commands use the appropriate key
```

---

## Windows Consideration 关于Windows

To run the deploy script under Windows, you need to use a unix shell like bash, so we recommend to install either [Git bash](https://git-scm.com/download/win), [Babun](http://babun.github.io/) or  [Cygwin](https://cygwin.com/install.html)
要在Windows下运行部署脚本，需要使用像bash这样的unix外壳，所以我们建议安装[Git bash](https://git-scm.com/download/win)，[Babun](http://babun.github.io/)或 [Cygwin](https://cygwin.com/install.html)

---

## Contributing 贡献

This tool is a separate module of pm2. You can contribute to it [here](https://github.com/Unitech/pm2-deploy">https://github.com/Unitech/pm2-deploy).
这个工具是pm2的一个单独模块。 您可以在[这里](https://github.com/Unitech/pm2-deploy">https://github.com/Unitech/pm2-deploy)为它做出贡献。

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论