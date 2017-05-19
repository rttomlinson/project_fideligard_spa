import install from 'jasmine-es6';
import deepFreeze from 'deep-freeze';
install();

import {
    ADD_CASH,
    SUBTRACT_CASH
}
from '../src/actions/cashAction';
import cashReducer from '../src/reducers/cashReducer';
import {
    addCash
}
from '../src/actions/cashAction';

describe("cash reducer", function() {
    it("add cash of given amount", function() {
        let initialState = {
            cash: 1000
        }
        let action = {
            type: ADD_CASH,
            data: 100
        }
        let finalState = {
            cash: 1100,
            message: "Cash added",
            error: null
        }
        deepFreeze(initialState);
        deepFreeze(action);
        expect(cashReducer(initialState, action)).toEqual(finalState);
    });
    it("creates the appropriate add cash action object", function() {
        const addCashActionObj = {
            type: ADD_CASH,
            data: 100
        }
        expect(addCash(100)).toEqual(addCashActionObj);
    })
    it("subtracts cash of given amount", function() {
        let initialState = {
            cash: 1000
        }
        let action = {
            type: SUBTRACT_CASH,
            data: 100
        }
        let finalState = {
            cash: 900,
            message: "Cash subtracted",
            error: null
        }
        deepFreeze(initialState);
        deepFreeze(action);
        expect(cashReducer(initialState, action)).toEqual(finalState);
    });
    it("creates the appropriate subtract cash action object", function() {
        const subtractCashActionObj = {
            type: ADD_CASH,
            data: 100
        }
        expect(addCash(100)).toEqual(subtractCashActionObj);
    })
    it("if not enough money to subtracts, amount remains same and error is set", function() {
        let initialState = {
            cash: 1000
        }
        let action = {
            type: SUBTRACT_CASH,
            data: 1100
        }
        let finalState = {
            cash: 1000,
            message: null,
            error: "Not enough money in account"
        }
        deepFreeze(initialState);
        deepFreeze(action);
        expect(cashReducer(initialState, action)).toEqual(finalState);
    });
})


//----------------------------
//Portfolio Tests
//----------------------------
import {
    ADD_STOCKS,
    SUBTRACT_STOCKS
}
from '../src/actions/portfolioAction';
import portfolioReducer from '../src/reducers/portfolioReducer';


describe("portfolio reducer and actions", function() {
    it("adds stocks of the given amount", function() {
        let initialState = {
            stocks: {
                "AAA": 100
            }
        };
        let action = {
            type: ADD_STOCKS,
            data: {
                symbol: "AAA",
                amount: 100
            }
        };
        let finalState = {
            stocks: {
                "AAA": 200
            },
            message: "Stocks added",
            error: null
        }
        expect(portfolioReducer(initialState, action)).toEqual(finalState);
    })
    it("If stock symbol does not exist, create it and add it", function() {
        let initialState = {
            stocks: {}
        };
        let action = {
            type: ADD_STOCKS,
            data: {
                symbol: "AAA",
                amount: 100
            }
        };
        let finalState = {
            stocks: {
                "AAA": 100
            },
            message: "Stocks added",
            error: null
        }
        expect(portfolioReducer(initialState, action)).toEqual(finalState);
    });
    it("subtracts stocks of given amount and symbol", function() {
        let initialState = {
            stocks: {
                "AAA": 100
            }
        };
        let action = {
            type: SUBTRACT_STOCKS,
            data: {
                symbol: "AAA",
                amount: 90
            }
        };
        let finalState = {
            stocks: {
                "AAA": 10
            },
            message: "Stocks subtracted",
            error: null
        }
        expect(portfolioReducer(initialState, action)).toEqual(finalState);
    });
    it("if not enough stock to subtract, amount remains same and error is set", function() {
        let initialState = {
            stocks: {
                "AAA": 100
            }
        };
        let action = {
            type: SUBTRACT_STOCKS,
            data: {
                symbol: "AAA",
                amount: 190
            }
        };
        let finalState = {
            stocks: {
                "AAA": 100
            },
            message: null,
            error: "Not enough stock to sell"
        }
        expect(portfolioReducer(initialState, action)).toEqual(finalState);
    })
    it("if attempt to sell stock that is not owned, return with error", function() {
        let initialState = {
            stocks: {}
        };
        let action = {
            type: SUBTRACT_STOCKS,
            data: {
                symbol: "AAA",
                amount: 100
            }
        };
        let finalState = {
            stocks: {},
            message: null,
            error: "You do not own any of those stocks"
        }
        expect(portfolioReducer(initialState, action)).toEqual(finalState);
    })
});
