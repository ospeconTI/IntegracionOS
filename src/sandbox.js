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
import { get as getFacturasRechazos } from "./redux/facturasPrestadoresRechazos/actions";
import { lista, set } from "./redux/periodo/actions";
import { listaMensuales, set as setMensual } from "./redux/periodosMensuales/actions";
import { set as setFiltro } from "./redux/filtro/actions";

if (process.env.NODE_ENV === "production") {
    registerSW();
    activateSW();
}

store.dispatch(captureMedia());
store.dispatch(getTipoComprobantes({ filter: "TipoFactura ne null" }));

store.dispatch(getFacturasEstados({ orderby: "Descripcion" }));
store.dispatch(getFacturasRechazos({ orderby: "Descripcion" }));

let actual = new Date();
let mesActual = actual.getMonth() + 1;
actual = actual.getFullYear();
let anterior = actual - 1;
let siguiente = actual + 1;
//const periodos = [anterior, actual, siguiente];
const periodos = [actual, siguiente];
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
store.dispatch(listaMensuales(periodosMensuales));
const periodoMensualActual = actual * 100 + mesActual;
store.dispatch(setMensual(periodoMensualActual));

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
