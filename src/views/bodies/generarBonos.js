import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { select } from "../css/select";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { get as getFacturas, limpiar } from "../../redux/facturasPrestadores/actions";
import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const LISTARPERIODOSBONOS = "periodosBono.listaTimeStamp";

export class generarBonos extends connect(store, FACTURAS, MEDIA_CHANGE, SCREEN, LISTARPERIODOSBONOS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, "0");
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
        `;
    }
    render() {
        if (this.facturas) {
            return html`
                <div class="grid row">
                    <div class="grid column start">
                        <div class="select">
                            <label>Período</label>
                            <select id="periodo">
                                ${this.periodos.map((periodo) => {
                                    return html` <option value=${periodo}>${periodo}</option> `;
                                })}
                            </select>
                        </div>
                        <button btn1 @click="${this.buscar}">Ver</button>
                    </div>
                    <div class="grid column start">
                        <!-- <div class="grid column start">
                        <div class="input">
                            <label>Busqueda por Expediente</label>
                            <input type="text" id="search" autocomplete="off" />
                        </div>
                        <button btn3 @click="${this.filtrar}">${SEARCH}</button>
                    </div> -->

                        <d class="grid">
                            ${this.facturas.map((item) => {
                                return html`
                                    <div class="grid row tarjeta">
                                        <div class="grid column start">
                                            <div>Expediente:</div>
                                            <div class="primaryColorInvert">${item.Expediente_Bono.Expediente}</div>
                                            <div>Factura:</div>
                                            <div class="primaryColorInvert">
                                                ${item.SSS_TipoComprobantes.Nombre + " " + item.PuntoVenta.toString().padStart(4, "0") + "-" + item.NroComprobante.toString().padStart(8, "0")}
                                            </div>
                                            <div class="primaryColor">${item.TipoComplementaria == "C" ? "COMPLEMENTARIA" : ""}</div>
                                        </div>
                                        <div class="sublabel">Beneficiario: ${item.Expediente_Bono.Cabecera.Nombre + " DNI " + item.Expediente_Bono.Cabecera.Hiscli}</div>
                                        <div class="sublabel">Prestación:${item.Expediente_Bono.Cabecera.Detalle.SSS_Prestaciones.Descripcion + "  Cantidad: " + item.Cantidad}</div>
                                        <div class="sublabel">Fecha:${new Date(item.Fecha).toLocaleDateString()}</div>
                                        <div class="sublabel">Perído:${item.Expediente_Bono.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>
                                        <div class="sublabel">Importe:${item.Importe}</div>
                                        <div class="sublabel">
                                            Estado:${item.FacturasPrestadoresEstados.Descripcion + (item.FacturasPrestadoresRechazos ? "-" + item.FacturasPrestadoresRechazos.Descripcion : "")}
                                        </div>

                                        ${item.FacturasPrestadoresImagenes.map((imagen) => {
                                            return html` <div><a href="${imagen.Url}" target="_blank">${imagen.Documentacion.Descripcion}</a></div> `;
                                        })}
                                    </div>
                                `;
                            })}
                        </d>
                    </div>
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
            const isCurrentScreen = ["generarBonos"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                store.dispatch(limpiar());
            }
            this.update();
        }
        if (name == LISTARPERIODOSBONOS) {
            this.periodos = state.periodosBonos.entities;
            this.update();
        }
    }

    buscar(e) {
        this.periodoActual = this.shadowRoot.querySelector("#search").value;
        const estado = this.shadowRoot.querySelector("#estados");
        const filterEstado = estado.value == -1 ? "" : " and IdFacturasPrestadoresEstado eq " + estado.value;
        store.dispatch(
            getFacturas({
                expand: "FacturasPrestadoresRechazos,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
                filter: "IdPrestador eq " + store.getState().prestador.numero + " and Expediente_Bono/Periodo eq " + this.periodoActual + filterEstado,
                orderby: "NroComprobante desc",
            })
        );
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
window.customElements.define("generar-bonos", generarBonos);
