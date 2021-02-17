/** @format */

import { SET, LISTA } from "./actions";

const initialState = {
    periodoActual: null,
    timeStamp: null,
    listaPeriodo: null,
    listaTimeStamp: null,
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
            newState.listaPeriodo = action.periodos;
            newState.listaTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
