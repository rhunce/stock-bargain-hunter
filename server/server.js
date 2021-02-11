const axios = require('axios');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const { API_KEY } = require('../config.js');
const { retrieve, save, deleteStock } = require('../database/database.js');

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

app.get('/savedstocks', (req, res) => {
  retrieve()
    .then((stocks) => {
      let retrievedStocks = [];
      for (let i = 0; i < stocks.length; i++) {
        retrievedStocks.push(stocks[i]._doc)
      }
      res.status(200).send(retrievedStocks);
    })
    .catch((err) => {
      console.error(err);
    });
})

app.post('/savestock', (req, res) => {
  const companyTicker = req.body.stock;
  save(companyTicker)
    .then((savedStock) => {
      res.status(201).send(savedStock._doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.delete('/stocktodelete', (req, res) => {
  deleteStock(req.query.stock)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

