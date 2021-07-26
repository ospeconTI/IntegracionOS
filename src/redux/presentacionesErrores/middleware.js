/** @format */

import { GET_RESUMEN, GET_RESUMEN_SUCCESS, GET_RESUMEN_ERROR } from "./actions";

import { resumenFetch } from "../fetchs";

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

export const processGetResumen =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RESUMEN_SUCCESS) {
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

export const middleware = [getResumen, processGetResumen, processError];
