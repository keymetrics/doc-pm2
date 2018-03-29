# Startup Hook 启动挂钩

The purpose of a startup hook is to save your process list and bring it back at machine restarts, even unexpected ones.
启动挂钩的目的是保存您的进程列表，并在计算机重启甚至出现意外时将其恢复。

Each OS has a specific tool to handle startup hooks: pm2 provides an easy way to generate and configure them.
每个操作系统都有一个特定的工具来处理启动挂钩：pm2提供了一种简单的方法来生成和配置它们。

---

## Installation 安装

To detect available init systems on your machine and generate a configuration, use:
检测计算机上可用的init系统并生成配置，使用：

```bash
pm2 startup
$ [PM2] You have to run this command as root. Execute the following command:
$ sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```
```bash
pm2 启动
$ [PM2] 您必须以root身份运行此命令。 执行以下命令:
$ sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

Copy and paste in the CLI the ouput of this command to set up your startup hook.
在CLI中复制并粘贴此命令的输出以设置启动挂钩。

!> With NVM, the `pm2` path change when updating nodejs. You need to run the `startup` command after every update.
使用NVM时，此`pm2`路径会在更新nodejs时改变。 每次更新后您都需要运行`startup`命令。

?> You can customize the service name via the `--service-name <name>` option ([#3213](https://github.com/Unitech/pm2/pull/3213))
您可以通过`--service-name <name>`选项自定义服务名称 ([#3213](https://github.com/Unitech/pm2/pull/3213))

---

## Save your process list 保存您的进程列表

The startup hook auto load the process list that you have previously saved.
启动挂钩会自动加载您之前保存的进程列表。

Save your process list with:
以此来保存您的进程列表：

```bash
pm2 save
```

---

## Disabling startup system 禁用启动系统

```bash
pm2 unstartup
```

---

## User permissions 用户权限

If you want the startup hook to be executed under another user, use the `-u <username>` option and the `--hp <user_home>`:
如果您希望启动挂钩在其他用户下执行，使用 `-u <username>`和 `--hp <user_home>`选项：

```bash
pm2 startup ubuntu -u www --hp /home/ubuntu
```

---

## Update startup hook 更新启动挂钩

To update the startup hook run the following commands:
要更新启动挂钩，请运行以下命令：

```bash
pm2 unstartup
pm2 startup
```

---

## Compatibility 兼容性

Init systems supported are:
支持的Init系统是：

- **systemd**: Ubuntu >= 16, CentOS >= 7, Arch, Debian >= 7
- **upstart**: Ubuntu <= 14
- **launchd**: Darwin, MacOSx
- **openrc**: Gentoo Linux, Arch Linux
- **rcd**: FreeBSD
- **systemv**: Centos 6, Amazon Linux

You can specify the platform you use if you want to:
如果您愿意，您可以指定使用平台：

```bash
pm2 [startup | unstartup] [platform]
```

Platform can be either one of the cited below:
平台可以是下列的其中一个：

`[ubuntu | ubuntu14 | ubuntu12 | centos | centos6 | arch | oracle | amazon | macos | darwin | freebsd | systemd | systemv | upstart | launchd | rcd | openrc]`

---

## Under the hood 在后台

- **ubuntu** use `updaterc.d` and the script `lib/scripts/pm2-init.sh`
- **centos**/**redhat** use `chkconfig` and the script `lib/scripts/pm2-init-centos.sh`
- **gentoo** use `rc-update` and the script `lib/scripts/pm2`
- **systemd** use `systemctl` and the script `lib/scripts/pm2.service`
- **darwin** use `launchd` to load a specific `plist` to resurrect processes after reboot.
- **ubuntu** 使用 `updaterc.d` 和脚本 `lib/scripts/pm2-init.sh`
- **centos**/**redhat** use `chkconfig` 和脚本 `lib/scripts/pm2-init-centos.sh`
- **gentoo** 使用 `rc-update` 和脚本 `lib/scripts/pm2`
- **systemd** 使用 `systemctl` 和脚本 `lib/scripts/pm2.service`
- **darwin** 使用 `launchd` 来加载一个特定的 `plist` 以便在重启后复活进程.

---

## Windows consideration 关于windows

There are some external libraries to generate a Windows compatible startup script, please checkout [pm2-windows-service](https://www.npmjs.com/package/pm2-windows-service) or [pm2-windows-startup](https://www.npmjs.com/package/pm2-windows-startup).
有一些外部库可以生成一个与Windows兼容的启动脚本，请查看[pm2-windows-service](https://www.npmjs.com/package/pm2-windows-service) 或 [pm2-windows-startup](https://www.npmjs.com/package/pm2-windows-startup).

---

## Next step 下一步

[Load-balancing (cluster mode)](runtime/guide/cluster.md)
[负载平衡 (群集模式)](runtime/guide/cluster.md)

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。