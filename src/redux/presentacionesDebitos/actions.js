/** @format */

export const SET = "[PresentacionesDebitos] SET";
export const GET = "[PresentacionesDebitos] GET";
export const GET_SUCCESS = "[PresentacionesDebitos] GET_SUCCESS";
export const GET_ERROR = "[PresentacionesDebitos] GET_ERROR";

export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) => ({
    type: GET,
    options: options,
});
