import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import requireAuth from './components/require_authentication';

import App from './components/app';
import Home from './components/Home';
import Resources from './components/Resources';
import SignIn from './components/SignIn';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='resources' component={requireAuth(Resources)} />
        <Route path='signin' component={SignIn} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
