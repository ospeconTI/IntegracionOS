/** @format */

import { GET_SUCCESS, GET_ERROR, ADD_SUCCESS, UPDATE_SUCCESS, SET } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    addTimeStamp: null,
    updateTimeStamp: null,
    selected: null,
    selectedTimeStamp: null,
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
        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = new Date().getTime();
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = new Date().getTime();
            break;
        case SET:
            newState.selected = action.options;
            newState.selectedTimeStamp = new Date().getTime();
    }
    return newState;
};
