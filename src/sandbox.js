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

if (process.env.NODE_ENV === "production") {
    registerSW();
    activateSW();
}

store.dispatch(captureMedia());
store.dispatch(getTipoComprobantes({ filter: "TipoFactura ne null" }));

store.dispatch(getFacturasEstados({ orderby: "Descripcion" }));
store.dispatch(getFacturasRechazos({ orderby: "Descripcion" }));

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
