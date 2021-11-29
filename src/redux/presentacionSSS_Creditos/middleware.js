import { GET, GET_SUCCESS, GET_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, REMOVE, REMOVE_SUCCESS, REMOVE_ERROR } from "./actions";

import { presentacionSSS_Creditos } from "../fetchs";

import { apiRequest, apiAdd, apiDelete } from "../api/actions";
import { RESTRequest } from "../rest/actions";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            //var idPres = action.options.IdPresentacion;
            //dispatch(RESTRequest(presentacionesDebitosFetch, "?IdPresentacion=" + action.options.IdPresentacion, GET_SUCCESS, GET_ERROR, token));
            dispatch(apiRequest(presentacionSSS_Creditos, action.options, GET_SUCCESS, GET_ERROR));
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
            dispatch(apiAdd(presentacionSSS_Creditos, body, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const processAdd =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_SUCCESS) {
        }
    };

export const remove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE) {
            const body = action.item;

            dispatch(apiDelete(presentacionSSS_Creditos, body, REMOVE_SUCCESS, REMOVE_ERROR));
        }
    };

export const processRemove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE_SUCCESS) {
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
