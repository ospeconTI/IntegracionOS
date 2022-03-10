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

            for (let i = action.periodosBack; i >= 0; i--) {
                lista.push(fechaHoy.getFullYear() * 100 + (fechaHoy.getMonth() + 1));
                fechaHoy.setMonth(fechaHoy.getMonth() - 1);
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
