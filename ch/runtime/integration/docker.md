---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Using PM2 with Docker 用Docker使用PM2

Production ready Node.js Docker image including [PM2](http://pm2.keymetrics.io/).
生产就绪的Node.js Docker镜像，包括 [PM2](http://pm2.keymetrics.io/)。

The goal of pm2-runtime is to wrap your applications into a proper Node.js production environment. It solves major issues when running Node.js applications inside a container like:
pm2-runtime的目标是将您的应用包装到合适的Node.js生产环境中。 它解决了在容器内部运行Node.js应用时遇到的主要问题：


- Second Process Fallback for High Application Reliability
- Process Flow Control
- Automatic Application Monitoring to keep it always sane and high performing
- Automatic Source Map Discovery and Resolving Support 
- 高应用可靠性的第二个过程回退
- 流程控制
- 自动应用监控以便使它始终保持健全和高性能
- 自动源地图发现与解析支持

Further than that, using PM2 as a layer between the container and the application brings PM2 powerful features like ecosystem file, custom log system and other features of pm2.
除此之外，使用PM2作为容器和应用之间的一个层，带来了PM2强大的功能，如生态系统文件，自定义日志系统和pm2的其他功能。

---

## Prepare your app 准备您的应用

### Tags available 可用标签

**Image Name** | **Operating system** | **Dockerfile**
---|---|---
keymetrics/pm2:`latest-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[latest-alpine](tags/latest/alpine/Dockerfile)
keymetrics/pm2:`8-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[8-alpine](tags/8/alpine/Dockerfile)
keymetrics/pm2:`6-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[6-alpine](tags/6/alpine/Dockerfile)
keymetrics/pm2:`4-alpine`|[Alpine](https://www.alpinelinux.org/about/)|[4-alpine](tags/4/alpine/Dockerfile)
**Image Name** | **Operating system** | **Dockerfile**
keymetrics/pm2:`latest-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[latest-stretch](tags/latest/stretch/Dockerfile)
keymetrics/pm2:`8-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[8-stretch](tags/8/stretch/Dockerfile)
keymetrics/pm2:`6-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[6-stretch](tags/6/stretch/Dockerfile)
keymetrics/pm2:`4-stretch`|[Debian Stretch](https://wiki.debian.org/DebianStretch)|[4-stretch](tags/4/stretch/Dockerfile)
**Image Name** | **Operating system** | **Dockerfile**
keymetrics/pm2:`latest-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[latest-jessie](tags/latest/jessie/Dockerfile)
keymetrics/pm2:`8-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[8-jessie](tags/8/jessie/Dockerfile)
keymetrics/pm2:`6-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[6-jessie](tags/6/jessie/Dockerfile)
keymetrics/pm2:`4-jessie`|[Debian Jessie](https://wiki.debian.org/DebianJessie)|[4-jessie](tags/4/jessie/Dockerfile)
**Image Name** | **Operating system** | **Dockerfile**
keymetrics/pm2:`latest-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[latest-slim](tags/latest/slim/Dockerfile)
keymetrics/pm2:`8-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[8-slim](tags/8/slim/Dockerfile)
keymetrics/pm2:`6-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[6-slim](tags/6/slim/Dockerfile)
keymetrics/pm2:`4-slim`|[Debian Jessie](https://wiki.debian.org/DebianJessie) (minimal packages)|[4-slim](tags/4/slim/Dockerfile)
**Image Name** | **Operating system** | **Dockerfile**
keymetrics/pm2:`latest-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[latest-wheezy](tags/latest/wheezy/Dockerfile)
keymetrics/pm2:`8-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[8-wheezy](tags/8/wheezy/Dockerfile)
keymetrics/pm2:`6-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[6-wheezy](tags/6/wheezy/Dockerfile)
keymetrics/pm2:`4-wheezy`|[Debian Wheezy](https://wiki.debian.org/DebianWheezy)|[4-wheezy](tags/4/wheezy/Dockerfile)

You can find more information about the image variants [here](https://github.com/nodejs/docker-node#image-variants).
您可以在[这里](https://github.com/nodejs/docker-node#image-variants)找到更多关于图像变体的信息。

> The build process of these images is automatically triggered each time [NodeJS's Docker images](https://hub.docker.com/r/library/node/tags/) are built.  
The build process of these images is automatically triggered each time [Docker PM2's GitHub repo](https://github.com/keymetrics/docker-pm2) master branch is pushed.  
The build process of these images is automatically triggered each time [PM2's GitHub repo](https://github.com/Unitech/pm2) master branch is pushed.  
每次构建这些图像的过程都会自动触发 [NodeJS's Docker images](https://hub.docker.com/r/library/node/tags/)的构建。
每次 [Docker PM2's GitHub repo](https://github.com/keymetrics/docker-pm2)主分支被推送时，这些图像的构建过程都会自动触发。
每次 [PM2's GitHub repo](https://github.com/Unitech/pm2)主分支被推送时，这些图像的构建过程都会自动触发。 

### Usage 使用

Let's assume the following folder structure for your project.
我们假设您的项目有以下文件夹结构。 

```
`-- your-app-name/
    |-- src/
        `-- app.js
    |-- package.json
    |-- ecosystem.config.js    (we will create this in the following steps)
    `-- Dockerfile             (we will create this in the following steps)
```

### Set your ecosystem file 设置您的生态系统文件

Generate an `ecosystem.config.js` template with:
用此生成一个`ecosystem.config.js`模板：

```bash
pm2 init
```

Modify the ecosystem file to match your needs:
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

?> Learn more about ecosystem file [here](runtime/guide/ecosystem-file.md).
在[这里](runtime/guide/ecosystem-file.md)了解更多关于生态系统文件的教程。

### Set a Dockerfile 设置一个Dockerfile

Create a new file called `Dockerfile` with the following content:
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

### Build your image 建立您的图像

From your Node.js app project folder launch those commands:
从您的Node.js应用项目文件夹启动这些命令：

```bash
docker build -t your-app-name .
```

### Run your image 运行您的图像

```bash
docker run -p 80:8000 your-app-name
```

?> `-p 80:8000` binds the port 8000 of your app to the port 80 of the localhost
`-p 80:8000`将您应用的端口8000绑定到本地主机的端口80

### pm2 commands pm2命令

pm2 commands can still be used insidea container with the `docker exec` command:
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

### Expose health endpoint 暴露安全端点

```Dockerfile
CMD ["pm2-runtime", "ecosystem.config.js", "--web"]
```

The `--web [port]` option allows to expose all vital signs (docker instance + application) via a JSON API.
`--web [port]`选项允许通过JSON API公开所有生命体征（docker实例+应用）.

?> After installing pm2 in your shell, run `pm2-runtime -h` to get all options available
在shell中安装pm2之后，运行 `pm2-runtime -h`获取所有可用选项.

### You are ready 您准备好了

That's all! Your container is ready to be deployed.
就是这样！ 您的容器已准备好部署。

---

## Next step 下一步

Complete your configuration with the [Ecosystem File]
(runtime/guide/ecosystem-file.md)
使用[生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

Monitor your app on a dashboard, with [PM2 Monitoring](monitoring/integration/docker.md)
使用 [PM2 Monitoring](monitoring/integration/docker.md)在仪表板上监控您的应用

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。