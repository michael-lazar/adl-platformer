This repo is a quick and dirty hack to demonstrate porting a javascript
web game to run in a terminal emulator.

The basic steps are:

1. Run the webapp inside of a virtual DOM ([JSDOM](https://github.com/jsdom/jsdom)).
2. Attach an observer to the page to watch for changes to the screen.
3. Render the screen to the terminal window using [blessed](https://github.com/chjj/blessed).
4. Watch for keyboard events in the terminal, and forward them to the virtual DOM.

## Build Instructions

```
git clone https://github.com/michael-lazar/adl-platformer
cd adl-platformer

npm install
node index.js
```

## License

The files in `public/` were download from
https://adelfaure.net/lab/platformer/. There is no license for these
and I don't have permission to redistribute them.

The rest of the files are licensed under Blue Oak Model License 1.0.0.
