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
import { SEARCH } from "../../../assets/icons/svgs";
import { filtrosFacturas } from "../componentes/filtrosFacturas";
import { goTo } from "../../redux/routing/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURAS = "facturasPrestadores.timeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";
const FILTROTS = "filtro.timeStamp";

export class aprobacionFacturas extends connect(store, FACTURAS, MEDIA_CHANGE, SCREEN, ESTADOS, FACTURAS, FILTROTS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];

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
                font-size: 0.7rem;
                font-weight: bold;
            }

            .datos {
                background-color: white;
                color: var(--color-azul-oscuro);
                font-size: 0.7rem;
                cursor: pointer;
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
                height: 75vh;
            }
            .contenedor {
                background-color: var(--color-crudo);
            }
            .bordeRow {
                border-bottom: 1px solid var(--color-gris-claro);
                gap: 0.3rem;
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
                    <div class="grid fit6 cabecera itemsCenter">
                        <div class="ordena" @click=${this.ordenar} .orden="${"Id"}">Orden</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FechaIngreso"}">Ingreso</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacturasPrestadores.Expediente_Bono.Expediente"}">Expte</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacturasPrestadores.Expediente_Bono.Cabecera.Hiscli"}">Documento</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FacturasPrestadores.Expediente_Bono.Cabecera.Nombre"}">Nombre</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"cuit"}">CUIT</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"IdPrestador"}">Prestador</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"facturasPrestadores.prestado.nombre"}">Nombre Prestador</div>
                        <div>Integracion</div>
                        <div>Comprobante</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"facturasPrestadores.Expediente_Bono.Periodo"}">Periodo</div>
                        <div>Importe</div>
                    </div>
                    <div class=" rows">
                        ${this.facturas.map((item) => {
                            return html`
                                <div class="inner-grid fit6 datos itemsCenter bordeRow" .item="${item}" @click="${this.seleccionar}">
                                    <div>${item.Id}</div>
                                    <div>${item.FechaIngreso ? new Date(item.FechaIngreso).toLocaleDateString() : ""}</div>
                                    <div>${item.Expediente_Bono.Expediente}</div>
                                    <div>${item.Expediente_Bono.Cabecera.Hiscli}</div>
                                    <div>${item.Expediente_Bono.Cabecera.Nombre}</div>
                                    <div>${item.prestado.Cuit}</div>
                                    <div>${item.IdPrestador}</div>
                                    <div>${item.prestado.nombre}</div>
                                    <div>${item.Expediente_Bono.Cabecera.Evento == 4 ? "SI" : "NO"}</div>
                                    <div>${item.SSS_TipoComprobantes.Nombre + " " + item.PuntoVenta.toString().padStart(4, "0") + "-" + item.NroComprobante.toString().padStart(8, "0")}</div>
                                    <div>${item.Expediente_Bono.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>
                                    <div>${item.Importe}</div>
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
                    "prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
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
                        "prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
                    filter: state.filtro.value,
                    orderby: " Id ",
                    count: true,
                })
            );
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
