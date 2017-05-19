import React, {
    Component
}
from "react";
import {
    connect
}
from "react-redux";
import Trade from "../components/Trade";
import { withRouter } from 'react-router-dom';


class TradeContainer extends Component{
    
    
    componentWillReceiveProps(newProps) {
        
    }
    
    
    render() {
        return (
            <Trade {...this.props}/>    
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        symbol: ownProps.match.params.symbol,
        symbols: getSymbols(state.stocks.data)
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeTradeForm: (symbol) => {
            ownProps.history.push(`/trade/${symbol}`);
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TradeContainer));


function getSymbols(stocks) {
    return stocks.map(stock => {
        return stock.symbol;
    });
}