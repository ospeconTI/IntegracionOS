/** @format */

import { GET, GET_SUCCESS, GET_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, UPDATE, UPDATE_SUCCESS, UPDATE_ERROR, REMOVE_ERROR, REMOVE_SUCCESS, REMOVE } from "./actions";

import { presentacionesCabeceraFetch } from "../fetchs";

import { apiRequest, apiUpdate, apiAdd, apiDelete } from "../api/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(presentacionesCabeceraFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            const body = action.entity;
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

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type == UPDATE_ERROR || action.type == REMOVE_ERROR) {
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
        }
    };
export const middleware = [get, add, update, remove, processGet, processError, processAdd, processUpdate, processRemove];
