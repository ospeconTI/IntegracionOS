/** @format */

import { GET, GET_SUCCESS, GET_ERROR, ADD_SUCCESS, ADD_ERROR, UPDATE, ADD, UPDATE_SUCCESS, UPDATE_ERROR } from "./actions";

import { facturasPrestadoresRechazosFetch } from "../fetchs";

import { apiAdd, apiRequest, apiUpdate } from "../api/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(facturasPrestadoresRechazosFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(facturasPrestadoresRechazosFetch, action.entity, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS || action.type === ADD_SUCCESS) {
        }
    };

export const update =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE) {
            dispatch(apiUpdate(facturasPrestadoresRechazosFetch, action.entity, UPDATE_SUCCESS, UPDATE_ERROR));
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === ADD_ERROR) {
        }
    };

export const middleware = [get, processGet, processError, add, update];
