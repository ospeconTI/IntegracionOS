/** @format */

export const SET = "[prestador] SET";
export const GET ="[prestador] GET"
export const GET_SUCCESS ="[prestador] GET_SUCCESS"
export const GET_ERROR ="[prestador] GET_ERROR"


export const set = (numero) => ({
    type: SET,
    numero: numero,
});

export const get = (options) =>({
    type: GET,
    options: options
})
