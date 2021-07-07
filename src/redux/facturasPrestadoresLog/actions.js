/** @format */

export const GET = "[FacturasPrestadoresLog] GET";

export const GET_SUCCESS = "[FacturasPrestadoresLog] GET success";

export const GET_ERROR = "[FacturasPrestadoresLog] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});
