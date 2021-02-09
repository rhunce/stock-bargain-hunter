import React from 'react';
import Header from './Header.jsx';
import StockSelector from './StockSelector.jsx';
import Graph from './Graph.jsx';
import Table from './Table.jsx';
import SavedStocks from './SavedStocks.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <Header />
        <StockSelector />
        <Graph />
        <Table />
        <SavedStocks />
      </div>
    )
  }
}

export default App;