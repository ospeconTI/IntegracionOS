/** @format */

import { SET, GET_SUCCESS, ADD_SUCCESS, REMOVE_SUCCESS } from "./actions";

const initialState = {
    numero: null,
    timeStamp: null,
    entities: null,
    getTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SET:
            newState.numero = action.numero;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.getTimeStamp = new Date().getTime();
            break;
        case ADD_SUCCESS:
            break;
        case REMOVE_SUCCESS:
            break;
    }
    return newState;
};
