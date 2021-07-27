/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { select } from "../css/select";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { get as getPresentacionesCabecera, setSelected, setTipoAccion } from "../../redux/presentacionesCabecera/actions";
import { PERSON, SEARCH } from "../../../assets/icons/svgs";
import { filtrosPresentaciones } from "../componentes/filtrosPresentaciones";
import { goTo } from "../../redux/routing/actions";
import { set as setFiltro } from "../../redux/filtro/actions";
import { COPY, ADD, MODIF, DELETE, DETALLE } from "../../../assets/icons/svgs";
import { formularioPresentaciones } from "./formularioPresentaciones";
import { getResumen } from "../../redux/presentacionesErrores/actions";
import { getByError } from "../../redux/facturasPrestadores/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PRESENTACIONES_CAB = "presentacionesCabecera.timeStamp";
const RESUMEN = "presentacionesErrores.timeStamp";
const FACTURAS = "facturasPrestadores.entitiesWithErrorTimeStamp";

export class enProceso extends connect(store, PRESENTACIONES_CAB, MEDIA_CHANGE, SCREEN, RESUMEN, FACTURAS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.item = [];
        this.alertas = [];
        this.facturas = [];
        this.selectedError = "";
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
                padding: 1vw;
            }
            :host([media-size="small"]) {
                padding: 0 !important;
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

            filtros-presentaciones {
                position: fixed;
                top: 0px;
                width: 30%;
                height: 100vh;
                z-index: 1000;
                background-color: white;
                left: -100%;
                transition: all 0.5s ease 0s;
            }

            filtros-presentaciones[isOpen] {
                left: 0;
            }

            .contenedor {
                display: grid;
                grid-gap: 0.3rem;

                grid-template-areas:
                    "presentacion presentacion presentacion"
                    "alertas facturas facturas";

                grid-template-rows: auto 75vh;
                grid-template-columns: 1fr 2fr 2fr;
            }
            :host([media-size="small"]) .contenedor {
                grid-template-areas:
                    "presentacion"
                    "alertas"
                    "facturas";
                grid-template-rows: 1fr;
                grid-template-columns: auto auto 1fr;
                grid-gap: 0;
                row-gap: 0.5rem;
            }

            .presentacion {
                background-color: var(--color-crudo);
                display: grid;
                grid-area: presentacion;
            }
            .alertas {
                grid-area: alertas;
            }
            .facturas {
                grid-area: facturas;
            }
            .area {
                padding: 0.5rem;
                background-color: var(--color-crudo);
                display: grid;
                align-content: start;
            }

            .etiqueta div {
                font-weight: bold;
            }
            .etiqueta div:first-child {
                color: var(--color-gris-medio);
            }
            .underlined {
                border-bottom: 1px solid var(--color-gris-claro);
                padding: 0.5rem 0 !important;
            }
            .rows {
                display: grid;
                overflow-y: auto;
                align-content: start;
            }
        `;
    }
    render() {
        if (this.item) {
            return html`
                <div class="contenedor">
                    <filtros-presentaciones class="grid row start " id="filtros" hidden estado="2"></filtros-presentaciones>

                    <div class="grid column presentacion">
                        <div class="inner-grid column start etiqueta">
                            <div>Periodo Presentación:</div>
                            <div>${this.item.PeriodoPresentacion}</div>
                        </div>
                        <div class="inner-grid column start etiqueta">
                            <div>Para Facturas entre:</div>
                            <div>${this.item.PeriodoDesde} y ${this.item.PeriodoHasta}</div>
                        </div>
                    </div>
                    <div class="alertas area">
                        <div class="grid column start etiqueta">
                            <div>Resumen de Alertas</div>
                            <div></div>
                        </div>

                        <div class="rows">
                            ${this.alertas.map((item) => {
                                return html`
                                    <div class="inner-grid column start underlined">
                                        <button btn3 .item="${item}" @click="${this.getFacturas}">${item.Cantidad}</button>
                                        <div>${item.Descripcion}</div>
                                    </div>
                                `;
                            })}
                        </div>
                    </div>
                    <div class="facturas area">
                        <div class="grid column start etiqueta">
                            <div>Facturas con Alerta</div>
                            <div>${this.selectedError}</div>
                        </div>

                        <div class="inner-grid column underlined">
                            <div>Orden</div>
                            <div>PuntoVenta</div>
                            <div>NroComprobante</div>
                        </div>

                        <div class="rows">
                            ${this.facturas.map((item) => {
                                return html`
                                    <div class="inner-grid column underlined">
                                        <div>${item.Id}</div>
                                        <div>${item.PuntoVenta}</div>
                                        <div>${item.NroComprobante}</div>
                                    </div>
                                `;
                            })}
                        </div>
                    </div>
                </div>
                <formulario-presentaciones class="body" id="formularioPresentacion" hidden></formulario-presentaciones>
            `;
        } else {
            return html`<h3>No hay Presentaciones en proceso</h3>`;
        }
    }

    getFacturas(e) {
        store.dispatch(getByError(e.currentTarget.item));
    }

    mostrarFiltros() {
        this.shadowRoot.querySelector("#filtros").isOpen = true;
    }

    filtrar(e) {
        const filtros = this.shadowRoot.querySelector("#filtros");
        filtros.hidden = false;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["enProceso"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
            this.update();
        }
        if (name == PRESENTACIONES_CAB) {
            this.item = state.presentacionesCabecera.entities[0];
            this.update();
        }
        if (name == RESUMEN) {
            this.alertas = state.presentacionesErrores.entities;
            this.update();
        }
        if (name == FACTURAS) {
            this.facturas = state.facturasPrestadores.entitiesWithError;
            this.selectedError = state.facturasPrestadores.selectedError.Descripcion;
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
window.customElements.define("en-proceso", enProceso);
