/** @format */

export const GET = "[medidas] GET";
export const GET_SUCCESS = "[medidas] GET_SUCCESS";
export const GET_ERROR = "[medidas] GET_ERROR";

export const get = (options) => ({
    type: GET,
    options: options,
});
