---
layout: page
title: Quick Start with PM2
menu: starter
lang: ch
---

# Using PM2 with transpilers 在转化器中使用PM2

This tutorial will show you how to use pm2 with transpilers.
本教程将向您展示如何在转化器中使用pm2。

!> We highly don't recommend to use this in **production** as it slows down your app. In that case, your app must be bundled i.e. transpiled from the source to get a pre-processed version of your app.
我们强烈建议不要在**production**中使用它，因为它会减慢您的应用。 在这种情况下，您的应用必须捆绑在一起，即从源代码转换来获取应用的预处理版本.

---

## Babel Babel

```bash
## Install the Babel CLI globally:
npm install -g babel-cli

## Start pm2 with the Babel CLI binary in watch mode:
pm2 start --watch --interpreter babel-cli app.js
```

Or, you can create an other file, which requires the transpiler and your app:
或者，您可以创建一个其他文件，这需要转译器和您的应用：
```javascript
// index.js
require('babel-register');
require('./app.js');
```
Then, run:然后，运行：
```bash
pm2 start --watch index.js
```

?> The cluster mode is only available with the second option.
群集模式仅在第二个选项中可用。

---

## Coffee-script Coffee-script

```bash
## Install Coffee Script globally:
npm install -g babel-cli

## Start pm2 with coffee binary in watch mode:
pm2 start --watch --interpreter coffee app.coffee
```

Or, you can create an other file, which requires the transpiler and your app:
或者，您可以创建一个其他文件，这需要转译器和您的应用：
```javascript
// index.js
require('coffee/register');
require('./app.coffee');
```
Then, run: 然后，运行：
```bash
pm2 start --watch index.js
```

?> The cluster mode is only available with the second option.
群集模式仅在第二个选项中可用。