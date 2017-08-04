# gulpBoiler17
A simple front end boilerplate using Babel (es2015 and es2017), Gulp, Scss, ESLint, and Browsersync.

## Get started

`git clone --depth=1 https://github.com/mildrenben/gulpBoiler17.git`

`npm i`

`npm start`

Done.

---

## Components

- *HTML* - HTML sits in the top level `src` folder.
- *SCSS* - Only one `.css` file is written (`style.css`). You need to import all other `.scss` files into the existing `style.scss` file.
- *JS* - Babel compiles the JS with the es2015 and es2017 presets. It is not concatenated, I suggest using `gulp-concat` if you need multiple files.
- *Images* - Images are minified from the `src/img` directory.

## Tools

- *Linting* - ESLint (extended from eslint recommended) lints the JS with some custom rules as well. Use `npm lint` to manually run it. If you want to lint on every git commit see [here](https://gist.github.com/wesbos/8aec9d2ff7f7cf9dd65ca2c20d5dfc23)
- *Hot reloading* - SCSS changes are injected. HTML and JS changes reload the page.