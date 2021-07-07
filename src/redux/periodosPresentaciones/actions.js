/** @format */

export const SET = "[periodo presentaciones] SET";
export const LISTA = "[periodo presentaciones] LISTA";
export const GET_PERIODOS_PRESENTACION = "[periodos presentacion] lista de periodos posibles por presentaion";

export const set = (periodoActual) => ({
    type: SET,
    periodoActual: periodoActual,
});

export const lista = (periodos) => ({
    type: LISTA,
    periodos: periodos,
});

export const getPeriodosPresentacion = (periodo) => ({
    type: GET_PERIODOS_PRESENTACION,
    periodo: periodo,
});
