/** @format */

import { GET_RESUMEN_SUCCESS, GET_RESUMEN_ERROR } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
};

export const reducer = (state = initialState, action, presentacionesEstadosState) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_RESUMEN_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_RESUMEN_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
