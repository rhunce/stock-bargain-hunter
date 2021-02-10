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
      selectedStockCompanyName: '',
      selectedStockDates: [],
      selectedStockPrices: [],
      savedStocks: [],
      priceToEarningsRatio: null,
      priceToBookValueRatio: null,
      returnOnAssets: null,
      returnOnEquity: null
    }

    this.tickerSubmissionHandler = this.tickerSubmissionHandler.bind(this);
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
        const selectedStockCompanyName = fundamentals.data.Name;
        const priceToEarningsRatio = parseFloat(fundamentals.data.PERatio);
        const priceToBookValueRatio = parseFloat(fundamentals.data.PriceToBookRatio);
        const returnOnAssets = parseFloat(fundamentals.data.ReturnOnAssetsTTM);
        const returnOnEquity = parseFloat(fundamentals.data.ReturnOnEquityTTM);
        this.setState({
          selectedStockCompanyName,
          priceToEarningsRatio,
          priceToBookValueRatio,
          returnOnAssets,
          returnOnEquity
        })
      })
      .catch((err) => {
        console.error(err);
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
          selectedStockCompanyName={this.state.selectedStockCompanyName}
          priceToEarningsRatio={this.state.priceToEarningsRatio}
          priceToBookValueRatio={this.state.priceToBookValueRatio}
          returnOnAssets={this.state.returnOnAssets}
          returnOnEquity={this.state.returnOnEquity}
        />
        <SavedStocks />
      </div>
    )
  }
}

export default App;