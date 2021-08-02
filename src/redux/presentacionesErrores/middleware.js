/** @format */

import {
    GET_RESUMEN,
    GET_RESUMEN_SUCCESS,
    GET_RESUMEN_ERROR,
    GET_FACTURAS_BY_ERROR,
    GET_FACTURAS_BY_ERROR_SUCCESS,
    GET_FACTURAS_BY_ERROR_ERROR,
    getFacturasByError as getFacturasError,
} from "./actions";

import { resumenFetch, facturasByErrorFetch } from "../fetchs";

import { RESTAdd, RESTRequest } from "../rest/actions";

export const getResumen =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RESUMEN) {
            dispatch(RESTAdd(resumenFetch, null, GET_RESUMEN_SUCCESS, GET_RESUMEN_ERROR, "", ""));
        }
    };

export const getFacturasByError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_FACTURAS_BY_ERROR) {
            dispatch(RESTAdd(facturasByErrorFetch, action.error.Id, GET_FACTURAS_BY_ERROR_SUCCESS, GET_FACTURAS_BY_ERROR_ERROR, "", ""));
        }
    };

export const processGetResumen =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RESUMEN_SUCCESS) {
            if (getState().presentacionesErrores.selectedError) {
                dispatch(getFacturasError(getState().presentacionesErrores.selectedError));
            }
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RESUMEN_ERROR) {
        }
    };

export const processGetFacturaByError =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_FACTURAS_BY_ERROR_SUCCESS) {
        }
    };

export const middleware = [getResumen, getFacturasByError, processGetResumen, processError, processGetFacturaByError];
