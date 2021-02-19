/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApiExpedientes = SERVICE_URL;

const expedienteOdataFactory = ODataFetchFactory({
    fetch: fetch,
    domain: webApiExpedientes,
});

export const cabeceraFetch = ODataEntity(expedienteOdataFactory, "Cabecera");
export const bonosFetch = ODataEntity(expedienteOdataFactory, "Expediente_Bono");
export const generarBonosFetch = ODataEntity(expedienteOdataFactory, "GenerarBonos");
export const tipoComprobantesFetch = ODataEntity(expedienteOdataFactory, "SSS_TipoComprobantes");
export const documentacionFetch = ODataEntity(expedienteOdataFactory, "Documentacion");
export const facturasPrestadoresFetch = ODataEntity(expedienteOdataFactory, "FacturasPrestadores");
export const facturasPrestadoresImagenesFetch = ODataEntity(expedienteOdataFactory, "FacturasPrestadoresImagenes");
export const grabarImagenesFetch = ODataEntity(expedienteOdataFactory, "Grabar");
export const facturasPrestadoresEstadosFetch = ODataEntity(expedienteOdataFactory, "FacturasPrestadoresEstados");
export const prestadoresFetch = ODataEntity(expedienteOdataFactory, "Prestado");
export const loginFetch = ODataEntity(expedienteOdataFactory, "Login");
export const logonFetch = ODataEntity(expedienteOdataFactory, "Logon");
export const recuperoFetch = ODataEntity(expedienteOdataFactory, "PedirRecupero");
export const cambiarPasswordFetch = ODataEntity(expedienteOdataFactory, "CambiarPassword");
export const facturasPrestadoresRechazosFetch = ODataEntity(expedienteOdataFactory, "FacturasPrestadoresRechazos");
