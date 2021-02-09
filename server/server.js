const axios = require('axios');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const { API_KEY } = require('../config.js');

let app = express();

app.use(parser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/fundamentals/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`)
    .then((companyOverview) => {
      res.status(200).send(companyOverview.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/prices/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${API_KEY}`)
    .then((companyPrices) => {
      res.status(200).send(companyPrices.data);
    })
    .catch((err) => {
      console.error(err);
    })
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

