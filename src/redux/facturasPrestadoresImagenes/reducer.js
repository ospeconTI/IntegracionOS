/** @format */

import { GET_SUCCESS, GET_ERROR, ADD_ERROR, ADD_SUCCESS, SET_SELECTED, UPDATE_ERROR, UPDATE_SUCCESS, REMOVE_SUCCESS } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    addTimeStamp: null,
    updateTimeStamp: null,
    removeTimeStamp: null,
    selected: null,
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
        case ADD_ERROR:
        case UPDATE_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = new Date().getTime();
            newState.selected = action.payload.receive;
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = new Date().getTime();
            newState.selected = action.payload.receive;
            break;
        case REMOVE_SUCCESS:
            newState.removeTimeStamp = new Date().getTime();
            newState.selected = null;
        case SET_SELECTED:
            newState.selected = action.selected;
            break;
    }
    return newState;
};
