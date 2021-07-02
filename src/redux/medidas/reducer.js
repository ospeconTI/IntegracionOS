/** @format */

import { GET_SUCCESS } from "./actions";

const initialState = {
    timeStamp: null,
    entities: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
    }
    return newState;
};
