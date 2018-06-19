---
layout: page
title: 转化器 | 综合 | PM2教程
title-en: Transpilers | Integration | PM2 Documentation
menu: starter
lang: zh
section: runtime
---

# 与转化器一起使用PM2

本教程将向您展示如何在转化器中使用pm2。

 我们强烈建议不要在**production**中使用它，因为它会减慢您的应用运行。 在这种情况下，您的应用必须被捆绑，即从源代码转换来获取应用的预处理版本.
{: .warn}

## Babel Babel

```bash
## Install the Babel CLI globally:
npm install -g babel-cli

## Start pm2 with the Babel CLI binary in watch mode:
pm2 start --watch --interpreter babel-cli app.js
```

或者，您可以创建一个其他文件，这需要转译器和您的应用：
```javascript
// index.js
require('babel-register');
require('./app.js');
```
然后，运行：
```bash
pm2 start --watch index.js
```

 群集模式仅在第二个选项中可用。
{: .tip}

## Coffee-script

```bash
## Install Coffee Script globally:
npm install -g babel-cli

## Start pm2 with coffee binary in watch mode:
pm2 start --watch --interpreter coffee app.coffee
```

或者，您可以创建一个其他文件，这需要转译器和您的应用：
```javascript
// index.js
require('coffee/register');
require('./app.coffee');
```
然后，运行：
```bash
pm2 start --watch index.js
```

 群集模式仅在第二个选项中可用。
{: .tip}