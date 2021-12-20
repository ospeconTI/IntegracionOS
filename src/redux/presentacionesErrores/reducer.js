/** @format */

import { GET_RESUMEN_SUCCESS, GET_RESUMEN_ERROR, GET_FACTURAS_BY_ERROR_SUCCESS, GET_FACTURAS_BY_ERROR_ERROR, GET_FACTURAS_BY_ERROR, CLEAN_SELECTED, GET_ERRORES_BY_FACTURA_SUCCESS } from "./actions";

const initialState = {
    entities: null,
    timeStamp: null,
    errorTimeStamp: null,
    facturasByError: null,
    facturasByErrorTimeStamp: null,
    selectedError: null,
    erroresByFactura: null,
    erroresByFacturaTimeStamp: null,
};

export const reducer = (state = initialState, action, presentacionesEstadosState) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_FACTURAS_BY_ERROR:
            newState.selectedError = action.error;
            break;
        case GET_RESUMEN_SUCCESS:
            newState.entities = action.payload.receive;
            newState.facturasByError = null;
            newState.facturasByErrorTimeStamp = new Date().getTime();
            newState.timeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_BY_ERROR_ERROR:
        case GET_RESUMEN_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_BY_ERROR_SUCCESS:
            newState.facturasByError = action.payload.receive;
            newState.facturasByErrorTimeStamp = new Date().getTime();
            break;
        case CLEAN_SELECTED:
            newState.selectedError = null;
            break;
        case GET_ERRORES_BY_FACTURA_SUCCESS:
            newState.erroresByFactura = action.payload.receive;
            newState.erroresByFacturaTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
