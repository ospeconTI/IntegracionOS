/** @format */

export const GET = "[facturasPrestadoresRechazos] GET";
export const GET_SUCCESS = "[facturasPrestadoresRechazos] GET success";
export const GET_ERROR = "[facturasPrestadoresRechazos] GET error";

export const ADD = "[facturasPrestadoresRechazos] ADD";
export const ADD_SUCCESS = "[facturasPrestadoresRechazos] ADD success";
export const ADD_ERROR = "[facturasPrestadoresRechazos] ADD error";

export const UPDATE = "[facturasPrestadoresRechazos] UPDATE";
export const UPDATE_SUCCESS = "[facturasPrestadoresRechazos] UPDATE success";
export const UPDATE_ERROR = "[facturasPrestadoresRechazos] UPDATE error";
export const SET = "[facturasPrestadoresRechazos] SET";

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

export const set = (entity) => ({
    type: SET,
    options: entity,
});
