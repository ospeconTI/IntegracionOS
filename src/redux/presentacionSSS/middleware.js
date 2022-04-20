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
    setSelected,
    GENERAR_SUCCESS,
    GENERAR_ERROR,
    GENERAR,
} from "./actions";

import { presentacionSSSFetch, generarFetch } from "../fetchs";
import { get as getPesentacionesCabecera } from "../../redux/presentacionesCabecera/actions";
import { apiAdd, apiRequest, apiUpdate, apiAction, apiFunction, API_ADD } from "../api/actions";

import { goTo } from "../routing/actions";
import { showSpinner, hideSpinner } from "../api/actions";

export const generar =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GENERAR) {
            const url = SERVICE_URL + "/api/PresentacionSSS/Generar";
            const authHeader = "Bearer " + getState().autorizacion.usuario.Profiles[0].Token;
            const options = {
                method: "POST",
                headers: {
                    Authorization: authHeader,
                },
            };
            let fileName = "";
            dispatch(showSpinner());
            fetch(url, options)
                .then((res) => {
                    let contentDisposition = res.headers.get("content-disposition");
                    fileName = contentDisposition.split(";")[1].split("=")[1];
                    return res.blob();
                })
                .then((blob) => {
                    let a = document.createElement("a");
                    let url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    dispatch(hideSpinner());
                    dispatch(getPesentacionesCabecera({ top: 100, filter: "Activo", orderby: "PeriodoPresentacion desc", count: true }));
                });
            //        dispatch(apiAdd(generarFetch, null, GENERAR_SUCCESS, GENERAR_ERROR));
        }
    };

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

export const middleware = [get, add, update, processGet, processError, processAdd, processUpdate, updateEstado, generar];
