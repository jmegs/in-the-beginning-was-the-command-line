# Static Starter

Project starter to spin up a static site when you don't need a js framework.

The scaffold includes:

* The [Hugo][1] static site generator — super fast, super maintained
* A Gulp-based asset pipeline:
  * Postcss with [cssnext] and [imports]
  * Simple js concatenation
  * Images optimization with [imagemin]
* live reloading and mobile mirroring with [browsersync]

## Instructions

1.  Clone the repo and clean up its git brain (remove my git repo and start a new blank one)

    ```sh
     git clone --depth 1 https://github.com/jmegs/static-starter.git <PROJECT_FOLDER>
     cd <PROJECT_FOLDER>
     rm -rf .git && git init
    ```

2.  Install dependencies. Bask in stillness while it loads. Breathe deeply.

    `npm install`

3.  Start the development server and look at your site on http://localhost:3000

    `npm start`

4.  When you're done. Build the project into dist/ and deploy it somewhere awesome.

    `npm run build`

## Structure

```
.
├── dist/
├── assets
│   ├── css/
│   ├── fonts/
│   ├── img/
│   └── js/
├── gulpfile.js
├── netlify.toml
├── package-lock.json
├── package.json
└── site
    ├── config.toml
    ├── content
    ├── data
    ├── layouts
    │   ├── _default
    │   │   └── baseof.html
    │   ├── index.html
    │   └── partials
    └── static
```

* Built output lives in `dist`, ready to deploy to wherever you host your static files. I suggest [netlify] or Zeit's [now].
* Views and content live in `site/` where they will be compiled by the static site generator. See [hugo's docs][2].
* CSS, JS, images, and fonts live in `assets/` where they will be processed by gulp and placed lovingly into the root of `dist`.

## Features Coming Soon

* [ x ] Module bundling and transpilation with Webpack and Babel. Because javascript.
* [ ] One-click deploy to Netlify.
* [ ] Suggested default data source and setup (most likely NetlifyCMS).

[1]: https://gohugo.io
[2]: http://gohugo.io/content-management/
[cssnext]: http://cssnext.io/
[imports]: https://github.com/postcss/postcss-import
[imagemin]: https://github.com/sindresorhus/gulp-imagemin
[browsersync]: https://browsersync.io/docs
[netlify]: https://www.netlify.com/
[now]: https://zeit.co/now
