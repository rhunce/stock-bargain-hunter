import React from 'react';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {}

  // componentDidUpdate(prevProps) {
  //   if (this.props.selectedStockCompanyName !== prevProps.selectedStockCompanyName) {

  //   }
  // }

  render () {
    return (
      <div>
        <table>
          <tr>
            <th></th>
            <th>Target</th>
            <th>Current</th>
            <th>Go/No-Go</th>
          </tr>
          <tr>
            <td>P/E Ratio</td>
            <td><input type="text"></input></td>
            <td>{this.props.priceToEarningsRatio}</td>
            <td style={{background: "green"}}></td>
          </tr>
          <tr>
            <td>P/B Ratio</td>
            <td><input type="text"></input></td>
            <td>{this.props.priceToBookValueRatio}</td>
            <td style={{background: "green"}}></td>
          </tr>
          <tr>
            <td>ROA</td>
            <td><input type="text"></input></td>
            <td>{this.props.returnOnAssets}</td>
            <td style={{background: "green"}}></td>
          </tr>
          <tr>
            <td>ROE</td>
            <td><input type="text"></input></td>
            <td>{this.props.returnOnEquity}</td>
            <td style={{background: "green"}}></td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Table;