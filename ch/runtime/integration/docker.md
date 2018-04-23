---
layout: page
title: Docker | 综合 | PM2教程
title-en: Docker | Integration | PM2 Documentation
menu: starter
lang: ch
---

# 与Docker一起使用PM2

生产就绪的Node.js Docker镜像，包括 [PM2](http://pm2.keymetrics.io/)。

pm2-runtime的目标是将您的应用包装到合适的Node.js生产环境中。 它解决了在容器内部运行Node.js应用时遇到的主要问题：


- 高应用可靠性的第二个过程回退
- 进程流控制
- 自动监控应用以便使它始终保持健全和高性能
- 自动源地图发掘与解析支持

除此之外，使用PM2作为容器和应用之间的一个层，带来了PM2强大的功能，如生态系统文件，自定义日志系统和pm2的其他功能。

---

## 准备您的应用

### 可用标签

**镜像名称** | **操作系统* | **Docker文件**
---|---|---
keymetrics/pm2:`latest-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[latest-alpine](tags/latest/alpine/Dockerfile)
keymetrics/pm2:`8-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[8-alpine](tags/8/alpine/Dockerfile)
keymetrics/pm2:`6-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[6-alpine](tags/6/alpine/Dockerfile)
keymetrics/pm2:`4-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[4-alpine](tags/4/alpine/Dockerfile)
**镜像名称** | **操作系统** | **Docker文件**
keymetrics/pm2:`latest-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[latest-stretch](tags/latest/stretch/Dockerfile)
keymetrics/pm2:`8-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[8-stretch](tags/8/stretch/Dockerfile)
keymetrics/pm2:`6-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[6-stretch](tags/6/stretch/Dockerfile)
keymetrics/pm2:`4-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[4-stretch](tags/4/stretch/Dockerfile)
**镜像名称* | **操作系统** | **Docker文件**
keymetrics/pm2:`latest-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[latest-jessie](tags/latest/jessie/Dockerfile)
keymetrics/pm2:`8-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[8-jessie](tags/8/jessie/Dockerfile)
keymetrics/pm2:`6-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[6-jessie](tags/6/jessie/Dockerfile)
keymetrics/pm2:`4-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[4-jessie](tags/4/jessie/Dockerfile)
**镜像名称* | **操作系统** | **Docker文件**
keymetrics/pm2:`latest-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[latest-slim](tags/latest/slim/Dockerfile)
keymetrics/pm2:`8-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[8-slim](tags/8/slim/Dockerfile)
keymetrics/pm2:`6-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[6-slim](tags/6/slim/Dockerfile)
keymetrics/pm2:`4-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[4-slim](tags/4/slim/Dockerfile)
**镜像名称** | **操作系统** | **Docker文件**
keymetrics/pm2:`latest-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[latest-wheezy](tags/latest/wheezy/Dockerfile)
keymetrics/pm2:`8-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[8-wheezy](tags/8/wheezy/Dockerfile)
keymetrics/pm2:`6-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[6-wheezy](tags/6/wheezy/Dockerfile)
keymetrics/pm2:`4-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[4-wheezy](tags/4/wheezy/Dockerfile)

您可以在[这里](https://github.com/nodejs/docker-node#image-variants)找到更多关于镜像变体的信息。

> 每次构建这些图像的过程都会自动触发 [NodeJS's Docker images](https://hub.docker.com/r/library/node/tags/)的构建。
  每次 [Docker PM2's GitHub repo](https://github.com/keymetrics/docker-pm2)主分支被推送时，这些镜像的构建过程都会自动触发。
  每次 [PM2's GitHub repo](https://github.com/Unitech/pm2)主分支被推送时，这些镜像的构建过程都会自动触发。 

### 使用

我们假设您的项目有以下文件夹结构。 

```
`-- your-app-name/
    |-- src/
        `-- app.js
    |-- package.json
    |-- ecosystem.config.js    (we will create this in the following steps)
    `-- Dockerfile             (we will create this in the following steps)
```

### 设置您的生态系统文件

生成一个`ecosystem.config.js`模板：

```bash
pm2 init
```

修改生态系统文件以符合您的需求：

```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

?> 在[这里](runtime/guide/ecosystem-file.md)了解更多关于生态系统文件的教程。

### 设置一个Docker文件

使用以下内容创建一个名为`Dockerfile`的新文件

```dockerfile
FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY ecosystem.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 8000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
```

### 建立您的镜像

从您的Node.js应用项目文件夹启动这些命令：

```bash
docker build -t your-app-name .
```

### 运行您的镜像

```bash
docker run -p 80:8000 your-app-name
```

?> `-p 80:8000`将您应用的端口8000绑定到本地主机的端口80

### pm2命令

pm2命令仍然可以在`docker exec`命令的容器中使用：

```bash
# Monitoring CPU/Usage of each process
docker exec -it <container-id> pm2 monit
# Listing managed processes
docker exec -it <container-id> pm2 list
# Get more information about a process
docker exec -it <container-id> pm2 show
# 0sec downtime reload all applications
docker exec -it <container-id> pm2 reload all
```

### 暴露安全端点

```Dockerfile
CMD ["pm2-runtime", "ecosystem.config.js", "--web"]
```

`--web [port]`选项允许通过JSON API公开所有重要信号（docker实例+应用）.

?> 在shell中安装pm2之后，运行 `pm2-runtime -h`获取所有可用选项.

### 您准备好了

就是这样！ 您的容器已准备好部署。

---

## 下一步

使用[生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

使用 [PM2 Monitoring](monitoring/integration/docker.md)在仪表板上监控您的应用

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。