import React from "react";
import currencyFormatter from 'currency-formatter';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

function makeStockRows(stocks) {
  return stocks.map(stock => {
    return (
      <tr key={stock.symbol}>
        <td>{stock.symbol}</td>
        <td>{stock.day_0 ? currencyFormatter.format(+stock.day_0, { code: "USD" }) : "N/A"}</td>
        <td>{stock.day_1 ? currencyFormatter.format(+stock.day_0 - +stock.day_1, { code: "USD"}) : "N/A"}</td>
        <td>{stock.day_7 ? currencyFormatter.format(+stock.day_0 - +stock.day_7, { code: "USD"}) : "N/A"}</td>
        <td>{stock.day_30 ? currencyFormatter.format(+stock.day_0 - +stock.day_30, { code: "USD"})  : "N/A"}</td>
        <td><NavLink to={`/trade/${stock.symbol}`}>trade</NavLink></td>
      </tr>
    );
  });
}

const Stocks = ({ stocks, date, setTickerFilter, changeTickerOrder }) => {
  return (
    <nav className="col-sm-4 col-md-4 hidden-xs-down bg-faded sidebar">
      <h1>Stocks</h1>
      <p>Date: {date}</p>
      <p>Ticker Filter<input type="text" onChange={setTickerFilter}/></p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Symbol<button className="btn btn-default" type="button" onClick={changeTickerOrder}>^</button></th>
              <th>Price</th>
              <th>1D</th>
              <th>7D</th>
              <th>30D</th>
              <th>Trade?</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length ? makeStockRows(stocks) : null}
          </tbody>
        </table>
      </div>
    </nav>
  );
};
Stocks.propTypes = {
    stocks: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    setTickerFilter: PropTypes.func.isRequired
};
export default Stocks;
