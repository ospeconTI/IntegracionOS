/** @format */

import { SET, LISTA, GET_PERIODOS_PRESENTACION } from "./actions";

const initialState = {
    periodoActual: null,
    timeStamp: null,
    listaPeriodos: null,
    listaTimeStamp: null,
    periodosPresentacion: null,
    timeStampPeriodosPresentacion: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SET:
            newState.periodoActual = action.periodoActual;
            newState.timeStamp = new Date().getTime();
            break;
        case LISTA:
            newState.listaPeriodos = action.periodos;
            newState.listaTimeStamp = new Date().getTime();
            break;
        case GET_PERIODOS_PRESENTACION:
            const periodo = action.periodo.toString();
            let fechaDesde = new Date(periodo.substring(0, 4), periodo.substring(4, 6) - 1, 1, 0, 0, 0);
            fechaDesde.setMonth(fechaDesde.getMonth() - 2);
            let meses = [];
            for (let i = 1; i <= 3; i++) {
                meses[i - 1] = fechaDesde.getFullYear() * 100 + (fechaDesde.getMonth() + 1);
                fechaDesde.setMonth(fechaDesde.getMonth() + 1);
            }
            newState.periodosPresentacion = meses;
            newState.timeStampPeriodosPresentacion = new Date().getTime();
            break;
    }
    return newState;
};
