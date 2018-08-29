#!/usr/bin/env node
const http = require('http');

const port = '8080';
const statusCode = 404;

const app = new http.Server();

app.on('request', (req, res) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.write('simple http server');
  res.end('\n');
});

app.listen(port, () => {
  console.log(`simple http server is listening on port ${port}`);
});
