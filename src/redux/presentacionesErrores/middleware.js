/** @format */

import {
    GET_RESUMEN,
    GET_RESUMEN_SUCCESS,
    GET_RESUMEN_ERROR,
    GET_FACTURAS_BY_ERROR,
    GET_FACTURAS_BY_ERROR_SUCCESS,
    GET_FACTURAS_BY_ERROR_ERROR,
    getFacturasByError as getFacturasError,
    GET_ERRORES_BY_FACTURA,
    GET_ERRORES_BY_FACTURA_SUCCESS,
    GET_ERRORES_BY_FACTURA_ERROR,
} from "./actions";

import { resumenFetch, facturasByErrorFetch, getErroresByFacturaFetch } from "../fetchs";

import { RESTAdd, RESTRequest } from "../rest/actions";
import { apiRequest } from "../api/actions";

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

export const getErroresByFactura =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERRORES_BY_FACTURA) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            dispatch(RESTAdd(getErroresByFacturaFetch, action.factura, GET_ERRORES_BY_FACTURA_SUCCESS, GET_ERRORES_BY_FACTURA_ERROR, "", ""));
            //dispatch(RESTRequest(getErroresByFacturaFetch, action.factura , GET_ERRORES_BY_FACTURA_SUCCESS, GET_ERRORES_BY_FACTURA_ERROR, token));
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

export const processGetErroresByFactura =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERRORES_BY_FACTURA_SUCCESS) {
        }
    };

export const middleware = [getResumen, getFacturasByError, processGetResumen, processError, processGetFacturaByError, getErroresByFactura, processGetErroresByFactura];
