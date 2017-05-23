/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import LoginFramelessView from './view/login-frameless-view';
import VisitorApp from './visitor-app';
import UserApp from './user-app';
import * as reducers from './reducer';
import * as remote from './remote';
import constants from './config/constants';

const bootVisitorApp = () => {
  const store = (window.devToolsExtension ?
    window.devToolsExtension()(createStore) : createStore)(
    reducers.visitorLevelReducer,
    applyMiddleware(thunk),
  );
  ReactDOM.render(
    <Provider store={store}>
      <VisitorApp />
    </Provider>,
    document.getElementById('droplets'),
  );
};

const bootLoginFrameless = () => {
  const baseStore = (window.devToolsExtension ?
    window.devToolsExtension()(createStore) : createStore)(
    reducers.baseReduce,
  );
  ReactDOM.render(
    <Provider store={baseStore}>
      <LoginFramelessView />
    </Provider>,
    document.getElementById('droplets'),
  );
};

const bootUserApp = () => {
  const store = (window.devToolsExtension ?
    window.devToolsExtension()(createStore) : createStore)(
    reducers.userLevelReducer,
    applyMiddleware(thunk),
  );
  ReactDOM.render(
    <Provider store={store}>
      <UserApp />
    </Provider>,
    document.getElementById('droplets'),
  );
};

(() => {
  switch (remote.droplets.level) {
    case constants.LEVEL.NO:
      bootLoginFrameless();
      break;
    case constants.LEVEL.VISITOR:
      bootVisitorApp();
      break;
    case constants.LEVEL.USERS:
      bootUserApp();
      break;
    default:
      bootLoginFrameless();
  }
})();
