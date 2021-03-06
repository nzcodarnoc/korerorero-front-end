# Korerorero Front End

## Dependencies

This project is a component of korerorero-reverse-proxy project: <https://github.com/ServiceInnovationLab/korerorero-reverse-proxy>

This project has only been tested in Chrome browser. It doesn't work in Safari, and hasn't been tested in Firefox or IE.

Safari needs more work because of deviations from in the Web Audio API spec. Safari needs, at least, browser prefixes for some of the methods in `Recognizer.js`, and perhaps more.

## Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn install
# then
yarn dev
```

Open <http://localhost:3000> with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

If this project is run without the orchestration service from the korerorero-reverse-proxy project it will complain of network errors.

## Storybook

To view this project with a mock orchestration service.

This command starts storybook and a mock service, so make sure you quit `korerorero-reverse-proxy` before you run it, otherwise there will be a port conflict resulting in network errors.

The network mocks and the mock server are located in `__mocks__`. There is an artificial 1.5 second delay to simulate network lag.

```bash
yarn run storybook
```

And visit <http://localhost:6006/>

## Docker

To build

```bash
docker build -t korerorero-front-end:latest .
```

To run

```bash
docker run -p 3000:3000 korerorero-front-end:latest
```
