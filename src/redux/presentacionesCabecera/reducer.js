/** @format */

import { GET_SUCCESS, VALIDAR_SUCCESS, GET_ERROR, ADD_ERROR, ADD_SUCCESS, UPDATE_ERROR, UPDATE_SUCCESS, REMOVE_SUCCESS, SET_SELECTED, TIPO_ACCION } from "./actions";

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
            break;
        case ADD_SUCCESS:
            //newState.addTimeStamp = new Date().getTime();
            //newState.selected = action.payload.receive;
            const itemAdd = action.payload.receive;
            const estado = presentacionesEstadosState.entities.find((e) => {
                return e.Id == itemAdd.IdEstadoPresentacionSSS;
            });
            itemAdd.PresentacionSSS_Estados = estado;
            newState.entities.push(itemAdd);
            newState.timeStamp = new Date().getTime();
            break;
        case UPDATE_SUCCESS:
            const itemRecibido = action.payload.receive;
            const estadoU = presentacionesEstadosState.entities.find((e) => {
                return e.Id == itemRecibido.IdEstadoPresentacionSSS;
            });
            let item = newState.entities.find((item) => {
                return item.Id == itemRecibido.Id;
            });
            for (const property in item) {
                item[property] = itemRecibido[property];
            }
            item.PresentacionSSS_Estados = estadoU;
            newState.timeStamp = new Date().getTime();
            newState.selected = itemRecibido;
            break;
        case REMOVE_SUCCESS:
            const itemBorrado = action.payload.receive;
            let itemB = newState.entities.find((item) => {
                return item.Id == itemBorrado.Id;
            });
            itemB.Activo = false;
            newState.removeTimeStamp = new Date().getTime();
            newState.selected = null;
            break;
        case SET_SELECTED:
            newState.selected = action.selected;
            newState.selectedTimeStamp = new Date().getTime();
            break;
        case TIPO_ACCION:
            newState.tipoAction = action.tipo;
            newState.tipoAccionTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
