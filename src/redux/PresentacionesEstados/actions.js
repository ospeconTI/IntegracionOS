/** @format */

export const SET = "[Presentaciones EStados] SET";
export const GET = "[Presentaciones EStados] GET";
export const GET_SUCCESS = "[Presentaciones EStados] GET_SUCCESS";
export const GET_ERROR = "[Presentaciones EStados] GET_ERROR";

export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) => ({
    type: GET,
    options: options,
});
