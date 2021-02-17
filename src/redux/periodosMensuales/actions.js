/** @format */


export const LISTAMENSUALES = "[periodosMensuales] LISTAMENSUALES";
export const SET = "[periodosMensuales] SET";

export const set = (periodoMensualActual) => ({
    type: SET,
    periodoMensualActual: periodoMensualActual,
});
export const listaMensuales = (periodos) => ({
    type: LISTAMENSUALES,
    periodos: periodos,
});
