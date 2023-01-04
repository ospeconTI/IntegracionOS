import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { select } from "../css/select";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { ADD } from "../../../assets/icons/svgs";

import { goTo } from "../../redux/routing/actions";
import { set, update, add } from "../../redux/facturasPrestadoresRechazos/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const RECHAZOS = "facturasPrestadoresRechazos.timeStamp";

export class motivosRechazo extends connect(store, MEDIA_CHANGE, SCREEN, RECHAZOS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.rechazos = [];
        this.modo = "";

        this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString();
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${toggle}
            ${input}
            ${select}

            :host {
                display: grid;
                grid-auto-flow: row;
                align-content: start;

                width: 98vw;
                padding: 1vw;
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

            .tarjeta {
                padding: 0.5rem;
                background-color: white;
                box-shadow: var(--shadow-elevation-2-box);
            }
            .sublabel {
                color: var(--color-azul-oscuro);
                font-size: 0.8rem;
            }
            .primaryColor {
                color: var(--primary-color);
            }
            .primaryColorInvert {
                color: white;
                background-color: var(--primary-color);
                padding: 0.3rem;
                border-radius: 4px;
            }
            .cabecera {
                font-size: 0.9rem;
                font-weight: bold;
                background-color: var(--color-gris-claro);
            }
            .datos {
                background-color: white;
                color: var(--color-azul-oscuro);
                font-size: 0.9rem;
                cursor: pointer;
            }
            .datos:hover {
                background-color: var(--color-gris-claro);
            }
            .ordena {
                cursor: pointer;
            }

            .rows {
                height: 68vh;
                overflow-y: auto;
                gap: 0.3rem;
                box-sizing: content-box;
                align-content: flex-start;
            }
            .contenedor {
                background-color: var(--color-crudo);
                margin: auto;
                width: 1000px;
            }
            .bordeRow {
                border-bottom: 1px solid var(--color-gris-claro);
            }

            .columnas {
                grid-template-columns: 1f;
                padding: 0.3rem !important;
            }
            .amparo svg {
                fill: red;
                height: 1.2rem;
                width: 1.2rem;
            }
            .formulario {
                gap: 0.5rem; //separacion
                display: grid;

                border: 1px double #ffffff !important;

                width: 40rem;
                height: 10rem;
                background-color: #f3f3f0;
                box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.53);
            }

            .btni {
                display: inline-block !important;
                padding: 5px 25px !important;
                position: relative !important;
            }

            .gridcol {
                grid-auto-flow: column !important;
            }

            .botonadd {
                border-radius: 50% !important;
                position: absolute;
                bottom: 2rem;
                right: 15rem;
                z-index: 1000;
            }
            .botonadd svg {
                height: 2rem;
                width: 2rem;
                stroke: white;
                fill: white;
            }
        `;
    }
    render() {
        if (this.facturas) {
            return html`
                <div class="grid row contenedor">
                    <div class="grid column ">
                        <div class="justify-self-center">
                            Motivos de Rechazo
                            <button btn1 @click="${this.agregar}" class="botonadd">${ADD}</button>
                        </div>
                    </div>

                    <div class="grid columnas cabecera bordeRow">
                        <div @click=${this.modificar}>Descripción</div>
                    </div>
                    <div class="inner-grid rows">
                        ${this.rechazos.map((item) => {
                            return html`
                                <div class="inner-grid columnas datos bordeRow " .item="${item}" @click="${this.seleccionar}">
                                    <div>${item.Descripcion}</div>
                                </div>
                            `;
                        })}
                    </div>
                </div>
                <dialog class="formulario" id="formulario">
                    <div class="input">
                        <label>Descripción</label>
                        <input type="text" id="descripcion" />
                    </div>
                    <div class="grid column center">
                        <button btn1 class="btni" @click="${this.grabar}">Grabar</button>
                        <button btn1 class="btni" @click="${this.cancelar}">Cancelar</button>
                    </div>
                </dialog>
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }

    seleccionar(e) {
        store.dispatch(set(e.currentTarget.item)); //guarda el valor del item en el state
        this.modo = "M";
        const formulario = this.shadowRoot.querySelector("#formulario");
        const descripcion = this.shadowRoot.querySelector("#descripcion");
        descripcion.value = e.currentTarget.item.Descripcion;

        formulario.showModal();
    }
    agregar(e) {
        this.modo = "A";
        const formulario = this.shadowRoot.querySelector("#formulario");
        const descripcion = this.shadowRoot.querySelector("#descripcion");
        descripcion.value = "";

        formulario.showModal();
    }

    cancelar(e) {
        const formulario = this.shadowRoot.querySelector("#formulario");
        formulario.close();
    }
    grabar(e) {
        const formulario = this.shadowRoot.querySelector("#formulario");
        const descripcion = this.shadowRoot.querySelector("#descripcion").value;
        let body = { Descripcion: descripcion, Activo: true };
        if (this.modo == "M") {
            body.Id = store.getState().facturasPrestadoresRechazos.selected.Id;
            store.dispatch(update(body));
        } else {
            store.dispatch(add(body));
        }

        store.dispatch(update(body));
        this.cancelar();
        this.update();
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["motivosRechazo"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                this.facturas = [];
            }
            this.update();
        }
        if (name == RECHAZOS) {
            this.rechazos = state.facturasPrestadoresRechazos.entities;
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
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String,
            },
        };
    }
}
window.customElements.define("motivos-rechazo", motivosRechazo);
