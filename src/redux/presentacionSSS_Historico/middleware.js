import { GET, GET_SUCCESS, GET_ERROR } from "./actions";

import { PresentacionSSS_HistoricoFetch } from "../fetchs";

import { apiRequest } from "../api/actions";
import { RESTRequest } from "../rest/actions";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            dispatch(apiRequest(PresentacionSSS_HistoricoFetch, action.options, GET_SUCCESS, GET_ERROR));
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

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR) {
        }
    };

export const middleware = [get, processGet, processError];
