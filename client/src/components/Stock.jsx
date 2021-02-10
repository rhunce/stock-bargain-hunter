import React from 'react';

function Stock(props) {
  return (
    <div>
      <div>{props.formattedStock}
        <span
          style={{color: 'red'}}
          onClick={(e) => {props.deleteStock(e, props.formattedStock)}}
        >
        X
        </span>
      </div>
    </div>
  )
}

export default Stock;