/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { select } from "../css/select";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { get as getBonos } from "../../redux/bonos/actions";
import { SEARCH } from "../../../assets/icons/svgs";
import { setSelected } from "../../redux/cabecera/actions";
import { goTo } from "../../redux/routing/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PRESENTACIONES = "presentacionSSS.timeStamp";

export class presentacionSSSBody extends connect(store, PRESENTACIONES, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.presentacione = null;

        // this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, "0");
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
                overflow-y: auto;
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

            *[hidden] {
                display: none !important;
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
            .colorEstados[estadobono="APROBADO"] {
                color: green;
            }
            .colorEstados[estadobono="PENDIENTE"] {
                color: yellow;
            }
            .colorEstados[estadobono="RECHAZADO"] {
                color: red;
            }
        `;
    }
    render() {
        if (this.presentacione) {
            return html`
                <div class="grid">
                    <div class="grid column">
                        <div>Fecha Presentacion</div>
                        <div>Período Desde</div>
                        <div>Periodo Hasta</div>
                        <div>Estado</div>
                    </div>
                    ${this.presentaciones.map((item) => {
                        return html`
                            <div class="grid column ">
                                <div>${item.FechaPresentacion ? new Date(item.FechaPresentacion).toLocaleDateString() : ""}</div>
                                <div>${item.PeriodoDesde}</div>
                                <div>${item.PeriodoHasta}</div>
                                <div>${item.IdEstadoPresentacionSSS}</div>
                            </div>
                        `;
                    })}
                </div>
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["presentacionSSS"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                this.presentaciones = state.presentacionSSS.entities;
            }
            this.update();
        }
        if (name == PRESENTACIONES) {
            this.presentaciones = state.presentacionSSS.entities;
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
window.customElements.define("presentacionsss-body", presentacionSSSBody);
