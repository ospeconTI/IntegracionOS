/** @format */

export const GET = "[cabecera] GET";

export const GET_SUCCESS = "[cabecera] GET success";

export const GET_ERROR = "[cabecera] GET error";

export const SET_SELECTED = "[cabecera] set selected";

export const get = (options) => ({
    type: GET,
    options: options,
});
export const getCurrent = (prestador, year) => ({
    type: GET,
    options: { filter: "Prestador eq " + prestador.toString() + " and (Evento eq 4 or Evento eq 22) and Detalle/Periodo_Desde ge '" + year.toString() + "01' and Detalle/Periodo_Hasta le '" + year.toString() + "12'", expand: "Detalle($expand=SSS_Prestaciones),Expediente_Bono($filter=Estado eq 'A';$expand=FacturasPrestadores($top=1;$orderby=Id desc;$expand=FacturasPrestadoresImagenes))" },
});

export const setSelected = (selected) => ({
    type: SET_SELECTED,
    selected: selected,
});
