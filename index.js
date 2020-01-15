import express from 'express';
import { json, urlencoded } from 'body-parser';
const request = require('request');
const fs = require('fs');


const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('{"hello":"there"}')
})

app.get('/:key_id', (req, res) => {
  const urlKey = req.params.key_id

  const rawRoutes = fs.readFileSync('./routes.json');
  const routes = JSON.parse(rawRoutes);
  const proxyUrl = routes[urlKey];

  console.log(`proxying your request from ${req.hostname} to destination ${proxyUrl}`)
  request(proxyUrl).pipe(res)
})

app.listen(8000, () => {
  console.log(`producer service listening for requests on port 8000...`)
})



//example request
// fetch('http://localhost:8000/').then(res => res.json()).then(data => console.log(data))
