export const ADD_TRANSACTION = "ADD_TRANSACTION";


export function addTransaction(data) {
    return {
        type: ADD_TRANSACTION,
        data
    };
}