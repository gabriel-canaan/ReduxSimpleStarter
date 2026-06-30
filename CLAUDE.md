# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # webpack-dev-server at localhost:8080 (hot reloading)
npm test           # mocha test suite (single run)
npm run test:watch # mocha in watch mode
```

Tests run against jsdom (not a real browser). Babel transpilation uses `react`, `es2015`, and `stage-1` presets.

To run a single test file:
```bash
./node_modules/.bin/mocha --compilers js:babel-core/register --require ./test/test_helper.js <path/to/test_file.js>
```

## Architecture

This is a React + Redux + React Router v2 app demonstrating the Higher-Order Component (HOC) pattern for authentication gating.

**Data flow:** Redux store holds a single boolean `authenticated` (via `reducers/authentication.js`). The `authenticate(bool)` action creator (type `CHANGE_AUTH`) is the only way to flip it. No async middleware is wired — `applyMiddleware()` is called with no arguments in `src/index.js`.

**Routing:** React Router v2 with `browserHistory`. The root `<App>` wraps all routes and renders `<Header>` plus `{this.props.children}`. The `/resources` route is wrapped with `requireAuth(Resources)`.

**HOC pattern — `require_authentication.js`:** The core teaching piece. `requireAuth(ComposedComponent)` returns an `Authentication` class that reads `state.authenticated` and redirects to `/` via `this.context.router.push('/')` in both `componentWillMount` and `componentWillUpdate` if the user is not authenticated. It then renders `<ComposedComponent {...this.props} />`.

**Test helper:** `test/test_helper.js` sets up jsdom globally, wraps components in a real Redux `<Provider>`, and exposes `renderComponent(ComponentClass, props, state)` returning a jQuery-wrapped DOM node. Tests use chai + chai-jquery assertions.

## Key Constraints

- Locked to `react-redux@4.3.0` (see `package.json` comment in git history) — do not upgrade without testing.
- Uses React 0.14 APIs: `React.PropTypes`, `react-addons-test-utils`, `ReactDOM.findDOMNode`. These are deprecated in later React versions.
- `comment_box.js` was deleted; `test/components/comment_box_test.js` still exists and will fail if run.
