/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { label } from "../css/label";
import { button } from "../css/button";
import { gridLayout } from "../css/gridLayout";
import { hideWarning } from "../../redux/ui/actions";

const CONFIRM = "ui.confirm.timeStamp";
const SCREEN = "screen.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
export class pantallaConfirm extends connect(store, CONFIRM, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.titulo = "";
        this.pregunta = "";
        this.onOK = null;
        this.onCancel = null;
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
            .botonera {
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
                <label id="cuerpo">${this.pregunta} </label>
                <div class="botonera grid column">
                    <button btn1 id="Confirmar" @click=${this.ok}>Confirmar</button>
                    <button btn1 id="Cancelar" @click=${this.cancel}>Cancelar</button>
                </div>
            </div>
        `;
    }
    ok() {
        if (this.onOK) store.dispatch(this.onOK);
        this.hidden = true;
    }
    cancel() {
        if (this.onCancel) store.dispatch(this.onCancel);
        this.hidden = true;
    }

    stateChanged(state, name) {
        if (name == CONFIRM) {
            this.hidden = false;
            this.titulo = state.ui.confirm.titulo;
            this.pregunta = state.ui.confirm.pregunta;
            this.onOK = state.ui.confirm.onOK;
            this.onCancel = state.ui.confirm.onCancel;
            this.update();
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
        };
    }
}

window.customElements.define("pantalla-confirm", pantallaConfirm);
