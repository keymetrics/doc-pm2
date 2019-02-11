---
layout: page
title: 启动挂钩 | 指南 | PM2教程
title-en: Startup Hook | Guide | PM2 Documentation
menu: starter
lang: zh
section: runtime
---

# 启动挂钩

启动挂钩的目的是保存您的进程列表，并在计算机重启甚至出现意外时将其恢复。

每个操作系统都有一个特定的工具来处理启动挂钩：pm2提供了一种简单的方法来生成和配置它们。

## 安装

检测计算机上可用的init系统并生成配置，使用：

```bash
pm2 startup
$ [PM2] 您必须以root身份运行此命令。 执行以下命令:
$ sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

在CLI中复制并粘贴此命令的输出以设置启动挂钩。

 使用NVM时，此`pm2`路径会在更新Node.js时改变。 每次更新后您都需要运行`startup`命令。
{: .warn}

 您可以通过`--service-name <name>`选项自定义服务名称 ([#3213](https://github.com/Unitech/pm2/pull/3213))
{: .tip}

## 保存您的进程列表

启动挂钩会自动加载您之前保存的进程列表。

以此来保存您的进程列表：

```bash
pm2 save
```

## 禁用启动系统

```bash
pm2 unstartup
```

## 用户权限

如果您希望启动挂钩在其他用户下执行，使用 `-u <username>`和 `--hp <user_home>`选项：

```bash
pm2 startup ubuntu -u www --hp /home/ubuntu
```

## 更新启动挂钩

要更新启动挂钩，请运行以下命令：

```bash
pm2 unstartup
pm2 startup
```

## 兼容性

支持的Init系统是：

- **systemd**: Ubuntu >= 16, CentOS >= 7, Arch, Debian >= 7
- **upstart**: Ubuntu <= 14
- **launchd**: Darwin, MacOSx
- **openrc**: Gentoo Linux, Arch Linux
- **rcd**: FreeBSD
- **systemv**: Centos 6, Amazon Linux

如果您愿意，您可以指定使用平台：

```bash
pm2 [startup | unstartup] [platform]
```

平台可以是下列其中一个：

`[ubuntu | ubuntu14 | ubuntu12 | centos | centos6 | arch | oracle | amazon | macos | darwin | freebsd | systemd | systemv | upstart | launchd | rcd | openrc]`

## 在后台

- **ubuntu** 使用 `updaterc.d` 和脚本 `lib/scripts/pm2-init.sh`
- **centos**/**redhat** 使用 `chkconfig` 和脚本 `lib/scripts/pm2-init-centos.sh`
- **gentoo** 使用 `rc-update` 和脚本 `lib/scripts/pm2`
- **systemd** 使用 `systemctl` 和脚本 `lib/scripts/pm2.service`
- **darwin** 使用 `launchd` 来加载一个特定的 `plist` 以便在重启后复活进程.

## 关于windows

有一些外部库可以生成一个与Windows兼容的启动脚本，请查看[pm2-windows-service](https://www.npmjs.com/package/pm2-windows-service) 或 [pm2-windows-startup](https://www.npmjs.com/package/pm2-windows-startup).

## 下一步

[负载平衡 (群集模式)]({{ site.baseurl }}{% link zh/runtime/guide/load-balancing.md %})
{: .btn-stylized}

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。
