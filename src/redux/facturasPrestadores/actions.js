/** @format */

import { UPDATE_PROFILE } from "../autorizacion/actions";

export const GET = "[facturasPrestadores] GET";

export const GET_SUCCESS = "[facturasPrestadores] GET success";

export const GET_ERROR = "[facturasPrestadores] GET error";

export const ADD = "[facturasPrestadores] ADD";

export const ADD_SUCCESS = "[facturasPrestadores] ADD_SUCCESS";

export const ADD_ERROR = "[facturasPrestadores] ADD_ERROR";

export const UPDATE = "[facturasPrestadores] UPDATE";

export const UPDATE_SUCCESS = "[facturasPrestadores] UPDATE_SUCCESS";

export const UPDATE_ERROR = "[facturasPrestadores] UPDATE_ERROR";

export const UPDATE_ESTADO = "[facturasPrestadores] UPDATE_ESTADO";

export const UPDATE_ESTADO_SUCCESS = "[facturasPrestadores] UPDATE_ESTADO_SUCCESS";

export const SET_SELECTED = "[facturasPrestadores] SET_SELECTED";

export const APROBAR = "[facturasPrestadores] APROBAR";
export const RECHAZAR = "[facturasPrestadores] RECHAZAR";
export const PASAR_A_PENDIENTE_OS = "[facturasPrestadores] PASARAPENDIENTEOS";
export const PASAR_A_PENDIENTE_OS_SUCCESS = "[facturasPrestadores] PASARAPENDIENTEOS_SUCCESS";
export const PASAR_A_PENDIENTE_OS_ERROR = "[facturasPrestadores] PASARAPENDIENTEOS_ERROR";

export const APROBAR_SUCCESS = "[facturasPrestadores] APROBAR_SUCCESS";
export const RECHAZAR_SUCCESS = "[facturasPrestadores] RECHAZAR_SUCCESS";
export const CAMBIO = "[facturasPrestadores] CAMBIO";
export const GET_COMPLEMENTARIA = "[facturasPrestadores] GET_COMPLEMENTARIA";
export const GET_COMPLEMENTARIA_SUCCESS = "[facturasPrestadores] GET_COMPLEMENTARIA_SUCCESS";
export const GET_COMPLEMENTARIA_ERROR = "[facturasPrestadores] GET_COMPLEMENTARIA_ERROR";

export const get = (options) => ({
    type: GET,
    options: options,
});
export const getComplementaria = (id) => ({
    type: GET_COMPLEMENTARIA,
    options: {
        filter: "Id eq " + id,
        expand: "FacturasPrestadoresRechazos,prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
    },
});
export const add = (entity) => ({
    type: ADD,
    entity: entity,
});

export const update = (entity) => ({
    type: UPDATE,
    entity: entity,
});

export const updateEstado = (entity) => ({
    type: UPDATE_ESTADO,
    entity: entity,
});

export const setSelected = (selected) => ({
    type: SET_SELECTED,
    selected: selected,
});

export const aprobar = (entity) => ({
    type: APROBAR,
    entity: entity,
});

export const cambioEstado = (id, idFacturasPrestadoresEstado) => ({
    type: CAMBIO,
    entity: { Id: id, IdFacturasPrestadoresEstado: idFacturasPrestadoresEstado },
});

export const rechazar = (id, Motivo) => ({
    type: RECHAZAR,
    id: id,
    estado: ESTADO_FACTURA_RECHAZADA,
    motivo: Motivo,
});

export const pasarAPendienteOS = (id) => ({
    type: PASAR_A_PENDIENTE_OS,
    id: id,
});
