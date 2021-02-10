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

  componentDidMount() {}

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
        this.setState({
          selectedStock: tickerSymbol,
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
    const formattedStock = stock.toUpperCase();
    if (this.state.savedStocks.indexOf(stock) === -1) {
      this.setState({
        savedStocks: [...this.state.savedStocks, formattedStock]
      })
    }
  }

  deleteStock(e, stock) {
    e.preventDefault();
    let updatedSavedStocks = this.state.savedStocks.filter( savedStock => savedStock !== stock )
    this.setState({
      savedStocks: updatedSavedStocks
    });
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
      </div>
    )
  }
}

export default App;