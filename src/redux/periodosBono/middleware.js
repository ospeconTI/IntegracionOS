/** @format */

import { SET, LISTAPERIODOSBONO, LISTAPERIODOSBONO_SUCCESS } from "./actions";

export const listar =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === LISTAPERIODOSBONO) {
            let lista = [];
            const fechaHoy = new Date();
            const periodoActual = fechaHoy.getFullYear() * 100 + (fechaHoy.getMonth() + 1);

            for (let i = action.periodosBack; i >= 0; i--) {
                lista.push(fechaHoy.getFullYear() * 100 + (fechaHoy.getMonth() + 1 - i));
            }
            dispatch({
                type: LISTAPERIODOSBONO_SUCCESS,
                payload: {
                    send: 1,
                    receive: lista,
                },
            });
        }
    };

export const middleware = [listar];
