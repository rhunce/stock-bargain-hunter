import React from 'react';
import Stock from './Stock.jsx';
import { v4 as uuidv4 } from 'uuid';


function SavedStocks(props) {
  return (
    <div>
      <p>SAVED STONKS</p>
      {props.savedStocks.map((stock) => {
        if (typeof stock === 'object' && stock !== null) {
          stock = stock.stock;
        }
        const formattedStock = stock.toUpperCase();
        return <Stock key={uuidv4()} formattedStock={formattedStock} deleteStock={props.deleteStock}/>
      })}
    </div>
  )
}

export default SavedStocks;