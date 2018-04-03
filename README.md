Please ignore .gulp.js and package.json at the moment.

To run the site:
1. Run `bundle install` to install Jekyll and it's dependency
2. Then run `bundle exec jekyll serve` to start the Jekyll server. Using your web browser, access the address http://localhost:4000/runtime/overview/

Simplified structure how current translation works.

```
├ _i18n/
│ ├ ch/
│ │  └ runtime/
│ │       └ overview.md  (contains chinese text)
│ ├ en/
│ │  └ runtime/
│ │       └ overview.md  (contains english text)
│ ├ ch.yml
│ └ en.yml
│
├ runtime/
     └ overview.html
```