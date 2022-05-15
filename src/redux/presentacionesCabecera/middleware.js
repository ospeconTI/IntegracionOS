/** @format */

import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    VALIDAR_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    REMOVE_ERROR,
    REMOVE_SUCCESS,
    REMOVE,
    get as getPresentaciones,
    GET_RESUMEN,
    GET_RESUMEN_ERROR,
    GET_RESUMEN_SUCCESS,
    GET_FACTURAS_BY_ERROR,
    GET_FACTURAS_BY_ERROR_ERROR,
    GET_FACTURAS_BY_ERROR_SUCCESS,
    CERRAR_ABRIR,
    CERRAR_ABRIR_SUCCESS,
    CERRAR_ABRIR_ERROR,
    APLICAR_NOVEDADES,
    APLICAR_NOVEDADES_SUCCESS,
    APLICAR_NOVEDADES_ERROR,
} from "./actions";
import { presentacionesCabeceraFetch, getResumenFetch, getFacturasByErrorFetch, CierrayAbrePresentacionFetch, AplicarNovedadesFetch } from "../fetchs";
import { apiRequest, apiUpdate, apiAdd, apiDelete, apiAction, apiFunction } from "../api/actions";
import { RESTRequest } from "../rest/actions";
import { showError, showConfirm } from "../../redux/ui/actions";
import { cerrarAbrir } from "../../redux/presentacionesCabecera/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            const options = action.options;
            options.expand = "PresentacionSSS_Estados";
            dispatch(apiRequest(presentacionesCabeceraFetch, action.options, GET_SUCCESS, GET_ERROR));
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

export const getResumen =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RESUMEN) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            dispatch(RESTRequest(getResumenFetch, "?pIdPresentacion=" + action.id, GET_RESUMEN_SUCCESS, GET_RESUMEN_ERROR, token));
        }
    };

export const getFacturasByError =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_FACTURAS_BY_ERROR) {
            let token = getState().autorizacion.usuario.Profiles[0].Token;
            dispatch(
                RESTRequest(getFacturasByErrorFetch, "?pIdPresentacion=" + action.idPresentacion + "&pIdError=" + action.idError, GET_FACTURAS_BY_ERROR_SUCCESS, GET_FACTURAS_BY_ERROR_ERROR, token)
            );
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            const body = action.item;
            dispatch(apiAdd(presentacionesCabeceraFetch, body, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const processAdd =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_SUCCESS) {
            dispatch(getPresentaciones({ top: 100, filter: "Activo", orderby: "PeriodoPresentacion desc", count: true }));
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

export const processUpdate =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_SUCCESS) {
            dispatch(getPresentaciones({ top: 100, filter: "Activo", orderby: "PeriodoPresentacion desc", count: true }));
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

export const processRemove =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === REMOVE_SUCCESS) {
            dispatch(getPresentaciones({ top: 100, filter: "Activo", orderby: "PeriodoPresentacion desc", count: true }));
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === VALIDAR_ERROR || action.type == REMOVE_ERROR || action.type == APLICAR_NOVEDADES_ERROR) {
            alert(action.payload.receive.message);
        }
    };

export const processErrorGrabacion =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_ERROR || action.type == UPDATE_ERROR) {
            const errorMsg = action.payload.receive.message;
            const codigoError = errorMsg.substring(0, 3);

            if (isNaN(codigoError)) {
                dispatch(showError([{ campo: "Presentación", mensaje: errorMsg.message }]));
            } else {
                const mensajeError = errorMsg.substring(4);
                if (codigoError != "200") {
                    dispatch(showError([{ campo: "Presentación", mensaje: mensajeError }]));
                } else {
                    const item = action.payload.send;
                    dispatch(showConfirm("Presentaciones", mensajeError + "\n ¿Desea cerrarla y crear la nueva?", cerrarAbrir(item), null));
                }
            }
        }
    };

export const procsessCerrarAbrir =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === CERRAR_ABRIR) {
            const body = { Entidad: action.item };
            dispatch(apiAction(CierrayAbrePresentacionFetch, body, null, "", CERRAR_ABRIR_SUCCESS, CERRAR_ABRIR_ERROR));
        }
    };

export const processCerrarAbrirSuccess =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === CERRAR_ABRIR_SUCCESS) {
            dispatch(getPresentaciones({ top: 100, filter: "Activo", orderby: "PeriodoPresentacion desc", count: true }));
        }
    };

export const processAplicarNovedades =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === APLICAR_NOVEDADES) {
            //const param = { customParameters: "(" + action.periodoPresentacion + ")" };
            //dispatch(apiFunction(AplicarNovedadesFetch, null, APLICAR_NOVEDADES_SUCCESS, APLICAR_NOVEDADES_ERROR));
            dispatch(apiAction(AplicarNovedadesFetch, null, "pPeriodo=" + action.periodoPresentacion, "", APLICAR_NOVEDADES_SUCCESS, APLICAR_NOVEDADES_ERROR));
        }
    };

export const processAplicarNovedadesSuccess =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === APLICAR_NOVEDADES_SUCCESS) {
            dispatch(getPresentaciones({ top: 100, filter: "Activo", orderby: "PeriodoPresentacion desc", count: true }));
        }
    };

export const middleware = [
    get,
    add,
    update,
    remove,
    processGet,
    processError,
    processAdd,
    processErrorGrabacion,
    processUpdate,
    processRemove,
    getResumen,
    getFacturasByError,
    procsessCerrarAbrir,
    processCerrarAbrirSuccess,
    processAplicarNovedades,
    processAplicarNovedadesSuccess,
];
