import React from 'react';
import Stock from './Stock.jsx';

function SavedStocks(props) {
  return (
    <div>
      <p>SAVED STOCKS</p>
      {props.savedStocks.map((stock) => {
        const formattedStock = stock.toUpperCase();
        return <Stock key={formattedStock} formattedStock={formattedStock} deleteStock={props.deleteStock}/>
      })}
    </div>
  )
}

export default SavedStocks;