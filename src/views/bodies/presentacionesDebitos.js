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
import { get as getPresentacionesDebitos } from "../../redux/presentacionesDebitos/actions";
import { PERSON, SEARCH, DOWNLOAD, UPLOAD, TILDE } from "../../../assets/icons/svgs";
import { filtrosFacturasHistoricas } from "../componentes/filtrosFacturasHistoricas";
import { goTo } from "../../redux/routing/actions";
import { set as setFiltro } from "../../redux/filtro/actions";
import { COPY, ADD, MODIF, DELETE, DETALLE } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PRESENTACIONES_DEB = "presentacionesDebitos.getTimeStamp";
const FILTROTS = "filtro.timeStamp";
//const MY_NET = "notifications.myNetTimeStamp";
//const MESSAGE = "notifications.singleMessageTimeStamp";

export class presentacionesDebitos extends connect(store, PRESENTACIONES_DEB, MEDIA_CHANGE, SCREEN, FILTROTS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.myNet = [];
        this.messages = [];
        this.items = [];
        this.order = "";

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
                background-color: white;
                color: var(--color-azul-oscuro);
                fill: var(--color-azul-oscuro);
                stroke: var(--color-azul-oscuro);
                font-size: 0.7rem;
                font-weight: bold;
                align-items: end;
            }

            .datos {
                position: relative;
                background-color: white;
                color: var(--color-azul-oscuro);
                font-size: 0.7rem;
                cursor: pointer;
                min-height: 1.6rem;
            }
            .datos:hover {
                background-color: var(--color-gris-claro);
            }
            .ordena {
                cursor: pointer;
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

            .rows {
                overflow-y: auto;
                height: 50vh;
                gap: 0.3rem;
                align-content: flex-start;
                box-sizing: content-box;
            }

            .contenedor {
                background-color: var(--color-crudo);
            }
            .bordeRow {
                border-bottom: 1px solid var(--color-gris-claro);
                gap: 0.5rem;
            }

            .columnas {
                grid-template-columns: 2fr 1fr 2fr 2fr 2fr 2fr 2fr 8fr 8fr 0.5fr 0.5fr;
                padding: 0.3rem !important;
            }

            svg {
                height: 1.3rem;
                width: 1.3rem;
            }

            div[dirty] {
                color: var(--color-gris);
            }

            .botonera {
                grid-auto-flow: column;
                display: grid;
                justify-content: right;
            }
        `;
    }
    render() {
        if (this.items) {
            return html`
                <div class="grid row contenedor">
                    <div class="grid column ">
                        <button btn3 class="justify-self-start" id="showfiltros" @click="${this.mostrarFiltros}">${SEARCH}</button>
                        <div class="sublabel justify-self-end">Cantidad:${this.items.length}</div>
                    </div>
                    <filtros-presentaciones class="grid row start " id="filtros" hidden estado="2"></filtros-presentaciones>
                    <div class="grid columnas cabecera">
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacNro"}">Comprobante</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FechaEmision"}">Fecha Emision</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"CUITPrestador"}">CUIT Prestador</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"PeriodoPrestacion"}">Periodo Prestacion</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"ImporteComprobante"}">Importe Comprobante</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"ImporteSolicitado"}">Importe Solicitado</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"ImporteSubsidiado"}">Importe Subsidiado</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"Practica"}">Practica</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"AfiNombre"}">Afiliado</div>
                        <div class="ordena">ND</div>
                        <div class="ordena">NC</div>
                    </div>
                    <div class="inner-grid  rows">
                        ${this.items.map((item) => {
                            return html`
                                <div class="inner-grid columnas datos bordeRow" .item="${item}" ?dirty="${this.messages.find((e) => e.Document == item.Id)}">
                                    <div>${item.FacNro}</div>
                                    <div>${new Date(item.FechaEmision).toLocaleDateString()}</div>
                                    <div>${item.CUITPrestador}</div>
                                    <div>${item.PeriodoPrestacion}</div>
                                    <div>${item.ImporteComprobante}</div>
                                    <div>${item.ImporteSolicitado}</div>
                                    <div>${item.ImporteSubsidiado}</div>
                                    <div>${item.Practica}</div>
                                    <div>${item.Hiscli + " - " + item.AfiNombre}</div>
                                    <div>${TILDE}</div>
                                    <div>${item.Credito == "S" ? TILDE : ""}</div>
                                </div>
                            `;
                        })}
                    </div>
                    <div class="grid column center">
                        <button btn3 class="button" @click="${this.agregar}" title="nueva presentacion">${ADD} Nueva</button>
                    </div>
                </div>
                <filtros-facturashistoricas class="busqueda" id="filtroFacturasHistoricas"></filtros-facturashistoricas>
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }

    aplicar(e) {}
    generar(e) {
        this.shadowRoot.querySelectorAll("filtroFacturasHistoricas").Mostrar = true;
    }
    detalle(e) {
        //store.dispatch(getResumenPresentacion(e.currentTarget.item.Id));
        //store.dispatch(goTo("detallePresentacion"));
    }
    debitos(e) {
        //var debitosFiltros = { IdPresentacion: e.currentTarget.item.Id };
        //store.dispatch(getPresentacionesDebitos(debitosFiltros));
        //store.dispatch(getResumenPresentacion(e.currentTarget.item.Id));
        //store.dispatch(goTo("detallePresentacion"));
    }
    delete(e) {
        //store.dispatch(setSelected(e.currentTarget.item));
        //store.dispatch(setTipoAccion("D"));
    }

    modif(e) {
        //store.dispatch(setSelected(e.currentTarget.item));
        //store.dispatch(setTipoAccion("M"));
    }

    agregar(e) {
        this.shadowRoot.querySelector("#filtroFacturasHistoricas").Mostrar = true;
        // const itemVacio = {
        //     Activo: false,
        //     FechaPresentacion: "",
        //     FechaUpdate: "",
        //     Id: 0,
        //     IdEstadoPresentacionSSS: 0,
        //     PeriodoDesde: 0,
        //     PeriodoHasta: 0,
        //     PeriodoPresentacion: 0,
        //     UsuarioUpdate: "",
        // };
        //store.dispatch(setSelected(itemVacio));
        //store.dispatch(setTipoAccion("A"));
    }

    mostrarFiltros() {
        this.shadowRoot.querySelector("#filtros").isOpen = true;
    }

    ordenar(e) {
        this.order = this.order == "" ? "desc" : "";
        store.dispatch(
            getPresentacionesCabecera({
                top: 100,
                orderby: e.currentTarget.orden + " " + this.order,
                filter: "Activo",
                count: true,
            })
        );
        this.update();
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
            const isCurrentScreen = ["presentacionesDebitos"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
            this.update();
        }
        if (name == PRESENTACIONES_DEB) {
            this.items = state.presentacionesDebitos.entities;
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
window.customElements.define("presentaciones-debitos", presentacionesDebitos);
