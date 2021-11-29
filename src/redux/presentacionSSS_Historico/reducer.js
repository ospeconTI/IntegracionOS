/** @format */

import { SET, GET_SUCCESS } from "./actions";

const initialState = {
    numero: null,
    timeStamp: null,
    entities: null,
    getTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SET:
            newState.numero = action.numero;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_SUCCESS:
            //Dejo solo las facturas que ya no son NC o ND
            var items = action.payload.receive.filter((item) => {
                let retorno = false;
                if (item.PresentacionSSS_Debitos.length == 0) {
                    retorno = true;
                } else {
                    var activos = item.PresentacionSSS_Debitos.filter((i) => {
                        return i.Activo == true;
                    });
                    retorno = activos.length == 0;
                }
                return retorno;
            });
            newState.entities = items; // action.payload.receive;
            newState.getTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
