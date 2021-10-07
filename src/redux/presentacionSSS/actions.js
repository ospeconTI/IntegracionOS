/** @format */

export const GET = "[PresentacionSSS] GET";

export const GET_SUCCESS = "[PresentacionSSS] GET success";

export const GET_ERROR = "[PresentacionSSS] GET error";

export const ADD = "[PresentacionSSS] ADD";

export const ADD_SUCCESS = "[PresentacionSSS] ADD_SUCCESS";

export const ADD_ERROR = "[PresentacionSSS] ADD_ERROR";

export const UPDATE = "[PresentacionSSS] UPDATE";

export const UPDATE_SUCCESS = "[PresentacionSSS] UPDATE_SUCCESS";

export const UPDATE_ERROR = "[PresentacionSSS] UPDATE_ERROR";

export const UPDATE_ESTADO = "[PresentacionSSS] UPDATE_ESTADO";

export const UPDATE_ESTADO_SUCCESS = "[PresentacionSSS] UPDATE_ESTADO_SUCCESS";

export const SET_SELECTED = "[PresentacionSSS] SET_SELECTED";

export const GENERAR = "[Presentacion SSS] GENERAR";
export const GENERAR_SUCCESS = "[Presentacion SSS] GENERAR SUCCESS";
export const GENERAR_ERROR = "[Presentacion SSS] GENERAR ERROR";

export const get = (options) => ({
    type: GET,
    options: options,
});

export const add = (entity) => ({
    type: ADD,
    entity: entity,
});

export const update = (entity) => ({
    type: UPDATE,
    entity: entity,
});

export const updateEstado = (entity) => ({
    type: UPDATE_ESTADO,
    entity: entity,
});

export const setSelected = (selected) => ({
    type: SET_SELECTED,
    selected: selected,
});
export const generar = () => ({
    type: GENERAR,
});
