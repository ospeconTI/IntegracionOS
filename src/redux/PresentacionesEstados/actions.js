/** @format */

export const SET = "[Presentaciones Estados] SET";
export const GET = "[Presentaciones Estados] GET";
export const GET_SUCCESS = "[Presentaciones Estados] GET_SUCCESS";
export const GET_ERROR = "[Presentaciones Estados] GET_ERROR";

export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) => ({
    type: GET,
    options: options,
});
