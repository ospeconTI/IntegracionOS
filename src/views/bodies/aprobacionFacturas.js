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
import { get as getFacturas, setSelected } from "../../redux/facturasPrestadores/actions";
import { PERSON, SEARCH } from "../../../assets/icons/svgs";
import { filtrosFacturas } from "../componentes/filtrosFacturas";
import { goTo } from "../../redux/routing/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURAS = "facturasPrestadores.timeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";
const FILTROTS = "filtro.timeStamp";
const MY_NET = "notifications.myNetTimeStamp";
const MESSAGE = "notifications.singleMessageTimeStamp";

export class aprobacionFacturas extends connect(store, FACTURAS, MEDIA_CHANGE, SCREEN, ESTADOS, FACTURAS, FILTROTS, MY_NET, MESSAGE)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.myNet = [];
        this.messages = [];

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

            filtros-facturas {
                position: fixed;
                top: 0px;
                width: 30%;
                height: 100vh;
                z-index: 1000;
                background-color: white;
                left: -100%;
                transition: all 0.5s ease 0s;
            }

            filtros-facturas[isOpen] {
                left: 0;
            }

            .rows {
                overflow-y: auto;
                height: 68vh;
                gap: 0.3rem;
                align-content: flex-start;
                box-sizing: content-box;
            }

            .contenedor {
                background-color: var(--color-crudo);
            }
            .bordeRow {
                border-bottom: 1px solid var(--color-gris-claro);
                gap: 0.3rem;
            }

            .columnas {
                grid-template-columns: 0.5fr 0.5fr 1fr 1fr 1fr 3fr 1fr 4fr 0.5fr 0.5fr 2fr 0.8fr 1fr;
                padding: 0.3rem !important;
            }
            .myNet {
                display: grid;
                gap: -0.2rem;
                grid-auto-flow: column;
                align-items: center;
                justify-items: start;
                overflow-x: hidden;
            }
            .myNetNode {
                place-content: center;
                border-radius: 50%;
                width: 1rem;
                height: 1rem;
                border: 2px solid var(--primary-color);
                font-size: 0.5rem;
            }

            svg {
                height: 1.3rem;
                width: 1.3rem;
            }

            div[dirty] {
                color: var(--color-gris);
            }
        `;
    }
    render() {
        if (this.facturas) {
            return html`
                <div class="grid row contenedor">
                    <div class="grid column ">
                        <button btn3 class="justify-self-start" id="showfiltros" @click="${this.mostrarFiltros}">${SEARCH}</button>
                        <div class="sublabel justify-self-end">Cantidad:${this.facturas.__odataCount}</div>
                    </div>
                    <filtros-facturas class="grid row start " id="filtros" hidden estado="2"></filtros-facturas>
                    <div class="grid columnas cabecera">
                        <div class="ordena">${PERSON}</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"Id"}">Orden</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FechaIngreso"}">Ingreso</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacturasPrestadores.Expediente_Bono.Expediente"}">Expte</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacturasPrestadores.Expediente_Bono.Cabecera.Hiscli"}">Documento</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacturasPrestadores.Expediente_Bono.Cabecera.Nombre"}">Nombre</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"cuit"}">CUIT</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"facturasPrestadores.prestado.nombre"}">Nombre Prestador</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"IdPrestador"}">Prestador</div>

                        <div class="justify-self-center">Int</div>
                        <div>Comprobante</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"facturasPrestadores.Expediente_Bono.Periodo"}">Periodo</div>
                        <div class="justify-self-end">Importe</div>
                    </div>
                    <div class="inner-grid  rows">
                        ${this.facturas.map((item) => {
                            return html`
                                <div class="inner-grid columnas datos bordeRow" .item="${item}" @click="${this.seleccionar}" ?dirty="${this.messages.find((e) => e.Document == item.Id)}">
                                    <div class="myNet">
                                        ${this.myNet
                                            .filter((el) => {
                                                return el.State.find((e) => e.Document == item.Id);
                                            })
                                            .map((el) => {
                                                return html`<div class="myNetNode inner-grid">${el.Name}</div>`;
                                            })}
                                    </div>
                                    <div>${item.Id}</div>
                                    <div>${item.FechaIngreso ? new Date(item.FechaIngreso).toLocaleDateString() : ""}</div>
                                    <div>${item.Expediente_Bono.Expediente}</div>
                                    <div>${item.Expediente_Bono.Cabecera.Hiscli}</div>
                                    <div>${item.Expediente_Bono.Cabecera.Nombre}</div>
                                    <div>${item.prestado.Cuit}</div>
                                    <div>${item.prestado.nombre}</div>
                                    <div>${item.IdPrestador}</div>

                                    <div class="justify-self-center">${item.Expediente_Bono.Cabecera.Evento == 4 ? "SI" : "NO"}</div>
                                    <div>
                                        ${item.SSS_TipoComprobantes.Nombre.replace("FACTURA", "FC ").replace("RECIBO", "RC ") +
                                        " " +
                                        item.PuntoVenta.toString().padStart(4, "0") +
                                        "-" +
                                        item.NroComprobante.toString().padStart(8, "0")}
                                    </div>
                                    <div>${item.Expediente_Bono.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>
                                    <div class="justify-self-end">${item.Importe}</div>
                                </div>
                            `;
                        })}
                    </div>
                </div>
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }

    mostrarFiltros() {
        this.shadowRoot.querySelector("#filtros").isOpen = true;
    }

    seleccionar(e) {
        store.dispatch(setSelected(e.currentTarget.item));
        store.dispatch(goTo("detalleFactura"));
    }

    ordenar(e) {
        store.dispatch(
            getFacturas({
                top: 100,
                expand:
                    "FacturasPrestadoresRechazos,prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
                filter: store.getState().filtro.value, // "IdFacturasPrestadoresEstado eq 2",
                orderby: e.currentTarget.orden,
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
            const isCurrentScreen = ["aprobacionFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;

                /*  let filtro = "IdFacturasPrestadoresEstado eq " + ESTADO_FACTURA_PRESENTADA;
                store.dispatch(setFiltro(filtro)); */
            }
            this.update();
        }
        if (name == FACTURAS) {
            this.facturas = state.facturasPrestadores.entities;
            this.update();
        }

        if (name == ESTADOS) {
            this.estados = state.facturasPrestadoresEstados.entities;
        }

        if (name == FILTROTS) {
            store.dispatch(
                getFacturas({
                    top: 100,
                    expand:
                        "FacturasPrestadoresRechazos,prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
                    filter: state.filtro.value,
                    orderby: " Id ",
                    count: true,
                })
            );
        }
        if (name == MY_NET) {
            this.myNet = state.notifications.myNet.filter((item) => {
                return item.Id != state.notifications.myNetId;
            });
            this.update();
        }
        if (name == MESSAGE) {
            this.messages.push(state.notifications.singleMessage);
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
window.customElements.define("aprobacion-facturas", aprobacionFacturas);
