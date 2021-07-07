/** @format */

import { GET, GET_SUCCESS, GET_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, UPDATE, UPDATE_SUCCESS, UPDATE_ERROR, UPDATE_ESTADO, UPDATE_ESTADO_SUCCESS, setSelected } from "./actions";

import { presentacionSSSFetch } from "../fetchs";

import { apiAdd, apiRequest, apiUpdate, apiAction, apiFunction, API_ADD } from "../api/actions";

import { goTo } from "../routing/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(presentacionSSSFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(presentacionSSSFetch, action.entity, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const update =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE) {
            dispatch(apiUpdate(presentacionSSSFetch, action.entity, UPDATE_SUCCESS, UPDATE_ERROR));
        }
    };
export const updateEstado =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_ESTADO) {
            dispatch(apiUpdate(presentacionSSSFetch, action.entity, UPDATE_ESTADO_SUCCESS, UPDATE_ERROR));
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
        if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type == UPDATE_ERROR) {
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
        if (action.type === UPDATE_SUCCESS || action.type === UPDATE_ESTADO_SUCCESS) {
        }
    };

export const middleware = [get, add, update, processGet, processError, processAdd, processUpdate, updateEstado];
