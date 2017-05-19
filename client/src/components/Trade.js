import React from "react";
import Select from './elements/Select';

function symbolsOptions(symbols) {
    return symbols.map((symbol) => {
        return {
            value: symbol,
            text: symbol
        };
    });
}


const Trade = ({symbol, symbols, changeTradeForm}) => {
  return (
    <div>
        <p>Trade</p>
        <div>
            <form>
                <div className="form-group">
                    <label>Symbol</label>
                    <Select options={symbolsOptions(symbols)} value={symbol} name="symbol" onChange={(e) => {
                        changeTradeForm(e.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label>Buy/Sell</label>
                    <Select options={[{value: "buy", text: "Buy"}, {value: "sell", text: "Sell"}]} name="action"/>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input className="form-control" name="quantity"/>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input className="form-control" type="date"/>
                </div>
                <p>Price: </p>
                <p>Total: </p>
                <button className="btn btn-primary" type="submit">Place Order</button>
            </form>
        </div>
        <div>
            <p>Cash Available: </p>
            <p>Order Status: </p>
        </div>
    </div>
    );
};

export default Trade;
