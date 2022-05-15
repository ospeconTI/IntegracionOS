/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { select } from "../css/select";
import { onOff } from "../css/onOff";
import { prestadoresComponent } from "./prestadores";
import { get as getPresentacionesCabecera } from "../../redux/presentacionesCabecera/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const ESTADOS = "presentacionesEstados.getTimeStamp";

export class filtrosPresentaciones extends connect(store, MEDIA_CHANGE, SCREEN, ESTADOS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes = [];
        this.periodos = [];
        this.estados = [];
        this.periodoActual = null;
        this.open = false;
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${toggle}
            ${input}
            ${select}
            ${onOff}

            :host {
                overflow-y: auto;
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
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `;
    }
    render() {
        return html`
            <div class="grid fit" style="grid-gap:0">
                <div class="grid column">
                    <button btn3 @click="${this.limpiar}">Limpiar Filtros</button>
                    <button btn1 @click="${this.buscar}">Buscar</button>
                    <button btn1 @click="${this.cerrar}">Cerrar</button>
                </div>

                <div class="input">
                    <label>Periodo Presentacion</label>
                    <input type="number" id="periodoPresentacion" autocomplete="off" maxlength="6" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>Periodo Desde</label>
                    <input type="number" id="periodoDesde" autocomplete="off" maxlength="6" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>Periodo Hasta</label>
                    <input type="number" id="periodoHasta" autocomplete="off" maxlength="6" @input=${this.maxLength} />
                </div>
                <div class="select">
                    <label>Estados</label>
                    <select id="estados">
                        <option value="-1">Todos</option>
                        ${this.estados.map((c) => {
                            return html`<option value="${c.Id}" ?selected=${c.Id == this.estado}>${c.Descripcion}</option>`;
                        })}
                    </select>
                </div>
            </div>
        `;
    }

    cerrar() {
        this.isOpen = false;
        this.update();
    }

    limpiar() {
        const periodoPresentacion = this.shadowRoot.querySelector("#periodoPresentacion");
        const periodoDesde = this.shadowRoot.querySelector("#periodoDesde");
        const periodoHasta = this.shadowRoot.querySelector("#periodoHasta");
        const estado = this.shadowRoot.querySelector("#estado");

        periodoPresentacion.value = "";
        periodoDesde.value = "";
        periodoHasta.value = "";
        estado.value = -1;

        let filtro = "";

        if (periodoPresentacion.value != "") {
            filtro += "PeriodoPresentacion eq " + periodoPresentacion.value + " and ";
        }

        if (periodoDesde.value != 0 && periodoDesde.value != "") {
            filtro += "PeriodoDesde eq " + periodoDesde.value + " and ";
        }

        if (periodoHasta.value != 0 && periodoHasta.value != "") {
            filtro += "PeriodoHasta eq " + periodoHasta.value + " and ";
        }

        if (prestador.value && prestador.value != "") {
            filtro += "IdPrestador eq " + prestador.value + " and ";
        }

        if (estado.value != -1) {
            filtro += "estado eq " + estado.value + " and ";
        }
        filtro = filtro.slice(0, -5);

        this.update();
    }
    buscar(e) {
        const periodoPresentacion = this.shadowRoot.querySelector("#periodoPresentacion");
        const periodoDesde = this.shadowRoot.querySelector("#periodoDesde");
        const periodoHasta = this.shadowRoot.querySelector("#periodoHasta");
        const estado = this.shadowRoot.querySelector("#estados");

        let filtro = "";

        if (periodoPresentacion.value != "") {
            filtro += "PeriodoPresentacion eq " + periodoPresentacion.value + " and ";
        }

        if (periodoDesde.value != 0 && periodoDesde.value != "") {
            filtro += "PeriodoDesde eq " + periodoDesde.value + " and ";
        }

        if (periodoHasta.value != 0 && periodoHasta.value != "") {
            filtro += "PeriodoHasta eq " + periodoHasta.value + " and ";
        }

        if (estado.value != -1) {
            filtro += "IdEstadoPresentacionSSS eq " + estado.value + " and ";
        }

        filtro = filtro.slice(0, -5);

        //store.dispatch(setFiltro(filtro));
        const options = { filter: filtro, orderby: "PeriodoPresentacion desc" };
        store.dispatch(getPresentacionesCabecera(options));

        this.cerrar();
    }

    maxLength(e) {
        const valor = e.currentTarget;
        const largo = valor.getAttribute("maxlength");
        if (valor.value.length > largo) {
            valor.value = valor.value.slice(0, largo);
        }
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["presentacionesCabecera"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                const estados = this.shadowRoot.querySelector("#estados");
            }
            this.update();
        }

        if (name == ESTADOS) {
            this.estados = state.presentacionesEstados.entities;
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
            estado: {
                type: Number,
                reflect: true,
                value: 0,
            },
            isOpen: {
                type: Boolean,
                reflect: true,
                value: false,
            },
        };
    }
}
window.customElements.define("filtros-presentaciones", filtrosPresentaciones);
