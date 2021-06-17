/** @format */

import { GET, GET_SUCCESS, GET_ERROR, TRAE_PARA_BONOS, TRAE_PARA_BONOS_ERROR, TRAE_PARA_BONOS_SUCCESS } from "./actions";

import { cabeceraFetch } from "../fetchs";

import { apiRequest } from "../api/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(cabeceraFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
        if (action.type === TRAE_PARA_BONOS) {
            dispatch(apiRequest(cabeceraFetch, action.options, TRAE_PARA_BONOS_SUCCESS, TRAE_PARA_BONOS_ERROR));
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS || action.type === TRAE_PARA_BONOS_SUCCESS) {
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === TRAE_PARA_BONOS_ERROR) {
        }
    };

export const middleware = [get, processGet, processError];
