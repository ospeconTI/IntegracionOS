/** @format */

import { GET_SUCCESS, GET_ERROR, GENERAR_SUCCESS, GENERAR_ERROR, UPDATE_ERROR, UPDATE_SUCCESS, GENERAR_BONOS_PERIODO_SUCCESS } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    generarEntities: null,
    generarTimeStamp: null,
    generarErrorTimeStamp: null,
    updateTimeStamp: null,
    updateErrorTimeStamp: null,
    generarBonosPeriodo: null,
    generarBonosPeriodoTimeStamp: null,
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
        case GENERAR_SUCCESS:
            newState.generarEntities = action.payload.receive;
            newState.generarTimeStamp = new Date().getTime();
            break;
        case GENERAR_ERROR:
            newState.generarErrorTimeStamp = new Date().getTime();
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = new Date().getTime();
            break;
        case UPDATE_ERROR:
            newState.updateErrorTimeStamp = new Date().getTime();
            break;
        case GENERAR_BONOS_PERIODO_SUCCESS:
            newState.generarBonosPeriodo = action.payload.receive;
            newState.generarBonosPeriodoTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
