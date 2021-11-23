/** @format */

export const SET = "[presentacionSSS_HistoricoDetalle] SET";
export const GET = "[presentacionSSS_HistoricoDetalle] GET";
export const GET_SUCCESS = "[presentacionSSS_HistoricoDetalle] GET_SUCCESS";
export const GET_ERROR = "[presentacionSSS_HistoricoDetalle] GET_ERROR";

export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) => ({
    type: GET,
    options: options,
});
