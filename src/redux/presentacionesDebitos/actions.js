/** @format */

export const SET = "[PresentacionesDebitos] SET";
export const GET = "[PresentacionesDebitos] GET";
export const GET_SUCCESS = "[PresentacionesDebitos] GET_SUCCESS";
export const GET_ERROR = "[PresentacionesDebitos] GET_ERROR";

export const ADD = "[PresentacionesDebitos] ADD";
export const ADD_SUCCESS = "[PresentacionesDebitos] ADD_SUCCESS";
export const ADD_ERROR = "[PresentacionesDebitos] ADD_ERROR";

export const REMOVE = "[PresentacionesDebitos] REMOVE";
export const REMOVE_SUCCESS = "[PresentacionesDebitos] REMOVE_SUCCESS";
export const REMOVE_ERROR = "[PresentacionesDebitos] REMOVE_ERROR";

export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) => ({
    type: GET,
    options: options,
});

export const add = (item) => ({
    type: ADD,
    item: item,
});

export const remove = (item) => ({
    type: REMOVE,
    item: item,
});
