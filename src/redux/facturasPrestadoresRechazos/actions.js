/** @format */

export const GET = "[facturasPrestadoresRechazos] GET";

export const GET_SUCCESS = "[facturasPrestadoresRechazos] GET success";

export const GET_ERROR = "[facturasPrestadoresRechazos] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});
