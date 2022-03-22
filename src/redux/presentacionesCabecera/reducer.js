/** @format */

import {
    GET_SUCCESS,
    VALIDAR_SUCCESS,
    GET_ERROR,
    ADD_ERROR,
    ADD_SUCCESS,
    UPDATE_ERROR,
    UPDATE_SUCCESS,
    REMOVE_SUCCESS,
    SET_SELECTED,
    TIPO_ACCION,
    GET_RESUMEN_SUCCESS,
    GET_RESUMEN_ERROR,
    GET_FACTURAS_BY_ERROR_SUCCESS,
    GET_FACTURAS_BY_ERROR_ERROR,
    GET_FACTURAS_BY_ERROR,
    CLEAN_SELECTED,
    MUESTRO_FORM,
    CERRAR_ABRIR_SUCCESS,
} from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    esValido: null,
    esValidoTimeStamp: null,
    mensaje: "",
    errorTimeStamp: null,
    addTimeStamp: null,
    updateTimeStamp: null,
    removeTimeStamp: null,
    selected: null,
    selectedTimeStamp: null,
    tipoAction: "",
    tipoAccionTimeStamp: null,
    presentacionResumen: null,
    presentacionResumenTimeStamp: null,
    presentacionResumenErrorTimeStamp: null,
    facturasByError: null,
    facturasByErrorTimeStamp: null,
    selectedError: null,
    muestroForm: false,
    muestroTimeStamp: null,
};

export const reducer = (state = initialState, action, presentacionesEstadosState) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case VALIDAR_SUCCESS:
            newState.esValido = action.payload.receive.length == 0 ? true : false;
            newState.mensaje = newState.esValido ? "" : "El periodo ya existe";
            newState.esValidoTimeStamp = new Date().getTime();
            break;
        case GET_ERROR:
            break;
        case ADD_ERROR:
            break;
        case UPDATE_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            addTimeStamp;
            break;
        case ADD_SUCCESS:
        case UPDATE_SUCCESS:
        case CERRAR_ABRIR_SUCCESS:
        case REMOVE_SUCCESS:
            newState.updateTimeStamp = new Date().getTime();
            newState.selected = {};
            break;
        case SET_SELECTED:
            newState.selected = action.selected;
            newState.selectedTimeStamp = new Date().getTime();
            break;
        case TIPO_ACCION:
            newState.tipoAction = action.tipo;
            newState.tipoAccionTimeStamp = new Date().getTime();
            break;
        case GET_RESUMEN_SUCCESS:
            newState.presentacionResumen = action.payload.receive;
            newState.presentacionResumenTimeStamp = new Date().getTime();
        case GET_RESUMEN_ERROR:
            newState.presentacionResumenErrorTimeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_BY_ERROR_SUCCESS:
            newState.facturasByError = action.payload.receive;
            newState.facturasByErrorTimeStamp = new Date().getTime();
        case GET_FACTURAS_BY_ERROR:
            newState.selectedError = action.error;
            break;
        case CLEAN_SELECTED:
            newState.selectedError = null;
            break;
        case MUESTRO_FORM:
            newState.muestroForm = action.muestroForm;
            newState.muestroTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
