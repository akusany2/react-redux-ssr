import 'babel-polyfill';
import express from 'express'

import { matchRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Routes from './client/Routes'
import renderer from './helpers/renderer'
import reducers from './client/reducers'

let app = express();
let port = 3000;

const store = createStore(reducers, applyMiddleware(thunk));

app.use(express.static('public'));
app.get('*', (req, res) => {

  const branch = matchRoutes(Routes, req.url);

  const promises = branch.map(({ route }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
  });

  return Promise.all(promises).then(data => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  })

})

app.listen(port, () => console.log(`Listening on localhost:${port}`))