import React from 'react';

class StockSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerSymbol: ''
    }

    this.tickerSymbolInputChangeHandler = this.tickerSymbolInputChangeHandler.bind(this);
  }

  componentDidMount() {}

  tickerSymbolInputChangeHandler(e) {
    this.setState({
      tickerSymbol: e.target.value
    });
  }

  render () {
    return (
      <form>
        <label htmlFor="ticker">Type in stock ticker symbol here:</label>
        <input type="text" id="ticker" name="ticker" onChange={this.tickerSymbolInputChangeHandler}/>
        <button type="button" onClick={(e) => {this.props.tickerSubmissionHandler(e, this.state.tickerSymbol)}}>Search</button>
        <span>&#40;Case insensitive&#41;</span>
      </form>
    )
  }
}

export default StockSelector;