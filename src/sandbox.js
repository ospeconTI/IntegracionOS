/** @format */

import {} from "../css/main.css";
import {} from "../css/media.css";
import {} from "../css/nunito.css";
import {} from "../css/fontSizes.css";
import {} from "../css/colors.css";
import {} from "../css/shadows.css";

import { store } from "../src/redux/store";
import { captureMedia } from "./redux/ui/actions";
import { goTo } from "./redux/routing/actions";
import { viewManager } from "./views/manager";
import { login } from "./redux/autorizacion/actions";
import { register as registerSW, activate as activateSW } from "./libs/serviceWorker";
import { get as getTipoComprobantes } from "./redux/tipoComprobantes/actions";
import { get as getDocumentacion } from "./redux/documentacion/actions";
import { get as getFacturasEstados } from "./redux/facturasPrestadoresEstados/actions";
import { add, get as getFacturasRechazos } from "./redux/facturasPrestadoresRechazos/actions";
import { get as getPesentacionesCabecera } from "./redux/presentacionesCabecera/actions";
import { lista, set } from "./redux/periodo/actions";
import { listaMensuales, set as setMensual } from "./redux/periodosMensuales/actions";
import { set as setFiltro } from "./redux/filtro/actions";
import { listaPeriodosBono } from "./redux/periodosBono/actions";
import { get as getMedidas } from "./redux/medidas/actions";
import { lista as listaPeriodosPresentacion } from "./redux/periodosPresentaciones/actions";
import { get as getPresentacionsEstados } from "./redux/presentacionesEstados/actions";

if (process.env.NODE_ENV === "production") {
    registerSW();
    activateSW();
}

store.dispatch(captureMedia());

let actual = new Date();
let mesActual = actual.getMonth() + 1;
actual = actual.getFullYear();
let anterior = actual - 1;
let siguiente = actual + 1;
const periodos = [anterior, actual, siguiente];
//const periodos = [actual, siguiente];
store.dispatch(lista(periodos));
store.dispatch(set(actual));
store.dispatch(setFiltro("IdFacturasPrestadoresEstado eq " + ESTADO_FACTURA_PRESENTADA));
store.dispatch(goTo("main"));

let periodosMensuales = [];

periodos.forEach((element) => {
    let i = 1;
    for (i == 1; i <= 12; i++) {
        periodosMensuales.push(element * 100 + i);
    }
});

setTimeout(() => {
    store.dispatch(getFacturasEstados({ orderby: "Descripcion" }));
    store.dispatch(getTipoComprobantes({ filter: "CodigoSSS ne '00'" }));
    store.dispatch(getFacturasRechazos({ orderby: "Descripcion" }));
    store.dispatch(getPesentacionesCabecera({ top: 20, orderby: "PeriodoPresentacion desc", filter: "Activo" }));
    store.dispatch(getMedidas({}));
    store.dispatch(getPresentacionsEstados({}));

    store.dispatch(listaMensuales(periodosMensuales));
    const periodoMensualActual = actual * 100 + mesActual;
    store.dispatch(setMensual(periodoMensualActual));

    let fechaDesde = new Date();
    fechaDesde.setMonth(fechaDesde.getMonth() - 1);
    let mesesPresentacion = [];
    for (let i = 0; i <= 5; i++) {
        mesesPresentacion[i] = fechaDesde.getFullYear() * 100 + (fechaDesde.getMonth() + 1);
        fechaDesde.setMonth(fechaDesde.getMonth() + 1);
    }
    store.dispatch(listaPeriodosPresentacion(mesesPresentacion));
}, 2000);

if ("credentials" in navigator) {
    navigator.credentials
        .get({ password: true, mediation: "optional" })
        .catch((err) => console.log("navigator.credentials.get: No funciona en Firefox"))
        .then((cred) => {
            if (cred) {
                store.dispatch(login(cred.id, cred.password, true));
            } else {
                store.dispatch(goTo("login"));
            }
        });
} else {
    store.dispatch(goTo("login"));
}
/* import { add as addRecha, update } from "./redux/facturasPrestadoresRechazos/actions";
const body = { Descripcion: "Nuevo rechazo" };
const bodyUpdate = { Id: 28, Descripcion: "Nuevo rechazo" };
store.dispatch(update(body)); */

store.dispatch(listaPeriodosBono(6));
store.dispatch(getDocumentacion({ filter: "Prestador" }));
export default {
    login: (email, password) => {
        store.dispatch(login(email, password));
    },
    cambioClave: () => {
        store.dispatch(goTo("cambioClave"));
    },
    miembro: () => {
        store.dispatch(goTo("serMiembro"));
    },
};
