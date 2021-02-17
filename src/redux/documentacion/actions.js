/** @format */

export const GET = "[documentacion] GET";

export const GET_SUCCESS = "[documentacion] GET success";

export const GET_ERROR = "[documentacion] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});
