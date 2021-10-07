/** @format */

import { GET_SUCCESS, GET_ERROR, ADD_ERROR, ADD_SUCCESS, SET_SELECTED, UPDATE_ERROR, UPDATE_SUCCESS, UPDATE_ESTADO_SUCCESS, GENERAR_SUCCESS, GENERAR_ERROR } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    addTimeStamp: null,
    updateTimeStamp: null,
    updateEstadoTimeStamp: null,
    errorTimeStamp: null,
    errorMessage: null,
    selected: null,
    selectedTimeStamp: null,
    generarTimeStamp: null,
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
            /* switch (action.payload.receive.Id) {
                case -1:
                    newState.errorTimeStamp = new Date().getTime();
                    newState.errorMessage = "La Factura que esta intentando cargar ya fue ingresada con anterioridad. Verifique los datos";
                    break;
                case -2:
                    newState.errorTimeStamp = new Date().getTime();
                    newState.errorMessage = "La factura que intenta modificar fue eliminada";
                    break;
                case -3:
                    newState.errorTimeStamp = new Date().getTime();
                    newState.errorMessage = "No se registran imagenes para esta factura. Refresque su navegador";
                    break;
                default: */
            newState.updateEstadoTimeStamp = new Date().getTime();
            // }
            break;
        case SET_SELECTED:
            newState.selected = action.selected;
            newState.selectedTimeStamp = new Date().getTime();
            break;
        case GENERAR_SUCCESS:
            newState.generarTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
