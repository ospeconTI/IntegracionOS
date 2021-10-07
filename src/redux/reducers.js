/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as cabeceraReducer } from "./cabecera/reducer";
import { reducer as bonosReducer } from "./bonos/reducer";
import { reducer as prestadorReducer } from "./prestador/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as tipoComprobantesReducer } from "./tipoComprobantes/reducer";
import { reducer as periodoReducer } from "./periodo/reducer";
import { reducer as documentacionReducer } from "./documentacion/reducer";
import { reducer as facturasPrestadoresReducer } from "./facturasPrestadores/reducer";
import { reducer as facturasPrestadoresImagenesReducer } from "./facturasPrestadoresImagenes/reducer";
import { reducer as facturasPrestadoresEstadosReducer } from "./facturasPrestadoresEstados/reducer";
import { reducer as periodosMensualesReducer } from "./periodosMensuales/reducer";
import { reducer as filtroReducer } from "./filtro/reducer";
import { reducer as facturasPrestadoresRechazosReducer } from "./facturasPrestadoresRechazos/reducer";
import { reducer as notifications } from "./notifications/reducer";
import { reducer as periodosBono } from "./periodosBono/reducer";
import { reducer as medidasReducer } from "./medidas/reducer";
import { reducer as presentacionesCabeceraReducer } from "./presentacionesCabecera/reducer";
import { reducer as periodosPresentacionesReducer } from "./periodosPresentaciones/reducer";
import { reducer as facturasPrestadoresLogReducer } from "./facturasPrestadoresLog/reducer";
import { reducer as presentacionesEstadosReducer } from "./presentacionesEstados/reducer";
import { reducer as presentacionesErroresReducer } from "./presentacionesErrores/reducer";
import { reducer as presentacionesSSSReducer } from "./presentacionSSS/reducer";

export const rootReducer = (state = {}, action) => {
    const presentacionesEstadosRed = state.presentacionesEstados;
    return {
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        cabecera: cabeceraReducer(state.cabecera, action),
        bonos: bonosReducer(state.bonos, action),
        prestador: prestadorReducer(state.prestador, action),
        autorizacion: autorizacionReducer(state.autorizacion, action),
        tipoComprobantes: tipoComprobantesReducer(state.tipoComprobantes, action),
        periodo: periodoReducer(state.periodo, action),
        documentacion: documentacionReducer(state.documentacion, action),
        facturasPrestadores: facturasPrestadoresReducer(state.facturasPrestadores, action),
        facturasPrestadoresImagenes: facturasPrestadoresImagenesReducer(state.facturasPrestadoresImagenes, action),
        facturasPrestadoresEstados: facturasPrestadoresEstadosReducer(state.facturasPrestadoresEstados, action),
        periodosMensuales: periodosMensualesReducer(state.periodosMensuales, action),
        filtro: filtroReducer(state.filtro, action),
        facturasPrestadoresRechazos: facturasPrestadoresRechazosReducer(state.facturasPrestadoresRechazos, action),
        notifications: notifications(state.notifications, action),
        periodosBono: periodosBono(state.periodosBono, action),
        medidas: medidasReducer(state.medidas, action),
        presentacionesCabecera: presentacionesCabeceraReducer(state.presentacionesCabecera, action, presentacionesEstadosRed),
        periodosPresentaciones: periodosPresentacionesReducer(state.periodosPresentaciones, action),
        facturasPrestadoresLog: facturasPrestadoresLogReducer(state.facturasPrestadoresLog, action),
        presentacionesEstados: presentacionesEstadosReducer(state.presentacionesEstados, action),
        presentacionesErrores: presentacionesErroresReducer(state.presentacionesErrores, action),
        presentacionesSSS: presentacionesSSSReducer(state.presentacionesSSS, action),
    };
};
