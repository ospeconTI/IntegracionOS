/** @format */

import {  LISTAMENSUALES, SET } from "./actions";

const initialState = {
    periodoMensualActual: null,
    timeStamp: null,
    entities: null,
    listaTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SET:
            newState.periodoMensualActual=action.periodoMensualActual
            newState.timeStamp = new Date().getTime();
            break;
        case LISTAMENSUALES:
            newState.entities = action.periodos;
            newState.listaTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
