import 'babel-polyfill';
import express from 'express'
import renderer from './helpers/renderer'

let app = express();
let port = 3000;


app.use(express.static('public'));
app.get('*', (req, res) => {
  const context = {};
  res.send(renderer(req, context));
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))