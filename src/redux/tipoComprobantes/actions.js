/** @format */

export const GET = "[tipoComprobantes] GET";

export const GET_SUCCESS = "[tipoComprobantes] GET success";

export const GET_ERROR = "[tipoComprobantes] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});
