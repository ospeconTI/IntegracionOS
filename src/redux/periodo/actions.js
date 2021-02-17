/** @format */

export const SET = "[periodo] SET";
export const LISTA = "[periodo] LISTA";

export const set = (periodoActual) => ({
    type: SET,
    periodoActual: periodoActual,
});

export const lista = (periodos) => ({
    type: LISTA,
    periodos: periodos,
});
