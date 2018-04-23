Please ignore .gulp.js and package.json at the moment.

To run the site:
1. Run `bundle install` to install Jekyll and it's dependency
2. Then run `bundle exec jekyll serve` to start the Jekyll server. Using your web browser, access the address http://localhost:4000/process-manager/overview/

Simplified structure how current translation works.

```
├ _i18n/
│ ├ ch/
│ │  └ process-manager/
│ │       └ overview.md  (contains chinese text)
│ ├ en/
│ │  └ process-manager/
│ │       └ overview.md  (contains english text)
│ ├ ch.yml
│ └ en.yml
│
├ process-manager/
     └ overview.html
```
---
For development purpose, I usually use gulp (to concat *.scss to bundle.css, etc),
If for some good reason, you want to start the site with gulp, follow these steps :
1. Run `npm i` this will install all npm package in package.json
2. Run `gulp` to execute default task, which build the site and watch for changes on certain folder.