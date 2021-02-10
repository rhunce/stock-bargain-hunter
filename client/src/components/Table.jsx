import React from 'react';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      targetPriceToEarnings: null,
      targetPriceToBook: null,
      targetReturnOnAssets: null,
      targetReturnOnEquity: null
    }

    this.targetValueChangeHandler = this.targetValueChangeHandler.bind(this);
  }

  componentDidMount() {}

  targetValueChangeHandler(e) {
    this.setState({
      [e.target.name]: parseFloat(e.target.value)
    });
  }

  render () {
    return (
      <div>
        <table>
          <tr>
            <th></th>
            <th>Current</th>
            <th>Target</th>
            <th>Go/No-Go</th>
          </tr>
          <tr>
            <td>P/E Ratio &#40;Current &le; Target ?&#41;</td>
            <td>{this.props.priceToEarningsRatio || 0.00.toFixed(2)}</td>
            <td>
              <input
                type="text"
                id="pe-ratio"
                name="targetPriceToEarnings"
                onChange={this.targetValueChangeHandler}>
              </input>
            </td>
            <td
              style={this.state.targetPriceToEarnings >= this.props.priceToEarningsRatio ?
              {background: "green"} :
              {background: "red"}}>
            </td>
          </tr>
          <tr>
            <td>P/B Ratio &#40;Current &le; Target ?&#41;</td>
            <td>{this.props.priceToBookValueRatio || 0.00.toFixed(2)}</td>
            <td>
              <input
                type="text"
                id="pb-ratio"
                name="targetPriceToBook"
                onChange={this.targetValueChangeHandler}>
              </input>
            </td>
            <td
              style={this.state.targetPriceToBook >= this.props.priceToBookValueRatio ?
              {background: "green"} :
              {background: "red"}}>
            </td>
          </tr>
          <tr>
            <td>ROA &#40;%&#41;  &#40;Current &ge; Target ?&#41;</td>
            <td>{(this.props.returnOnAssets * 100).toFixed(2)}</td>
            <td>
              <input
                type="text"
                id="roa"
                name="targetReturnOnAssets"
                onChange={this.targetValueChangeHandler}>
              </input>
            </td>
            <td
              style={this.state.targetReturnOnAssets <= (this.props.returnOnAssets * 100) ?
              {background: "green"} :
              {background: "red"}}>
            </td>
          </tr>
          <tr>
            <td>ROE &#40;%&#41;  &#40;Current &ge; Target ?&#41;</td>
            <td>{(this.props.returnOnEquity * 100).toFixed(2)}</td>
            <td>
              <input
                type="text"
                id="roe"
                name="targetReturnOnEquity"
                onChange={this.targetValueChangeHandler}>
              </input>
            </td>
            <td
              style={this.state.targetReturnOnEquity <= (this.props.returnOnEquity * 100) ?
              {background: "green"} :
              {background: "red"}}>
            </td>
          </tr>
        </table>
        <button
          type="button"
          disabled={!this.props.selectedStock}
          onClick={(e) => {this.props.saveStock(e, this.props.selectedStock)}}>
          Save Stock!
        </button>
      </div>
    )
  }
}

export default Table;