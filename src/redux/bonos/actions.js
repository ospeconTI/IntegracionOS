/** @format */

export const GET = "[bonos] GET";

export const GET_SUCCESS = "[bonos] GET success";

export const GET_ERROR = "[bonos] GET error";

export const GENERAR = "[bonos] GENERAR";

export const GENERAR_SUCCESS = "[bonos] GENERAR success";

export const GENERAR_ERROR = "[bonos] GENERAR error";

export const UPDATE = "[bonos] UPDATE";

export const UPDATE_SUCCESS = "[bonos] UPDATE success";

export const UPDATE_ERROR = "[bonos] UPDATE error";
export const GENERAR_BONOS_PERIODO = "[bonos] GENERAR_BONOS_PERIODO";
export const GENERAR_BONOS_PERIODO_SUCCESS = "[bonos] GENERAR_BONOS_PERIODO_SUCCESS";
export const GENERAR_BONOS_PERIODO_ERROR = "[bonos] GENERAR_BONOS_PERIODO_SUCCESS";

export const get = (options) => ({
    type: GET,
    options: options,
});
export const generar = (periodo, expedientes) => ({
    type: GENERAR,
    body: {
        GenerarBonoDTO: {
            Expedientes: expedientes,
            Periodo: periodo,
        },
    },
});
export const update = (entity) => ({
    type: UPDATE,
    entity: entity,
});

export const generarBonosPeriodo = (expediente, periodo, token) => ({
    type: GENERAR_BONOS_PERIODO,
    expediente: expediente,
    periodo: periodo,
    token: token,
});
