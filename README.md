# React + TypeScript + Vite + Yarn

## Architecture
- State management: Redux Toolkit.
- Data fetching: Redux Toolkit Query.
- Folder and state structure: feature based.
- Separation of concerns:
  - Logics live in React Hooks or Redux Listener Middlewares.
  - Styles are in stylesheets (as opposed to in JS, or inline).
  - State, reducers and selectors live in `features/feature-slice.ts`.
  - React components serve as views.

## Run locally

```
yarn install
```
Then:
```
yarn dev
```

## Run tests
```
yarn test
```
