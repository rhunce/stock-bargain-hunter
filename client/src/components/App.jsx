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
      savedStocks: []
    }

    this.tickerSubmissionHandler = this.tickerSubmissionHandler.bind(this);
  }

  componentDidMount() {}

  tickerSubmissionHandler(e, tickerSymbol) {
    e.preventDefault();
    document.getElementById('ticker').value = '';
    axios.get(`/prices/${tickerSymbol}`)
      .then((prices) => {
        const priceData = prices.data["Monthly Time Series"]
        const dates = [];
        const pastPrices = [];
        for (let date in priceData) {
          dates.push(date);
          pastPrices.push(priceData[date]);
        }
        this.setState({
          selectedStock: tickerSymbol,
          selectedStockDates: dates,
          selectedStockPrices: pastPrices
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
        <Table />
        <SavedStocks />
      </div>
    )
  }
}

export default App;