import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

const store = createStore(reducers, window.__INITIAL_STATE__, applyMiddleware(thunk));


ReactDOM.hydrate(
  <Provider store={store} >
    <BrowserRouter>
      {renderRoutes(Routes)}
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));