/** @format */

export const GET_RESUMEN = "[presentacionesErrores] GET_RESUMEN";
export const GET_RESUMEN_SUCCESS = "[presentacionesErrores] GET_RESUMEN_SUCCESS";
export const GET_RESUMEN_ERROR = "[presentacionesErrores] GET_RESUMEN_ERROR";

export const GET_FACTURAS_BY_ERROR = "[presentacionesErrores] GET_FACTURAS_BY_ERROR";
export const GET_FACTURAS_BY_ERROR_SUCCESS = "[presentacionesErrores] GET_FACTURAS_BY_ERROR_SUCCESS";
export const GET_FACTURAS_BY_ERROR_ERROR = "[presentacionesErrores] GET_FACTURAS_BY_ERROR_ERROR";

export const GET_ERRORES_BY_FACTURA = "[presentacionesErrores] GET_ERRORES_BY_FACTURA";
export const GET_ERRORES_BY_FACTURA_SUCCESS = "[presentacionesErrores] GET_ERRORES_BY_FACTURA_SUCCESS";
export const GET_ERRORES_BY_FACTURA_ERROR = "[presentacionesErrores] GET_ERRORES_BY_FACTURA_ERROR";

export const CLEAN_SELECTED = "[presentacionesErrores] CLEAN_SELECTED";

export const getResumen = () => ({
    type: GET_RESUMEN,
});

export const getFacturasByError = (error) => ({
    type: GET_FACTURAS_BY_ERROR,
    error: error,
});

export const cleanSelected = () => ({
    type: CLEAN_SELECTED,
});

export const getErroresByFactura = (factura) => ({
    type: GET_ERRORES_BY_FACTURA,
    factura: factura,
});
