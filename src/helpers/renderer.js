import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';


import Routes from '../client/Routes';

export default (req, store, context) => {
  

  const content = renderToString(
    <Provider store={store} >
      <StaticRouter location={req.path} context={context}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  // content will be overwritten by reactjs after client_bundle is loaded 
  return `
  <html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  </head>
  <body>
    <div id="root">${content}</div>
    <script>
      window.__INITIAL_STATE__=${serialize(store.getState())}
    </script>
    <script src="client_bundle.js"></script>
  </body>
  </html>
  `
}