# proxy



Instructions:
  By adding to the routes.json file, proxy requests can be made from a local machine to a specified target

  In the routes.json file, add a new entry for the local endpoint 
  you will hit as the json key and the target url as the json value.


  {
  "data": "https://www.google.com"
  }


  A .env file provides a port value for running this proxy project, if none is specified it will default to 8000

To Run:
  execute "npm start", this will run the proxy on the given port

  Example request:
  GET request to http://localhost:8089/data will proxy the GET request to https://www.google.com

  Any query parameters added to the request will be automatically passed over to the target url and do not require being added to the routes.json
  Example request:
  GET request to http://localhost:8089/data?test=1 will proxy the GET request to https://www.google.com?test=1
