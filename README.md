# szablon-stron-html

This repository was made to help setup html projects, with scss and ES6 (or higher) javascript file, as well as minifying, auto-prefixing and setting source-map.

## Setup

To setup and install whole thing u need to have **node.js** installed on Your computer. 
Second thing u need is **gulp** installed globaly `npm install -g gulp`.
Next go to project folder in the console and run `npm install` / `yarn install` command.

You are all up and running now.

## Compile SCSS to CSS

To compile SCSS from **src/scss** to **dist/css** folder run `gulp styles` command.

## Compile ES6 from **src/js/index.js** to **dist/js/bundle.js**

To compile js written in ES6 run `gulp scripts` command.

## Run localhost server with auto-reload

To run auto-reload web server run `gulp development` command, or `gulp development-styles-only` to compile and watch only style files (scss).

## Watch files without local web server

To watch files changes and compile each time without running local web server run `gulp watch-no-auto-reload` command.

## Default

Default set task is development, which is described above. Running `gulp` command with run development command.