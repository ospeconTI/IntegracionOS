/** @format */

export const GET = "[facturasPrestadoresEstados] GET";

export const GET_SUCCESS = "[facturasPrestadoresEstados] GET success";

export const GET_ERROR = "[facturasPrestadoresEstados] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});
