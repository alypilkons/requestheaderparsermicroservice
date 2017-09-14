const express = require('express');
const useragent = require('useragent');
const forwarded = require('forwarded-for');

const app = express();

app.get('/', function (req, res) {
  var agent = useragent.parse(req.headers['user-agent']);
  const system = agent.toString().split('/')[1];
  const language = req.headers['accept-language'].split(',')[0];
  const address = forwarded(req, req.headers);
  const ip = address.ip;
  res.json({
    software: system,
    language: language,
    ipaddress: ip
  });
});

app.listen(process.env.PORT || 3000);
