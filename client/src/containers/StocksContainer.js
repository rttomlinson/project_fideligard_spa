import React, {
    Component
}
from "react";
import {
    connect
}
from "react-redux";
import Stocks from "../components/Stocks";
import {
    fetchStocks,
    setTickerFilter,
    changeTickerOrder
}
from "../actions/stocksAction";

function getVisibleTickers(stocks, filter) {
    return stocks.filter((stock) => {
        return (new RegExp(filter, 'i')).test(stock.symbol);
    });
}

function orderVisibleTickers(stocks, sort) {
    if (sort) {
        return stocks.sort(function(a, b) {
            if (a.symbol < b.symbol) {
                return -1;
            } else if (a.symbol > b.symbol) {
                return 1;
            }
            return 0;
        });
    } else {
        return stocks.sort(function(a, b) {
            if (b.symbol < a.symbol) {
                return -1;
            } else if (b.symbol > a.symbol) {
                return 1;
            }
            return 0;
        });
    }

}



class StocksContainer extends Component {
    componentDidMount() {
        this.props.fetchStocks(this.props.date);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.date !== this.props.date) {
            this.props.fetchStocks(newProps.date);
        }
    }


    render() {
        let {stocks, date, filter, sort} = this.props;
        stocks = getVisibleTickers(stocks, filter);
        stocks = orderVisibleTickers(stocks, sort);
        return <Stocks stocks={stocks} date={date} setTickerFilter={this.props.setTickerFilter} changeTickerOrder={this.props.changeTickerOrder}/>;
    }
}

function mapStateToProps(state) {
    return {
        stocks: state.stocks.data,
        date: state.date,
        filter: state.stocks.filter,
        sort: state.stocks.sort
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStocks: date => {
            dispatch(fetchStocks(date));
        },
        setTickerFilter: (e) => {
            dispatch(setTickerFilter(e.target.value));
        },
        changeTickerOrder: () => {
            dispatch(changeTickerOrder());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
