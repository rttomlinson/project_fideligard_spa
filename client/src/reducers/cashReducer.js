import { ADD_CASH, SUBTRACT_CASH } from '../actions/cashAction.js';

const INITIAL_STATE = {
    cash: 100000,
    error: null,
    message: null
};

export default function cash(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_CASH:
            return {
                ...state,
                message: "Cash added",
                error: null,
                cash: state.cash + action.data
            };
        case SUBTRACT_CASH:
            if (state.cash - action.data < 0) {
                return {
                    ...state,
                    message: null,
                    error: "Not enough money in account"
                };
            }
            return {
                ...state,
                message: "Cash subtracted",
                error: null,
                cash: state.cash - action.data
            };
        default:
            return state;
    }
}