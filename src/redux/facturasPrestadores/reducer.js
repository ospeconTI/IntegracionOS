/** @format */

import {
    GET_SUCCESS,
    GET_ERROR,
    ADD_ERROR,
    ADD_SUCCESS,
    SET_SELECTED,
    UPDATE_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ESTADO_SUCCESS,
    RECHAZAR_SUCCESS,
    APROBAR_SUCCESS,
    GET_COMPLEMENTARIA_SUCCESS,
    PASAR_A_PENDIENTE_OS_SUCCESS,
    PASAR_A_PENDIENTE_OS_ERROR,
    APROBAR,
    GET_BY_ERROR,
    GET_BY_ERROR_SUCCESS,
    CONTROLAR_SUCCESS,
    CONTROLAR,
    GET_FACTURAS_RECHAZADAS_SSS_SUCCESS,
    REPRESENTAR_SUCCESS,
} from "./actions";

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
    aprobarTimeStamp: null,
    rechazarTimeStamp: null,
    complementaria: null,
    complementariaTimeStamp: null,
    pasarAPendienteOSTimeStamp: null,
    pasarAPendienteOSError: null,
    pasarAPendienteOSErrorTimeStamp: null,
    preAprobacion: null,
    selectedError: null,
    entitiesWithError: null,
    entitiesWithErrorTimeStamp: null,
    controlarTimeStamp: null,
    getFacturasRechazadasSSS: null,
    facturasRechazadasSSSTimeStamp: null,
    facturasaRepresentarTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_BY_ERROR:
            newState.selectedError = action.error;
            break;
        case GET_BY_ERROR_SUCCESS:
            newState.entitiesWithError = action.payload.receive;
            newState.entitiesWithErrorTimeStamp = new Date().getTime();
            break;
        case CONTROLAR:
        case APROBAR:
            newState.preAprobacion = action;
            break;
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
            switch (action.payload.receive.Id) {
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
                default:
                    newState.updateEstadoTimeStamp = new Date().getTime();
            }
            break;
        case SET_SELECTED:
            newState.selected = action.selected;
            newState.selectedTimeStamp = new Date().getTime();
            break;
        case APROBAR_SUCCESS:
            switch (action.payload.receive.Id) {
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
                default:
                    newState.aprobarTimeStamp = new Date().getTime();
                    newState.selected = action.payload.receive;
            }
            break;
        case RECHAZAR_SUCCESS:
            newState.rechazarTimeStamp = new Date().getTime();

            break;
        case GET_COMPLEMENTARIA_SUCCESS:
            newState.complementaria = action.payload.receive[0];
            newState.complementariaTimeStamp = new Date().getTime();
            break;
        case GET_COMPLEMENTARIA_SUCCESS:
            newState.complementaria = action.payload.receive[0];
            newState.complementariaTimeStamp = new Date().getTime();
            break;
        case PASAR_A_PENDIENTE_OS_SUCCESS:
            newState.pasarAPendienteOSTimeStamp = new Date().getTime();
            break;
        case PASAR_A_PENDIENTE_OS_ERROR:
            newState.pasarAPendienteOSError = action.payload.receive.message;
            newState.pasarAPendienteOSErrorTimeStamp = new Date().getTime();
            break;
        case CONTROLAR_SUCCESS:
            newState.controlarTimeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_RECHAZADAS_SSS_SUCCESS:
            newState.getFacturasRechazadasSSS = action.payload.receive;
            newState.facturasRechazadasSSSTimeStamp = new Date().getTime();
            break;
        case REPRESENTAR_SUCCESS:
            newState.facturasaRepresentarTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
