---
layout: page
title: Installation | Guide | PM2 Documentation
menu: starter
lang: en
section: runtime
redirect_from: "/runtime/guide/installation"
---

# Installation

## Install pm2

With yarn:
```bash
yarn global add pm2
```

With npm:
```bash
npm install pm2 -g
```

With debian, use the install script:
```bash
apt update && apt install sudo curl && curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
```

With docker, follow this [tutorial]({{ site.baseurl }}{% link en/runtime/integration/docker.md %}).

### CLI autocompletion

By default, CLI autocompletion is not installed with PM2, we recommend it:

```bash
pm2 completion install
```

### Source map support

Source map files are autodetected by default if they are present (`app.js.map` for `app.js`).

 What are source map files ? If using Babel, Typescript or any other Javascript superset, you may have noticed that stacktraces are not meaningful, errors not pointing to the right line. Source map files can be used to solve this problem.
{: .tip}

## Update

Keep your pm2 up to date with:

```bash
npm install pm2 -g && pm2 update
```

 `pm2 update` is necessary in order to refresh the PM2 daemon.
{: .tip}

## Next Steps

[Ecosystem File]({{ site.baseurl }}{% link en/runtime/guide/ecosystem-file.md %})
{: .btn-stylized}

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on the [PM2 github repository](https://github.com/Unitech/pm2/issues).
