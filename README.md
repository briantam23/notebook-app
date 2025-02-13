# Notebook App 📓

A notebook app that allows users to create sketches with notes.

## Table of Contents
* [Live Demo](#live-demo)
* [Dependencies](#dependencies)
* [Requirements](#requirements)
* [Client Installation](#client-installation)
* [Running Client Locally](#running-client-locally)
* [Server Installation](#server-installation)
* [Running Server Locally](#running-server-locally)
* [List of Implemented Features](#list-of-implemented-features)
* [Any assumptions or design decisions made](#any-assumptions-or-design-decisions-made)
* [Future improvements if given more time](#future-improvements-if-given-more-time)


## Login Credentials

Username: Foo <br>
Password: Bar

## Live Demo

[https://notebook-app-opal.vercel.app](https://notebook-app-opal.vercel.app)

## Dependencies
* [React](https://reactjs.org)
* [NextJS](https://nextjs.org)
* [TypeScript](https://www.typescriptlang.org)
* [TailwindCSS](https://tailwindcss.com)

## Requirements
* [Node.js (v18.17.0)](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)

## Client Installation
Step 1: Clone Repo
```sh
git clone https://github.com/briantam23/notebook-app.git` # or clone your own fork
```

Step 2: Change Directory to `client`
```sh
cd client
```

Step 3: Install `node_modules`
```sh
npm install # or yarn install
```

## Running Client Locally
1. Make sure you're in the `client` directory.
2. Run `npm run dev`


## Server Installation
Step 1: Clone Repo (if you haven't done so already)
```sh
git clone https://github.com/briantam23/notebook-app.git` # or clone your own fork
```

Step 2: Change Directory to `server`
```sh
cd server
```

Step 3: Install `node_modules`
```sh
npm install # or yarn install
```

## Running Server Locally
1. Make sure you're in the `server` directory.
2. `npm run start` to run the app in the development mode.


## List of Implemented Features
1. Created a responsive design that works on desktop and mobile.
2. Implemented a simple light/dark mode toggle.
4. Implemented a basic canvas-based drawing tool.
5. Included simple shape tools (line, rectangle, freehand drawing).
6. Added text input functionality for adding notes.
7. Implemented a basic authentication system using a mock service.
8. Added the ability to export notebooks as images or PDFs.

## Any assumptions or design decisions made
1. User will easily navigate the UI without needing instructions.

## Future improvements if given more time
1. Finish backend
2. More CSS to enhance UI
3. For sketch UX:
    1. Add color tool
    2. Add circle tool
    3. Add undo / redo functionality
    4. Add import functionality
4. Add more error handling
5. Add typing
