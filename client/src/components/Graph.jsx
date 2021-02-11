import React from 'react';
import zingchart from 'zingchart/es6';
import ZingChart from 'zingchart-react';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'line',
        'scale-x': {
          labels: []
        },
        series: [
          {
            values: []
          }
        ]
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedStock !== prevProps.selectedStock) {
      this.setState({
        config: {
          type: 'line',
          'scale-x': {
            labels: this.props.selectedStockDates
          },
          series: [
            {
              values: this.props.selectedStockPrices
            }
          ]
        }
      })
    }
  }

  render() {
    return (
      <div>
        <h4>{this.props.selectedStock}</h4>
        <ZingChart data={this.state.config} width="75%"/>
      </div>
    );
  }
}

export default Graph;