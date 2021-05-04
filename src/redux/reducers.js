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

export const rootReducer = (state = {}, action) => {
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
    };
};
