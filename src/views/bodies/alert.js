/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { label } from "../css/label";
import { button } from "../css/button";
import { gridLayout } from "../css/gridLayout";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const ERROR_MESSAGES = "ui.error.messages";
const FACTURA_ERROR = "facturasPrestadores.errorTimeStamp";
const PASAR_A_PENDIENTE_OS_ERROR = "facturasPrestadores.pasarAPendienteOSErrorTimeStamp";
export class alertaErrores extends connect(store, ERROR_MESSAGES, FACTURA_ERROR, PASAR_A_PENDIENTE_OS_ERROR)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.titulo = "Atención";
        this.mensaje = "";
    }

    static get styles() {
        return css`
            ${button}
            ${gridLayout}
            ${label}
            :host {
                position: fixed;
                display: grid;
                top: 0rem;
                left: 0rem;
                bottom: 0rem;
                right: 0rem;
                height: 100vh;
                width: 100vw;
                z-index: 100000;
                background-color: rgba(0, 0, 0, 0.3);
                place-content: center;
            }
            :host([hidden]) {
                display: none;
            }

            #titulo {
                font-size: var(--font-header-h1-menos-size);
                font-weight: var(--font-header-h2-weight);
            }
            #cuerpo {
                padding: 1rem;
                font-size: var(--font-error-size);
            }
            #cuerpo div {
                padding: 0.3rem;
            }

            .ventana {
                background-color: var(--color-gris-medio-claro);
                padding: 2rem;
                border-radius: 4px;
            }
        `;
    }
    render() {
        return html`
            <div class="ventana grid row">
                <label id="titulo">${this.titulo} </label>
                <div id="cuerpo">${this.mensaje}</div>
                <button btn1 id="Ok" @click=${this.ok}>Ok</button>
            </div>
        `;
    }
    ok() {
        this.hidden = true;
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == ERROR_MESSAGES) {
            this.hidden = state.ui.error.messages.length == 0;
            this.mensaje = html` ${state.ui.error.messages.map((msg) => {
                return html`<div>${"• " + msg.campo + (msg.campo ? ": " : "") + msg.mensaje}</div>`;
            })}`;
        }
        if (name == FACTURA_ERROR) {
            if (state.facturasPrestadores.errorMessage) {
                this.hidden = false;
                this.mensaje = html`<div>${state.facturasPrestadores.errorMessage}</div>`;
            }
        }

        if (name == PASAR_A_PENDIENTE_OS_ERROR) {
            this.hidden = false;
            this.mensaje = html`<div>${state.facturasPrestadores.pasarAPendienteOSError}</div>`;
        }
    }
    firstUpdated() {}

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            mensaje: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("alerta-errores", alertaErrores);
