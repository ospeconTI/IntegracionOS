/** @format */

import { GET_SUCCESS, GET_ERROR, ADD_ERROR, ADD_SUCCESS, SET_SELECTED, UPDATE_ERROR, UPDATE_SUCCESS, UPDATE_ESTADO_SUCCESS, RECHAZAR_SUCCESS, APROBAR_SUCCESS} from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    addTimeStamp: null,
    updateTimeStamp: null,
    updateEstadoTimeStamp: null,
    selected: null,
    selectedTimeStamp: null,
    aprobarTimeStamp: null,
    rechazarTimeStamp: null
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
        case UPDATE_ESTADO_SUCCESS:
            newState.updateEstadoTimeStamp = new Date().getTime();
            break;
        case SET_SELECTED:
            newState.selected = action.selected;
            newState.selectedTimeStamp = new Date().getTime()
            break;
        case APROBAR_SUCCESS:
                newState.aprobarTimeStamp = new Date().getTime();
                break;
        case RECHAZAR_SUCCESS:
            newState.rechazarTimeStamp = new Date().getTime();

            break;
    }
    return newState;
};
