/** @format */

export const SET = "[PresentacionSSS_Creditos] SET";
export const GET = "[PresentacionSSS_Creditos] GET";
export const GET_SUCCESS = "[PresentacionSSS_Creditos] GET_SUCCESS";
export const GET_ERROR = "[PresentacionSSS_Creditos] GET_ERROR";

export const ADD = "[PresentacionSSS_Creditos] ADD";
export const ADD_SUCCESS = "[PresentacionSSS_Creditos] ADD_SUCCESS";
export const ADD_ERROR = "[PresentacionSSS_Creditos] ADD_ERROR";

export const REMOVE = "[PresentacionSSS_Creditos] REMOVE";
export const REMOVE_SUCCESS = "[PresentacionSSS_Creditos] REMOVE_SUCCESS";
export const REMOVE_ERROR = "[PresentacionSSS_Creditos] REMOVE_ERROR";

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
