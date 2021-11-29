/** @format */

import { UPDATE_PROFILE } from "../autorizacion/actions";

export const GET = "[presentacionesCabecera] GET";

export const GET_SUCCESS = "[presentacionesCabecera] GET success";

export const GET_ERROR = "[presentacionesCabecera] GET error";

export const GET_RESUMEN = "[presentacionesCabecera] GET_RESUMEN";

export const GET_RESUMEN_SUCCESS = "[presentacionesCabecera] GET_RESUMEN success";

export const GET_RESUMEN_ERROR = "[presentacionesCabecera] GET_RESUMEN error";

export const GET_FACTURAS_BY_ERROR = "[presentacionesCabecera] GET_FACTURAS_BY_ERROR";

export const GET_FACTURAS_BY_ERROR_SUCCESS = "[presentacionesCabecera] GET_FACTURAS_BY_ERROR success";

export const GET_FACTURAS_BY_ERROR_ERROR = "[presentacionesCabecera] GET_FACTURAS_BY_ERROR error";

export const ADD = "[presentacionesCabecera] ADD";

export const ADD_SUCCESS = "[presentacionesCabecera] ADD_SUCCESS";

export const ADD_ERROR = "[presentacionesCabecera] ADD_ERROR";

export const UPDATE = "[presentacionesCabecera] UPDATE";

export const UPDATE_SUCCESS = "[presentacionesCabecera] UPDATE_SUCCESS";

export const UPDATE_ERROR = "[presentacionesCabecera] UPDATE_ERROR";

export const REMOVE = "[presentacionesCabecera] REMOVE";

export const REMOVE_SUCCESS = "[presentacionesCabecera] REMOVE_SUCCESS";

export const REMOVE_ERROR = "[presentacionesCabecera] REMOVE_ERROR";

export const SET_SELECTED = "[presentacionesCabecera] SET_SELECTED";
export const TIPO_ACCION = "[presentacionesCabecera] Seteo el tipo de Accion";
export const MUESTRO_FORM = "[presentacionesCabecera] Muestro Form de Edicion";

export const VALIDAR = "[presentacionesCabecera] Validar";
export const VALIDAR_SUCCESS = "[presentacionesCabecera] Validar success";
export const VALIDAR_ERROR = "[presentacionesCabecera] Validar error";
export const CLEAN_SELECTED = "[presentacionesCabecera] CLEAN_SELECTED";

export const get = (options) => ({
    type: GET,
    options: options,
});

export const getResumen = (id) => ({
    type: GET_RESUMEN,
    id: id,
});
export const getFacturasByError = (idPresentacion, idError) => ({
    type: GET_FACTURAS_BY_ERROR,
    idPresentacion: idPresentacion,
    idError: idError,
});

export const cleanSelected = () => ({
    type: CLEAN_SELECTED,
});

export const validar = (periodo) => ({
    type: VALIDAR,
    periodo: periodo,
});

export const add = (entity) => ({
    type: ADD,
    item: entity,
});

export const update = (entity) => ({
    type: UPDATE,
    entity: entity,
});

export const remove = (entity) => ({
    type: REMOVE,
    entity: entity,
});

export const setSelected = (selected) => ({
    type: SET_SELECTED,
    selected: selected,
});
export const setTipoAccion = (tipo) => ({
    type: TIPO_ACCION,
    tipo: tipo,
});
export const muestroForm = (muestroForm) => ({
    type: MUESTRO_FORM,
    muestroForm: muestroForm,
});
