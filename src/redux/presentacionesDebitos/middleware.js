import { GET, GET_SUCCESS, GET_ERROR } from "./actions";

import { presentacionesDebitosFetch } from "../fetchs";

import { apiRequest } from "../api/actions";
import { RESTRequest } from "../rest/actions";

export const get =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            //var idPres = action.options.IdPresentacion;
            dispatch(RESTRequest(presentacionesDebitosFetch, "?IdPresentacion=" + action.options.IdPresentacion, GET_SUCCESS, GET_ERROR, token));
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
