/** @format */

import { UPDATE_PROFILE } from "../autorizacion/actions";

export const GET = "[facturasPresatadoresImagenes] GET";

export const GET_SUCCESS = "[facturasPresatadoresImagenes] GET success";

export const GET_ERROR = "[facturasPresatadoresImagenes] GET error";

export const ADD = "[facturasPresatadoresImagenes] ADD";

export const ADD_SUCCESS = "[facturasPresatadoresImagenes] ADD_SUCCESS";

export const ADD_ERROR = "[facturasPresatadoresImagenes] ADD_ERROR";

export const UPDATE = "[facturasPresatadoresImagenes] UPDATE";

export const UPDATE_SUCCESS = "[facturasPresatadoresImagenes] UPDATE_SUCCESS";

export const UPDATE_ERROR = "[facturasPresatadoresImagenes] UPDATE_ERROR";

export const REMOVE = "[facturasPresatadoresImagenes] REMOVE";

export const REMOVE_SUCCESS = "[facturasPresatadoresImagenes] REMOVE_SUCCESS";

export const REMOVE_ERROR = "[facturasPresatadoresImagenes] REMOVE_ERROR";

export const SET_SELECTED = "[facturasPresatadoresImagenes] SET_SELECTED";

export const get = (options) => ({
    type: GET,
    options: options,
});

export const add = (idPrestador, idFacturasPrestadores, idDocumentacion, nombre, imagen) => ({
    type: ADD,
    idPrestador: idPrestador,
    idFacturasPrestadores: idFacturasPrestadores,
    idDocumentacion: idDocumentacion,
    nombre: nombre,
    imagen: imagen,
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
