/** @format */

export const SET = "[PresentacionSSS_Historico] SET";
export const GET = "[PresentacionSSS_Historico] GET";
export const GET_SUCCESS = "[PresentacionSSS_Historico] GET_SUCCESS";
export const GET_ERROR = "[PresentacionSSS_Historico] GET_ERROR";

export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) => ({
    type: GET,
    options: options,
});
