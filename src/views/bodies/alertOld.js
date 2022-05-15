/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const ERROR_MESSAGES = "ui.error.messages";
const FACTURA_ERROR = "facturasPrestadores.errorTimeStamp";
const PASAR_A_PENDIENTE_OS_ERROR = "facturasPrestadores.pasarAPendienteOSErrorTimeStamp";
export class alertaErroresOld extends connect(store, ERROR_MESSAGES, FACTURA_ERROR, PASAR_A_PENDIENTE_OS_ERROR)(LitElement) {
    constructor() {
        super();
    }
    render() {
        return html``;
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }

        if (name == ERROR_MESSAGES) {
            alert(
                "ERROR :\n\n" +
                    state.ui.error.messages.reduce((text, msg) => {
                        return text + "• " + msg.campo + ": " + msg.mensaje + "\n";
                    }, "")
            );
        }
        if (name == FACTURA_ERROR) {
            if (state.facturasPrestadores.errorMessage) alert("ERROR :\n\n" + state.facturasPrestadores.errorMessage);
        }

        if (name == PASAR_A_PENDIENTE_OS_ERROR) {
            alert("ERROR :\n\n" + state.facturasPrestadores.pasarAPendienteOSError);
        }
    }
}
window.customElements.define("alerta-erroresold", alertaErroresOld);
