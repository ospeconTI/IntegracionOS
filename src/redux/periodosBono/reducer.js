/** @format */

import { LISTAMENSUALES, LISTAPERIODOSBONO_SUCCESS, SET } from "./actions";

const initialState = {
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
            newState.periodoMensualActual = action.periodoMensualActual;
            newState.timeStamp = new Date().getTime();
            break;
        case LISTAPERIODOSBONO_SUCCESS:
            newState.entities = action.payload.receive;
            newState.listaTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
