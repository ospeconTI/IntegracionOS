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
    CAMBIO,
    GET_COMPLEMENTARIA,
    GET_COMPLEMENTARIA_SUCCESS,
    GET_COMPLEMENTARIA_ERROR,
    setSelected,
    PASAR_A_PENDIENTE_OS,
    PASAR_A_PENDIENTE_OS_SUCCESS,
    PASAR_A_PENDIENTE_OS_ERROR,
    GET_BY_ERROR,
    GET_BY_ERROR_SUCCESS,
    GET_BY_ERROR_ERROR,
} from "./actions";

import { facturasPrestadoresFetch, RechazarFacturaFetch, AprobarFacturaFetch, PasarAPendienteOSFacturaFetch } from "../fetchs";

import { apiAdd, apiRequest, apiUpdate, apiAction, apiFunction, API_ADD } from "../api/actions";
import { changed } from "../notifications/actions";

import { goTo } from "../routing/actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            dispatch(apiRequest(facturasPrestadoresFetch, action.options, GET_SUCCESS, GET_ERROR));
        }
    };

export const getByError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_ERROR) {
            dispatch(apiRequest(facturasPrestadoresFetch, action.options, GET_BY_ERROR_SUCCESS, GET_BY_ERROR_ERROR));
        }
    };

export const getComplementaria =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_COMPLEMENTARIA) {
            dispatch(apiRequest(facturasPrestadoresFetch, action.options, GET_COMPLEMENTARIA_SUCCESS, GET_COMPLEMENTARIA_ERROR));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(facturasPrestadoresFetch, action.entity, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const update =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE) {
            dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, UPDATE_SUCCESS, UPDATE_ERROR));
        }
    };
export const updateEstado =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_ESTADO) {
            dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, UPDATE_ESTADO_SUCCESS, UPDATE_ERROR));
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

export const processGetComplementaria =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_COMPLEMENTARIA_SUCCESS) {
            dispatch(setSelected(action.payload.receive[0]));
            dispatch(goTo("detalleFacturaC"));
        }
    };

export const processError =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type == UPDATE_ERROR) {
            const errorMsg = JSON.parse(action.payload.receive.message);
            if (errorMsg.innererror) {
                alert(errorMsg.innererror.message);
            }
            if (errorMsg.message) {
                const erroresMsg = JSON.parse(errorMsg.message);
                const textoErrores = erroresMsg.map((e) => e.Descripcion + "\n");
                if (confirm(textoErrores + "\n ¿Lo APRUEBA de todas maneras?")) {
                    const aprobacion = getState().facturasPrestadores.preAprobacion;
                    aprobacion.entity.forzado = true;
                    dispatch(aprobacion);
                }
            }
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
        if (action.type === UPDATE_SUCCESS || action.type === UPDATE_ESTADO_SUCCESS || action.type === PASAR_A_PENDIENTE_OS_SUCCESS) {
        }
    };

export const cambiar =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === CAMBIO) {
            dispatch(apiUpdate(facturasPrestadoresFetch, action.entity, APROBAR_SUCCESS, UPDATE_ERROR));
        }
    };

export const aprobar =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === APROBAR) {
            dispatch(apiAction(AprobarFacturaFetch, action.entity, null, "", APROBAR_SUCCESS, UPDATE_ERROR));
        }
    };

export const rechazar =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RECHAZAR) {
            dispatch(apiAction(RechazarFacturaFetch, null, "pId=" + action.id + ",pEstado=" + action.estado + ",pMotivo=" + action.motivo, "", RECHAZAR_SUCCESS, UPDATE_ERROR));
        }
    };

export const pasarAPendienteOS =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === PASAR_A_PENDIENTE_OS) {
            dispatch(apiAction(PasarAPendienteOSFacturaFetch, null, "pId=" + action.id, "", PASAR_A_PENDIENTE_OS_SUCCESS, PASAR_A_PENDIENTE_OS_ERROR));
        }
    };

export const rechazarSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RECHAZAR_SUCCESS) {
            dispatch(changed(getState().facturasPrestadores.selected.Id));
        }
    };
export const aprobarSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === APROBAR_SUCCESS) {
            if (action.payload.receive != -1) {
                dispatch(changed(getState().facturasPrestadores.selected.Id));
            } else {
                alert("Factura ya Existente");
            }
        }
    };

export const middleware = [
    get,
    getByError,
    add,
    update,
    processGet,
    processError,
    processAdd,
    processUpdate,
    updateEstado,
    cambiar,
    aprobar,
    rechazar,
    rechazarSuccess,
    aprobarSuccess,
    getComplementaria,
    processGetComplementaria,
    pasarAPendienteOS,
];
