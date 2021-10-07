/** @format */

import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    VALIDAR,
    VALIDAR_SUCCESS,
    VALIDAR_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    REMOVE_ERROR,
    REMOVE_SUCCESS,
    REMOVE,
    get as getPresentaciones,
    GET_RESUMEN,
    GET_RESUMEN_ERROR,
    GET_RESUMEN_SUCCESS,
    GET_FACTURAS_BY_ERROR,
    GET_FACTURAS_BY_ERROR_ERROR,
    GET_FACTURAS_BY_ERROR_SUCCESS,
} from "./actions";

import { presentacionesCabeceraFetch, getResumenFetch, getFacturasByErrorFetch } from "../fetchs";

import { apiRequest, apiUpdate, apiAdd, apiDelete } from "../api/actions";
import { RESTRequest } from "../rest/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            const options = action.options;
            options.expand = "PresentacionSSS_Estados";
            dispatch(apiRequest(presentacionesCabeceraFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

export const getResumen =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RESUMEN) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            dispatch(RESTRequest(getResumenFetch, "?pIdPresentacion=" + action.id, GET_RESUMEN_SUCCESS, GET_RESUMEN_ERROR, token));
        }
    };

export const getFacturasByError =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_FACTURAS_BY_ERROR) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            dispatch(
                RESTRequest(getFacturasByErrorFetch, "?pIdPresentacion=" + action.idPresentacion + "&pIdError=" + action.idError, GET_FACTURAS_BY_ERROR_SUCCESS, GET_FACTURAS_BY_ERROR_ERROR, token)
            );
        }
    };

export const validar =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === VALIDAR) {
            const options = { filter: "PeriodoPresentacion eq " + action.periodo + " and Activo" };
            dispatch(apiRequest(presentacionesCabeceraFetch, options, VALIDAR_SUCCESS, VALIDAR_ERROR));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            const body = action.item;
            dispatch(apiAdd(presentacionesCabeceraFetch, body, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const update =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE) {
            dispatch(apiUpdate(presentacionesCabeceraFetch, action.entity, UPDATE_SUCCESS, UPDATE_ERROR));
        }
    };

export const remove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE) {
            dispatch(apiDelete(presentacionesCabeceraFetch, action.entity, REMOVE_SUCCESS, REMOVE_ERROR));
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

export const processValidar =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === VALIDAR_SUCCESS) {
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === VALIDAR_ERROR || action.type === ADD_ERROR || action.type == UPDATE_ERROR || action.type == REMOVE_ERROR) {
            alert(JSON.parse(action.payload.receive.message).innererror.message);
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
export const processUpdate =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_SUCCESS) {
        }
    };
export const processRemove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE_SUCCESS) {
            dispatch(getPresentaciones({ top: 100, filter: "Activo", orderby: "FechaPresentacion desc", count: true }));
        }
    };
export const middleware = [get, validar, add, update, remove, processValidar, processGet, processError, processAdd, processUpdate, processRemove, getResumen, getFacturasByError];
