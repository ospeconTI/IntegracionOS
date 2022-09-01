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

export const CONTROLAR = "[facturasPrestadores] CONTROLAR";
export const CONTROLAR_SUCCESS = "[facturasPrestadores] CONTROLAR_SUCCESS";
export const CONTROLAR_ERROR = "[facturasPrestadores] CONTROLAR_ERROR";

export const APROBAR_SUCCESS = "[facturasPrestadores] APROBAR_SUCCESS";
export const RECHAZAR_SUCCESS = "[facturasPrestadores] RECHAZAR_SUCCESS";
export const CAMBIO = "[facturasPrestadores] CAMBIO";

export const GET_COMPLEMENTARIA = "[facturasPrestadores] GET_COMPLEMENTARIA";
export const GET_COMPLEMENTARIA_SUCCESS = "[facturasPrestadores] GET_COMPLEMENTARIA_SUCCESS";
export const GET_COMPLEMENTARIA_ERROR = "[facturasPrestadores] GET_COMPLEMENTARIA_ERROR";

export const GET_BY_ERROR = "[facturasPrestadores] GET_BY_ERROR";
export const GET_BY_ERROR_SUCCESS = "[facturasPrestadores] GET_BY_ERROR_SUCCESS";
export const GET_BY_ERROR_ERROR = "[facturasPrestadores] GET_BY_ERROR_ERROR";

export const GET_FACTURA_AND_SELECT = "[facturasPrestadores] GET_FACTURA_AND_SELECT";
export const GET_FACTURA_AND_SELECT_SUCCESS = "[facturasPrestadores] GET_FACTURA_AND_SELECT_SUCCESS";
export const GET_FACTURA_AND_SELECT_ERROR = "[facturasPrestadores] GET_FACTURA_AND_SELECT_ERROR";

export const GET_FACTURAS_RECHAZADAS_SSS = "[facturasPrestadores] GET_FACTURAS_RECHAZADAS_SSS";
export const GET_FACTURAS_RECHAZADAS_SSS_SUCCESS = "[facturasPrestadores] GET_FACTURAS_RECHAZADAS_SSS_SUCCESS";
export const GET_FACTURAS_RECHAZADAS_SSS_ERROR = "[facturasPrestadores] GET_FACTURAS_RECHAZADAS_SSS_ERROR";

export const REPRESENTAR = "[facturasPrestadores] REPRESENTAR";
export const REPRESENTAR_SUCCESS = "[facturasPrestadores] REPRESENTAR_SUCCESS";
export const REPRESENTAR_ERROR = "[facturasPrestadores] REPRESENTAR_ERROR";

export const GET_CANTIDAD_FACTURAS = "[facturasPrestadores] GET_CANTIDAD_FACTURAS";
export const GET_CANTIDAD_FACTURAS_SUCCESS = "[facturasPrestadores] GET_CANTIDAD_FACTURAS_SUCCESS";
export const GET_CANTIDAD_FACTURAS_ERROR = "[facturasPrestadores] GET_CANTIDAD_FACTURAS_ERROR";


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

export const getFacturaAndSelect = (id) => ({
    type: GET_FACTURA_AND_SELECT,
    options: {
        filter: "Id eq " + id,
        expand: "FacturasPrestadoresErrores($filter=Activo),FacturasPrestadoresRechazos,prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
    },
});

export const getByError = (error) => ({
    type: GET_BY_ERROR,
    error: error,
    options: { top: 200 },
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

export const controlar = (entity) => ({
    type: CONTROLAR,
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

export const getFacturasRechazadasSSS = (options) => ({
    type: GET_FACTURAS_RECHAZADAS_SSS,
    options: options,
});

export const representar = (facturas) => ({
    type: REPRESENTAR,
    body: {
        FacturasaRepresentarDTO: {
            Facturas: facturas,
        },
    },
});

export const getCantidadFacturas = (desde, hasta) => ({
    type: GET_CANTIDAD_FACTURAS,
    desde: desde,
    hasta: hasta
});