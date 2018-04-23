---
layout: page
title: Elastic Beanstalk | 综合 | PM2教程
title-en: Elastic Beanstalk | Integration | PM2 Documentation
menu: starter
lang: ch
---

# 与AWS Elastic Beanstalk一起使用PM2

此页面将指导您逐步完成AWS Elastic Beanstalk环境中的PM2集成。

我们将使用Git和Elastic Beanstalk CLI。

---

## 准备您的应用

### 设置您的生态系统文件

以此生成一个 `ecosystem.config.js`模板：

```bash
pm2 init
```

更改模板以满足您的需求：

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

?> 在[此处](runtime/guide/ecosystem-file.md)了解更多关于生态系统文件的教程。

### 将PM2添加为模块

将pm2作为依赖项添加到您的项目中。

使用npm:

```bash
npm install --save pm2
```

使用yarn:

```bash
yarn add pm2
```

### 设置您的package.json

在您的`package.json`中，修改启动脚本为:

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"
  }
```

---

## 使用Elastic Beanstalk CLI进行部署


### 在AWS上创建一个帐户并获取您的访问密钥


在[这里](https://console.aws.amazon.com/elasticbeanstalk/)注册AWS账户。

为获得访问密钥，您必须创建一个IAM用户。 您可以在[这里](https://console.aws.amazon.com/iam/home#/home)进行。

添加一个用户：

![创建一个IAM用户]({{site.baseurl}}/img/runtime/IAM-add.png)

给予它编程访问：

![选择编程访问]({{site.baseurl}}/img/runtime/IAM-prog.png)

选择 `ElasticBeanstalkFullAccess`策略：

![选择编程访问]({{site.baseurl}}/img/runtime/IAM-strat.png)

创建用户，您将获得您的访问密钥：

![访问密钥]({{site.baseurl}}/img/runtime/IAM-creds.png)

将您的 `access-id`和您的 `secret-key`复制粘贴到您的AWS配置文件 (`~/.aws/config`)：

```Vim
[profile eb-cli]
aws_access_key_id = YYYYYYYYYYYYY
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXX
```

### 安装CLI

CLI可用于python包管理器pip:

```bash
pip3 install --upgrade --user awsebcli
```

?> 进一步的安装说明在[这里](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

### 初始化您的Elastic Beanstalk应用

运行 `eb init -p Node.js`来初始化您的Node.js应用：

```bash
eb init --profile eb-cli -p Node.js

Select a default region
2) us-west-1 : US West (N. California)

Select an application to use
[ Create new Application ]

Enter Application Name
eb-pm2-example
Application eb-pm2-example has been created.

Do you want to set up SSH for your instances?
(y/n): n
```

有关每个选项的说明，请参阅[此处](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html)的AWS示例

### 创建一个Elastic Beanstalk环境

每个应用可有多个环境，这对于管理用于开发，测试或生产的独立环境很有用。

在创建环境之前，请确保提交您的更改。 Elastic Beanstalk使用 `git archive`从最近的git commit命令内容中创建一个.zip文件。

要创建一个新环境，请运行以下命令：
```bash
eb create eb-pm2-example-env
```

列出所有可用的环境：
```bash
eb list
eb-pm2-example-env
```

获取环境信息和状态：
```bash
eb status

Environment details for: eb-pm2-example-env
  Application name: eb-pm2-example
  Region: us-west-2
  Deployed Version: app-4408-180305
  Environment ID: e-gekedaw
  Platform: arn:aws:elasticbeanstalk:us-west-1::platform/Node.js running on 64bit Amazon Linux/4.4.5
  Tier: WebServer-Standard-1.0
  CNAME: eb-pm2-example.us-west-2.elasticbeanstalk.com
  Updated: 2018-02-19 23:51:59.259000+00:00
  Status: Ready
  Health: Green
```


?> 稍后，要部署最新的更改，请提交它们并运行 `eb deploy <environment_name>`或 `eb deploy`。

---

## 您准备好了

就是这样！ 运行 `eb open`在浏览器中打开您的应用。

---

## 下一步

使用 [生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

使用 [PM2 Monitoring](monitoring/integration/beanstalk.md)在仪表板上监控您的应用

---

## 疑问？

我们一直乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。

