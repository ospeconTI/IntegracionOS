import { GET, GET_SUCCESS, GET_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, REMOVE, REMOVE_SUCCESS, REMOVE_ERROR, get as getPresentacionesDebitos } from "./actions";

import { presentacionesDebitosFetch, presentacionSSS_Debitos } from "../fetchs";

import { apiRequest, apiAdd, apiDelete } from "../api/actions";
import { RESTRequest } from "../rest/actions";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            let opt = action.options;
            opt.expand =
                "PresentacionSSS_Historico($expand=FacturasPrestadores($expand=prestado,SSS_TipoComprobantes,PresentacionSSS_Creditos($filter=Activo eq true),Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))))";
            opt.filter = opt.filter == null || opt.filter == "" ? opt.filter + " Activo eq true " : opt.filter + " and Activo eq true";

            dispatch(apiRequest(presentacionSSS_Debitos, opt, GET_SUCCESS, GET_ERROR));
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS) {
        }
    };

export const adicion =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            const body = action.item;
            dispatch(apiAdd(presentacionSSS_Debitos, body, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const processAdd =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_SUCCESS) {
            var params = {
                filter: "IdPresentacionSSS eq " + action.payload.receive.IdPresentacionSSS,
            };
            dispatch(getPresentacionesDebitos(params));
        }
    };

export const remove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE) {
            dispatch(apiDelete(presentacionSSS_Debitos, action.item, REMOVE_SUCCESS, REMOVE_ERROR));
        }
    };

export const processRemove =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE_SUCCESS) {
            var params = {
                filter: "IdPresentacionSSS eq " + action.payload.receive.IdPresentacionSSS,
            };
            dispatch(getPresentacionesDebitos(params));
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === REMOVE_ERROR) {
        }
    };

export const middleware = [get, processGet, processError, adicion, processAdd, remove, processRemove];
