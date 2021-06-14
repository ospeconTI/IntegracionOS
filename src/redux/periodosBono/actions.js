/** @format */

export const LISTAPERIODOSBONO = "[periodosBono] PERIODOSBONOS";
export const SET = "[periodosBono] SET";
export const LISTAPERIODOSBONO_SUCCESS = "[periodosBono] PERIODOSBONOS_SUCCESS";

export const set = (periodo) => ({
    type: SET,
    periodoActual: periodo,
});
export const listaPeriodosBono = (periodosBack) => ({
    type: LISTAPERIODOSBONO,
    periodosBack: periodosBack,
});
