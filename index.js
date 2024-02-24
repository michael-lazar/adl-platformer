const fs = require('fs');
const {JSDOM, VirtualConsole} = require('jsdom');
const blessed = require('blessed');
const path = require("path");

const filename = './public/index.html';
const htmlContent = fs.readFileSync(filename, 'utf8');

const virtualConsole = new VirtualConsole();

const url = new URL("file:" + path.resolve(filename));

const dom = new JSDOM(htmlContent, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    url: url,
    // Hide console output from the web js
    virtualConsole: virtualConsole,
});


const { window } = dom;

const screen = blessed.screen({
    // smartCSR: true,
    fastCSR: true,
    title: 'A Very Bold Character',
    input: process.stdin,
    output: process.stdout,
});

const contentBox = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    tags: true,
    content: '', // Initially empty
});

function refreshScreen(content) {
    contentBox.setContent(content);
    screen.render();
}

const activeKeys = {};

screen.on('keypress', (ch, key) => {

    if (key.full === 'escape' || (key.ctrl && key.name === 'c')) {
        process.exit(0); // Exit the application
    }

    const keyMappings = {
        "down": "ArrowDown",
        "up": "ArrowUp",
        "left": "ArrowLeft",
        "right": "ArrowRight",
        "enter": "Enter"
    };

    // Attempt to find the corresponding value from the keyMappings object
    const k = keyMappings[key.name];

    // If no mapping is found (k is undefined), return early
    if (!k) return;

    if (activeKeys[k] !== null) {
        clearTimeout(activeKeys[k]);
        activeKeys[k] = null;
    }

    const keyboardEvent = new window.KeyboardEvent('keydown', {key: k});
    window.document.dispatchEvent(keyboardEvent);

    // Simulate 'keyup' event after a delay
    activeKeys[k] = setTimeout(() => {
        const keyUpEvent = new window.KeyboardEvent('keyup', {key: k});
        window.document.dispatchEvent(keyUpEvent);
        activeKeys[k] = null;
    }, 100);
});

window.onload = () => {
    const checkForPreElement = setInterval(() => {
        // Attempt to select the only <pre> element without an id
        const preElement = window.document.querySelector('#screenPrint');
        if (preElement) {
            // Once the <pre> element is found, clear the interval
            clearInterval(checkForPreElement);

            // Initial refresh of the screen with the current content of <pre>
            refreshScreen(preElement.textContent);

            // Create a MutationObserver to watch for changes in the <pre> element
            const observer = new window.MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    refreshScreen(preElement.textContent);
                });
            });

            // Specify what you want to observe (childList and characterData changes)
            const config = { childList: true, characterData: true, subtree: true };

            // Start observing the <pre> element
            observer.observe(preElement, config);
        }
    }, 100); // Check every 100 milliseconds
};