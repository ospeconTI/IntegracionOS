/** @format */

import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    UPDATE_ESTADO,
    UPDATE_ESTADO_SUCCESS,
    APROBAR,
    RECHAZAR,
    APROBAR_SUCCESS,
    RECHAZAR_SUCCESS,
} from "./actions";

import { facturasPrestadoresFetch, RechazarFacturaFetch } from "../fetchs";

import { apiAdd, apiRequest, apiUpdate, apiAction, apiFunction } from "../api/actions";

export const get = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(facturasPrestadoresFetch, action.options, GET_SUCCESS, GET_ERROR));
    }
};

export const add = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === ADD) {
        dispatch(apiAdd(facturasPrestadoresFetch, action.entity, ADD_SUCCESS, ADD_ERROR));
    }
};

export const update = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, UPDATE_SUCCESS, UPDATE_ERROR));
    }
};
export const updateEstado = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_ESTADO) {
        dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, UPDATE_ESTADO_SUCCESS, UPDATE_ERROR));
    }
};

export const processGet = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_SUCCESS) {
    }
};

export const processError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type == UPDATE_ERROR) {
    }
};

export const processAdd = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === ADD_SUCCESS) {
    }
};
export const processUpdate = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_SUCCESS || action.type === UPDATE_ESTADO_SUCCESS) {
    }
};

export const aprobar = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === APROBAR) {
        dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, APROBAR_SUCCESS, UPDATE_ERROR));
    }
};

export const rechazar = ({ dispatch, getState }) => (next) => (action) => {
    next(action);
    if (action.type === RECHAZAR) {
        //dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, RECHAZAR_SUCCESS, UPDATE_ERROR));
        const token = getState().autorizacion.usuario.Profiles[0].Token;
        dispatch(apiAction(RechazarFacturaFetch, null, "pId=" + action.id + ",pEstado=" + action.estado + ",pMotivo=" + action.motivo, "", RECHAZAR_SUCCESS, UPDATE_ERROR, token));
    }
};

export const middleware = [get, add, update, processGet, processError, processAdd, processUpdate, updateEstado, aprobar, rechazar];
