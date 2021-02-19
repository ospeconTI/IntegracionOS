/** @format */


import { SET, GET_SUCCESS } from "./actions";

const initialState = {
    value: null,
    timeStamp: null,

};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SET:
            newState.value = action.value;
            newState.timeStamp = new Date().getTime();
            break;
     
    }
    return newState;
};
