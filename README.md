# React SSR Proof of concept

Responsive gallery that shows speed run games from https://www.speedrun.com/. On image click, a new page is loaded showing info about game last run, including a link to its video on Youtube.

There is no error view implemented, so if there is any error the App will only log the error message in the console.

As UI and UX are not the main purpose of this PoC, all styles are implemented using inline styles to simpllify and speed up the development process.

## Stack
- Express v4
- React v16
- React Router v4
- Redux

## Browser compatibility

The App has been only tested on Google Chrome v69, Safari v12 and Mozilla Firefox v57. Running in different web browsers or versions may lead to unexpected behaviour.

## Prerequisites

- *Node*: v10.10 is recommended. Previous versions are discouraged and may lead to unexpected behaviour.

## Installing

From the root folder:
```
npm install
```

## Development

This will start the server on port 2048 in watch mode. The app will be accessible on: http://localhost:2048.

```
npm run dev
```

## Tests

Unit tests has been implemented. To execute them in watch mode:

```
npm test
```