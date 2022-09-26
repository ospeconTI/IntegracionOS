/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApiExpedientes = SERVICE_URL;
let webApi = SERVICE_URL + "/api";

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
export const facturasPrestadoresLogFetch = ODataEntity(expedienteOdataFactory, "FacturasPrestadoresLog");
export const prestadoresFetch = ODataEntity(expedienteOdataFactory, "Prestado");
export const loginFetch = fetchFactory(webApi, "LoginOS");
export const resumenFetch = fetchFactory(webApi, "Errores/GetResumen");
export const facturasByErrorFetch = fetchFactory(webApi, "Errores/GetFacturasByError");
export const generarFetch = fetchFactory(webApi, "PresentacionSSS/Generar");
export const logonFetch = ODataEntity(expedienteOdataFactory, "Logon");
export const recuperoFetch = ODataEntity(expedienteOdataFactory, "PedirRecupero");
export const cambiarPasswordFetch = ODataEntity(expedienteOdataFactory, "CambiarPassword");
export const facturasPrestadoresRechazosFetch = ODataEntity(expedienteOdataFactory, "FacturasPrestadoresRechazos");
export const RechazarFacturaFetch = ODataEntity(expedienteOdataFactory, "RechazarFactura");
export const AprobarFacturaFetch = ODataEntity(expedienteOdataFactory, "AprobarFactura");
export const ControlarFacturaFetch = ODataEntity(expedienteOdataFactory, "ControlaryCambiar");
export const PasarAPendienteOSFacturaFetch = ODataEntity(expedienteOdataFactory, "PasarAPendienteOS");
export const generaBonosPeriodoFetch = ODataEntity(expedienteOdataFactory, "GenerarBonosPeriodo");
export const medidasFetch = ODataEntity(expedienteOdataFactory, "SSS_Medidas");
export const presentacionesCabeceraFetch = ODataEntity(expedienteOdataFactory, "PresentacionSSS");
export const presentacionSSSResumenFetch = ODataEntity(expedienteOdataFactory, "vPresentacionSSS_Resumen");
export const presentacionSSSFetch = ODataEntity(expedienteOdataFactory, "vPresentacionSSS");
export const presentacionesEstadosFetch = ODataEntity(expedienteOdataFactory, "PresentacionSSS_Estados");
export const presentacionSSS_Debitos = ODataEntity(expedienteOdataFactory, "PresentacionSSS_Debitos");
export const presentacionSSS_Creditos = ODataEntity(expedienteOdataFactory, "PresentacionSSS_Creditos");
export const presentacionesDebitosFetch = fetchFactory(webApi, "Presentacion/Debitos");
export const getResumenFetch = fetchFactory(webApi, "Presentacion/GetResumen");
export const getFacturasByErrorFetch = fetchFactory(webApi, "Presentacion/GetFacturasByError");
export const getFacturasAprobadasHistoricasFetch = fetchFactory(webApi, "Presentacion/FacturasAprobadasHistoricas");
export const presentacionSSS_HistoricoDetalleFetch = ODataEntity(expedienteOdataFactory, "vpresentacionSSS_HistoricoDetalle");
export const PresentacionSSS_HistoricoFetch = ODataEntity(expedienteOdataFactory, "PresentacionSSS_Historico");
export const getErroresByFacturaFetch = fetchFactory(webApi, "Presentacion/GetErroresByFactura");
export const facturasRechazadasSSS = ODataEntity(expedienteOdataFactory, "TraeRechazosSSS");
export const representarFacturasFetch = ODataEntity(expedienteOdataFactory, "RepresentarFacturas");
export const CierrayAbrePresentacionFetch = ODataEntity(expedienteOdataFactory, "CierrayAbrePresentacion");
export const AplicarNovedadesFetch = ODataEntity(expedienteOdataFactory, "AplicarNovedades");
export const CantidadFacturasFetch = ODataEntity(expedienteOdataFactory, "FacturasPorFecha");
export const vAmparosFetch = ODataEntity(expedienteOdataFactory, "vAmparos");