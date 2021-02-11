import React from 'react';
import Header from './Header.jsx';
import StockSelector from './StockSelector.jsx';
import Graph from './Graph.jsx';
import Table from './Table.jsx';
import SavedStocks from './SavedStocks.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      selectedStock: '',
      selectedStockDates: [],
      selectedStockPrices: [],
      savedStocks: [],
      priceToEarningsRatio: null,
      priceToBookValueRatio: null,
      returnOnAssets: null,
      returnOnEquity: null
    }

    this.tickerSubmissionHandler = this.tickerSubmissionHandler.bind(this);
    this.saveStock = this.saveStock.bind(this);
    this.deleteStock = this.deleteStock.bind(this);
  }

  componentDidMount() {
    axios.get('/savedstocks')
      .then((stocks) => {
        const allSavedStocks = stocks.data;
        this.setState({
          savedStocks: allSavedStocks
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  tickerSubmissionHandler(e, tickerSymbol) {
    e.preventDefault();
    document.getElementById('ticker').value = '';
    axios.get(`/prices/${tickerSymbol}`)
      .then((prices) => {
        const priceData = prices.data['Monthly Time Series']
        const dates = [];
        const pastPrices = [];
        for (let date in priceData) {
          dates.push(date);
          pastPrices.push(parseFloat(priceData[date]['4. close']));
        }
        dates.reverse();
        pastPrices.reverse();
        let trimmedDates = dates;
        let trimmedpastPrices = pastPrices;
        if (dates.length > 60) {
          trimmedDates = trimmedDates.slice(-60);
          trimmedpastPrices = trimmedpastPrices.slice(-60);
        }
        const formattedTickerSymbol = tickerSymbol.toUpperCase();
        this.setState({
          selectedStock: formattedTickerSymbol,
          selectedStockDates: trimmedDates,
          selectedStockPrices: trimmedpastPrices
        })
      })
      .catch((err) => {
        console.error(err);
      });

      axios.get(`/fundamentals/${tickerSymbol}`)
      .then((fundamentals) => {
        this.setState({
          selectedStockCompanyName: fundamentals.data.Name,
          priceToEarningsRatio: parseFloat(fundamentals.data.PERatio),
          priceToBookValueRatio: parseFloat(fundamentals.data.PriceToBookRatio),
          returnOnAssets: parseFloat(fundamentals.data.ReturnOnAssetsTTM),
          returnOnEquity: parseFloat(fundamentals.data.ReturnOnEquityTTM)
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveStock(e, stock) {
    e.preventDefault();
    axios.post('/savestock', { stock })
      .then((savedStock) => {
        if (this.state.savedStocks.indexOf(stock) === -1) {
          this.setState({
            savedStocks: [...this.state.savedStocks, savedStock.data]
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  deleteStock(e, stock) {
    e.preventDefault();
    axios.delete('/stocktodelete', { params: { stock } })
      .then(() => {
        let updatedSavedStocks = this.state.savedStocks.filter( savedStock => savedStock.stock !== stock )
        this.setState({
          savedStocks: updatedSavedStocks
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render () {
    return (
      <div>
        <Header />
        <StockSelector tickerSubmissionHandler={this.tickerSubmissionHandler}/>
        <Graph
          selectedStock={this.state.selectedStock}
          selectedStockDates={this.state.selectedStockDates}
          selectedStockPrices={this.state.selectedStockPrices}
        />
        <Table
          selectedStock={this.state.selectedStock}
          priceToEarningsRatio={this.state.priceToEarningsRatio}
          priceToBookValueRatio={this.state.priceToBookValueRatio}
          returnOnAssets={this.state.returnOnAssets}
          returnOnEquity={this.state.returnOnEquity}
          saveStock={this.saveStock}
        />
        <SavedStocks
          savedStocks={this.state.savedStocks}
          deleteStock={this.deleteStock}
        />
        <div>
          <p><a href={"mailto:someone@example.com?subject=Check Out These Stonks!&body=I found some potential bargains! Take a look at these: " + this.state.savedStocks.map((currentStock) => {return currentStock.stock})}><button type="button" disabled={!this.state.savedStocks.length}>Share These Stonks!</button></a></p>
        </div>
      </div>
    )
  }
}

export default App;