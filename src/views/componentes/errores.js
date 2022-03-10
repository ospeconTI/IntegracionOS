/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const ERRORES = "presentacionesErrores.erroresByFacturaTimeStamp";

export class erroresFacturas extends connect(store, MEDIA_CHANGE, SCREEN, ERRORES)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.errores = [];
        this.estados = [];
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${toggle}
            ${button}

            :host {
                display: grid;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 70vh;
                width: 70vw;
                z-index: 100;
                background-color: white;
                border-radius: 1rem;
                box-shadow: var(--shadow-elevation-6-box);
                align-content: start;
            }
            #items {
                overflow-y: auto;
            }
            .item {
                grid-template-columns: 1fr 7fr 4fr;
                grid-gap: 2rem;
            }

            :host([hidden]) {
                display: none;
            }

            h1,
            h2,
            h3,
            h4 {
                margin: 0;
            }

            .oculto {
                display: none !important;
            }
        `;
    }
    render() {
        return html`
            <button btn1 @click="${this.cerrar}">CERRAR</button>
            <div class="grid start" id="items">
                ${this.errores.map((item) => {
                    return html`<div class="grid column item">
                        <div>${item.IdError}</div>
                        <div>${item.Descripcion}</div>
                        <div>${item.PeriodoPresentacion}</div>
                    </div>`;
                })}
            </div>
        `;
    }

    cerrar() {
        this.hidden = true;
        this.update();
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }

        if (name == ERRORES) {
            this.errores = state.presentacionesErrores.erroresByFactura;
            this.hidden = false;
            this.update();
        }
    }

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
window.customElements.define("errores-facturas", erroresFacturas);
