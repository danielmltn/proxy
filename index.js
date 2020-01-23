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

const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 8000

app.get('/:key_id', (req, res) => {
  const urlKey = req.params.key_id

  const rawRoutes = fs.readFileSync('./routes.json');
  const routes = JSON.parse(rawRoutes);
  const proxyURL = createURL(routes[urlKey], req.query)
  
  console.log(`proxying your request from ${req.hostname} to destination ${proxyURL}`)
  request(proxyURL).pipe(res)
})

app.listen(port, () => {
  console.log(`producer service listening for requests on port ${port}...`)
})

function createURL(baseURL, queryParams = {}) {
  const url = new URL(baseURL)
  Object.keys(queryParams).forEach(key => {
    url.searchParams.append(key, queryParams[key])
  })
  console.log(url.pathname)
  return url.href
}
