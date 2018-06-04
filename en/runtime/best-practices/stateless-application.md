---
layout: page
title: Stateless Application | Best Practices | PM2 Documentation
menu: starter
lang: en
section: runtime
redirect_from: "/runtime/best-practices/stateless-application"
---

# Stateless Application

A stateless application has no local data stored in the process. For example, sessions/websocket connections, session-memory and related.

You must use Redis, Mongo or other databases to share all states between processes.

A useful resource on how to write efficient, production ready stateless application is The Twelve Factor Application manifesto: https://12factor.net/

---

## Questions?

We are always happy to help with questions you might have. Use the search or check out the FAQ. You can also post questions or comments on the [PM2 github repository](https://github.com/Unitech/pm2/issues).
