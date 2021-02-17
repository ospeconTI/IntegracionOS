/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { label } from "../css/label";
import { hideWarning } from "../../redux/ui/actions";

const WARNING = "ui.warning.timeStamp";
const SCREEN = "screen.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
export class pantallaWarning extends connect(store, WARNING, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
    }

    static get styles() {
        return css`
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
            }
            :host([hidden]) {
                display: none;
            }
            #fondo {
                position: absolute;
                display: grid;
                top: 0rem;
                left: 0rem;
                bottom: 0rem;
                right: 0rem;
                height: 100%;
                width: 100%;
                background-color: var(--color-negro) !important;
                opacity: 0.3;
                backdrop-filter: blur(2px);
            }
            #datos {
                position: relative;
                display: grid;
                max-width: fit-content;
                min-width: 14rem;
                justify-self: center;
                max-height: fit-content;
                min-height: 8rem;
                align-self: center;
                border-radius: 1rem;
                box-shadow: var(--shadow-elevation-3-box);
                grid-template-rows: 20% 20% 60%;
                grid-gap: 0.5rem;
                align-items: center;
            }
            .fondoInformacion {
                background-color: var(--color-gris-fondo) !important;
            }
            .fondoError {
                background-color: var(--color-error) !important;
            }
            .fondoOk {
                background-color: var(--color-ok) !important;
            }
            #x {
                position: relative;
                align-self: flex-start;
                justify-self: flex-end;
                padding: 0.6rem 1rem 0 0;
                cursor: pointer;
            }
            #titulo {
                position: relative;
                text-align: center;
                font-size: var(--font-header-h1-menos-size);
                font-weight: var(--font-header-h1-menos-weight);
            }
            #cuerpo {
                position: relative;
                text-align: center;
                width: 80%;
                justify-self: center;
                align-self: flex-start;
                font-size: var(--font-header-h2-size);
                font-weight: var(--font-header-h2-weight);
            }
        `;
    }
    render() {
        return html`
            <div id="fondo" @click=${this.clickBoton1}></div>
            <div id="datos">
                <div id="x" @click=${this.clickBoton1}>X</div>
                <label id="titulo"> </label>
                <label id="cuerpo"> </label>
            </div>
        `;
    }
    stateChanged(state, name) {
        if (name == WARNING) {
            this.hidden = state.ui.warning.hidden;
            if (!this.hidden) {
                var datos = this.shadowRoot.querySelector("#datos");
                datos.classList.remove(state.ui.warning.backgroundColor);
                datos.classList.add(state.ui.warning.backgroundColor);
                if (state.ui.warning.timeOut > 0) {
                    setTimeout(() => {
                        this.clickBoton1();
                    }, state.ui.warning.timeOut);
                }
            }
            this.update();
        }
    }
    clickBoton1() {
        store.dispatch(hideWarning());
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

window.customElements.define("pantalla-warning", pantallaWarning);
