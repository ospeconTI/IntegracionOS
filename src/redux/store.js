/** @format */

import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import { rootReducer as reducers } from "./reducers";
import { middleware as ui } from "./ui/middleware";
import { middleware as api } from "./api/middleware";
import { middleware as rest } from "./rest/middleware";
import { middleware as route } from "./routing/middleware";
import { middleware as cabecera } from "./cabecera/middleware";
import { middleware as bonos } from "./bonos/middleware";
import { middleware as autorizacion } from "./autorizacion/middleware";
import { middleware as tipoComprobantes } from "./tipoComprobantes/middleware";
import { middleware as documentacion } from "./documentacion/middleware";
import { middleware as facturasPrestadores } from "./facturasPrestadores/middleware";
import { middleware as facturasPrestadoresImagenes } from "./facturasPrestadoresImagenes/middleware";
import { middleware as facturasPrestadoresEstados } from "./facturasPrestadoresEstados/middleware";
import { middleware as prestador } from "./prestador/middleware";
import { middleware as facturasPrestadoresRechazos } from "./facturasPrestadoresRechazos/middleware";
import { middleware as notifications } from "./notifications/middleware";
import { middleware as periodosBono } from "./periodosBono/middleware";
import { middleware as medidas } from "./medidas/middleware";
import { middleware as presentacionesCabecera } from "./presentacionesCabecera/middleware";
import { middleware as presentacionesEstados } from "./PresentacionesEstados/middleware";
import { middleware as presentacionesErrores } from "./presentacionesErrores/middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [
    api,
    rest,
    ...ui,
    ...route,
    ...cabecera,
    ...bonos,
    ...tipoComprobantes,
    ...documentacion,
    ...facturasPrestadores,
    ...facturasPrestadoresImagenes,
    ...facturasPrestadoresEstados,
    ...autorizacion,
    ...prestador,
    ...facturasPrestadoresRechazos,
    ...notifications,
    ...periodosBono,
    ...medidas,
    ...presentacionesCabecera,
    ...presentacionesEstados,
    ...presentacionesErrores,
];

if (process.env.NODE_ENV !== "production") {
    mdw = [...mdw, logger];
}

const initialData = {};

export const store = createStore(reducers, initialData, composeEnhancers(applyMiddleware(...mdw)));
