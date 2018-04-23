---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# 使用SSH轻松部署

在许多部署工作流程中，例程基本上由连接到多个服务器的SSH组成，git pull最新版本之后重载到应用中。

pm2部署工具的目的是自动执行此任务。

设置一系列远程主机，一个预先部署/部署后命令行操作，然后你便可以完成。

---

## 安装

### SSH设置

确保您的本地机器上有公共的ssh密钥：

```bash
ssh-keygen -t rsa
ssh-copy-id node@myserver.com
```

### 生态系统文件

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

?> 要获取有关部署选项的更多信息，请查看生态系统文件参考

?> 请注意，远程路径必须为空，因为它将由pm2部署进行填充

### 设置

进行您的第一次部署并填充远程路径：

```bash
pm2 deploy production setup
```

### 部署

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

## 部署选项

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

## 强制部署

您可能会收到此消息：

```
--> Deploying to dev environment
--> on host 192.168.1.XX

  push your changes before deploying

Deploy failed
```

这意味着您本地系统中有些改变没有被push到您的git存储库中，且由于部署脚本通过 `git pull`获得更新，它们将不会存在于您的服务器上。如果您想在不提交任何数据的情况下进行部署，您可以附加 `--force`选项：

```bash
pm2 deploy ecosystem.json production --force
```

---

## 注意事项

- 您可以使用 `--force`选项跳过本地更改检测

- 验证您的远程服务器是否具有git clone存储库的权限

- 您可以根据要部署代码的环境，声明特定的环境变量。 例如，要为生产环境声明变量，请添加 "env_production": {} 并声明变量。

- 您可以在package.json中嵌入 "apps"和 "deploy"分区

---

## 故障排除

#### SSh clone错误
在大多数情况下，这些错误都是由 `pm2`没有正确的密钥来clone进您的存储库而引起。 您需要在每一步都验证密钥是否可用。

__第一步__ 
如果您确定您的密钥有效，请先尝试在目标服务器上运行 `git clone your_repo.git`。 如果成功，请转到下一步。 如果失败，请确保您的密钥既存储在服务器上，也存储在您的git账户中。

__第二步__
默认情况下 `ssh-copy-id`复制默认标识，通常名为`id_rsa`。 如果这不是合适的密钥：

```bash
ssh-copy-id -i path/to/my/key your_username@server.com
```
这会将您的公钥添加到 `〜/ .ssh / authorized_keys`文件中。

__第三步__
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
...您可能会想创建一个ssh配置文件。 这是确保正确的ssh密钥可用于任何您想要clone的特定存储库的可靠方法。 看[这个例子](https://gist.github.com/Protosac/c3fb459b1a942f161f23556f61a67d66)：

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

## 关于Windows

要在Windows下运行部署脚本，您需要使用像bash这样的unix外壳，所以我们建议安装[Git bash](https://git-scm.com/download/win)，[Babun](http://babun.github.io/)或 [Cygwin](https://cygwin.com/install.html)

---

## 贡献

这个工具是pm2的一个单独模块。 您可以在[这里](https://github.com/Unitech/pm2-deploy">https://github.com/Unitech/pm2-deploy)为它做出贡献。

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论