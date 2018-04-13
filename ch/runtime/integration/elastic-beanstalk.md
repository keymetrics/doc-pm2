---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Using PM2 with AWS Elastic Beanstalk 用AWS Elastic Beanstalk使用PM2

This page will guide you step by step through the PM2 integration in an AWS Elastic Beanstalk environment.
此页面将指导您逐步完成AWS Elastic Beanstalk环境中的PM2集成。

We will use Git and the Elastic Beanstalk CLI.
我们将使用Git和Elastic Beanstalk CLI。

---

## Prepare your app 准备您的应用

### Set your ecosystem file 设置您的生态系统文件

Generate an `ecosystem.config.js` template with:
以此生成一个 `ecosystem.config.js`模板：

```bash
pm2 init
```

Change the template to suit your needs:
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

?> Learn more about ecosystem file [here](runtime/guide/ecosystem-file.md).
在[此处](runtime/guide/ecosystem-file.md)了解更多关于生态系统文件的教程。

### Add PM2 as a module 将PM2添加为模块

Add pm2 as a dependency to your projet.
将pm2作为依赖项添加到您的项目中。

With npm: 使用npm:

```bash
npm install --save pm2
```

With yarn: 使用yarn:

```bash
yarn add pm2
```

### Set your package.json 设置你的package.json

In your `package.json`, modify the start script to:
在您的`package.json`中，修改启动脚本:

```json
{
  "scripts": {
    "start": "node ./node_modules/.bin/pm2-runtime start ecosystem.config.js --env production"
  }
```

---

## Deploy with Elastic Beanstalk CLI 使用Elastic Beanstalk CLI进行部署


### Create an account on AWS and get your access keys 在AWS上创建一个帐户并获取您的访问密钥


Sign up for an account on AWS [here](https://console.aws.amazon.com/elasticbeanstalk/).
在[这里](https://console.aws.amazon.com/elasticbeanstalk/)注册AWS账户。

In order to get access keys, you must create an IAM user. You can do that [here](https://console.aws.amazon.com/iam/home#/home).
为了获得访问密钥，您必须创建一个IAM用户。 您可以在[这里](https://console.aws.amazon.com/iam/home#/home)进行。

Add a user:添加一个用户：

![create an IAM User]({{site.baseurl}}/img/runtime/IAM-add.png)

Give it the programmatic access:
给予它编程访问：

![select programmatic access]({{site.baseurl}}/img/runtime/IAM-prog.png)

Select the `ElasticBeanstalkFullAccess` strategy:
选择 `ElasticBeanstalkFullAccess`策略：

![select programmatic access]({{site.baseurl}}/img/runtime/IAM-strat.png)

Create the user and you will get your access keys:
创建用户，您将获得您的访问密钥：

![access keys]({{site.baseurl}}/img/runtime/IAM-creds.png)

Copy and paste your `access-id` and your `secret-key` in your AWS config file (`~/.aws/config`):
将您的 `access-id`和您的 `secret-key`复制并粘贴到您的AWS配置文件 (`~/.aws/config`)：

```Vim
[profile eb-cli]
aws_access_key_id = YYYYYYYYYYYYY
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXX
```

### Install the CLI 安装CLI

The CLI is available with pip, the python package manager:
CLI可用于python包管理器pip:

```bash
pip3 install --upgrade --user awsebcli
```

?> Further instructions to install [here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html).
进一步的安装说明在[这里](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

### Init your Elastic Beanstalk app 初始化您的Elastic Beanstalk应用程序

Run `eb init -p Node.js` to initialize your Node.js app:
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

For a description of each option see the AWS example [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html)
有关每个选项的说明，请参阅[此处](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html)的AWS示例

### Create an Elastic Beanstalk environment 创建一个Elastic Beanstalk环境

Each application can have many environments, which is useful to manage separate environments for development, testing or production.
每个应用可有多个环境，这对于管理用于开发，测试或生产的独立环境很有用。

Before creating an environment, make sure to commit your changes. The Elastic Beanstalk uses `git archive` to create a .zip file from the contents of the most recent git commit command.
在创建环境之前，请确保提交您的更改。 Elastic Beanstalk使用 `git archive`从最近的git commit命令内容中创建一个.zip文件。

To create a new environment, run the following:
要创建新环境，请运行以下命令：
```bash
eb create eb-pm2-example-env
```

List all available environments with:
用此列出所有可用的环境：
```bash
eb list
eb-pm2-example-env
```

Get environment infos and status with:
用此获取环境信息和状态：
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


?> Later, to deploy latest changes, commit them and run `eb deploy <environment_name>` or just `eb deploy`.
稍后，要部署最新的更改，请提交它们并运行 `eb deploy <environment_name>`或就运行 `eb deploy`。

---

## You are ready 您准备好了

That's all! Run `eb open` to open your app in the browser.
就是这样！ 运行 `eb open`在浏览器中打开您的应用。

---

## Next step 下一步

Complete your configuration with the [Ecosystem File](runtime/guide/ecosystem-file.md)
使用 [生态系统文件](runtime/guide/ecosystem-file.md)完成您的配置

Monitor your app on a dashboard, with [PM2 Monitoring](monitoring/integration/beanstalk.md)
使用 [PM2 Monitoring](monitoring/integration/beanstalk.md)在仪表板上监控您的应用

---

## Questions ? 问题？

We are always happy to help with questions you might have. Search our documentation or check out answers to common questions. You can also post questions or comments to our community forum.
我们永远乐于帮您解决可能遇到的问题。搜索我们的文档或查看常见问题的答案。您也可以在我们的社区论坛发布问题或评论。

