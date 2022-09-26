/** @format */

export const GET = "[vAmparos] GET";

export const GET_SUCCESS = "[vAmparos] GET success";

export const GET_ERROR = "[vAmparos] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});
