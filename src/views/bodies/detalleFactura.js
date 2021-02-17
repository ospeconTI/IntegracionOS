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
import { get as getFacturas, rechazar, aprobar } from "../../redux/facturasPrestadores/actions";
import { SEARCH } from "../../../assets/icons/svgs";
import { goHistoryPrev } from "../../redux/routing/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURA = "facturasPrestadores.selectedTimeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";
const COMPROBANTES = "tipoComprobantes.timeStamp"

const APROBADO = "facturasPrestadores.aprobarTimeStamp";
const RECHAZADO = "facturasPrestadores.rechazarTimeStamp";


export class detalleFactura extends connect(store, FACTURA, MEDIA_CHANGE, SCREEN, ESTADOS, COMPROBANTES, APROBADO, RECHAZADO)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, "0");
        this.factura = null;
        this.comprobantes = [];
        this.estados = [];
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
        if (this.factura){
            return html`
               
                <div class="grid column ">
                    <div class="grid row start">
                        <div>
                           Número de Orden: ${this.factura.Id}
                        </div>
                        <div>
                            Expediente: ${this.factura.Expediente_Bono.Expediente}
                        </div>
                        <div>
                            Prestación: ${this.factura.Expediente_Bono.Cabecera.Detalle.SSS_Prestaciones.Descripcion}
                        </div>
                        <div>
                            Periodo:  ${this.factura.Expediente_Bono.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}
                        </div>
                        <div class="grid row">
                            <div class="grid column">
                                <div>
                                    Integración: <span>${this.factura.Expediente_Bono.Cabecera.Evento==4?"SI":"NO"}</span>
                                </div>
                                <div>
                                    Dependencia: ${this.factura.Expediente_Bono.Cabecera.Detalle.Dependencia=="N"?"NO":"SI"}
                                </div>
                            </div>
                        </div>
                        <div>
                            Beneficiario: ${this.factura.Expediente_Bono.Cabecera.Nombre}
                        </div>
                        <div>
                            Prestador: ${this.factura.prestado.nombre + " - " + this.factura.IdPrestador}
                        </div>

                        <div class="grid column fit">
                            <div class="select">
                                <label>Tipo</label>
                                <select id="tipo" .value=${this.factura.IdTipoComprobante}>
                                    ${this.comprobantes.map((c) => {
                                        return html`<option ?selected=${this.factura.IdTipoComprobante === c.Id} value="${c.Id}">${c.Nombre}</option>`;
                                    })}
                                </select>
                            </div>
                            <div class="input">
                                <label>Punto de venta</label>
                                <input type="number" id="sucursal" autocomplete="off" maxlength="5" @input=${this.maxLength} .value="${this.factura.PuntoVenta}" />
                            </div>
                            <div class="input">
                                <label>Número</label>
                                <input type="number" id="numero" autocomplete="off" maxlength="8" @input=${this.maxLength} .value="${this.factura.NroComprobante}" />
                            </div>
                        </div>


                        <div class="grid fit">
                            <div class="input">
                                <label>Fecha</label>
                                <input type="date" id="fecha" .value="${this.factura.Fecha.substr(0, 10)}" />
                            </div>
                        </div>

                        <div class="grid column">
                            <div class="input">
                                <label>Cantidad</label>
                                <input type="number" id="cantidad" step="1" placeholder="0" autocomplete="off" .value="${this.factura.Cantidad}" />
                            </div>
                            <div>
                                Cantidad Autorizada: ${this.factura.Expediente_Bono.Cabecera.Detalle.Cantidad}
                            </div>

                        </div>
                        <div class="grid column">
                            <div class="input">
                                    <label>Importe</label>
                                    <input type="number" id="importe" step=".01" placeholder="0,00" autocomplete="off" .value="${this.factura.Importe}" />
                            </div>
                      
                            <div>
                                Importe Autorizado: ${this.factura.Expediente_Bono.Cabecera.Detalle.Importe}
                            </div>

                        </div>

                        <div class="grid fit">
                            <div class="input">
                                <label>C.A.E.</label>
                                <input type="text" id="cae" autocomplete="off" maxlength="14" @input=${this.maxLength} .value="${this.factura.CAE}" />
                            </div>
                            <div class="input">
                                <label>Vencimiento C.A.E.</label>
                                <input type="date" id="vtoCae" autocomplete="off" .value="${this.factura.VtoCAE.substr(0, 10)}" />
                            </div>
                        </div>

                        <div class="grid column">
                            <button btn1 id="aprobar" @click="${this.aprobar}">Aprobar</button>
                            <button btn1 id="rechazar" @click="${this.rechazar}" >Rechazar</button>
                            <button btn1 id="volver"  @click="${this.volver}">Volver</button>

                        </div>
                    </div>


                    <div class="grid row  align-self-stretch justify-self-stretch">
                        <iframe id="imagenes" type="application/pdf" style="border:none;height:100%;width:100%" src="${this.factura.FacturasPrestadoresImagenes.find(a=>a.Documentacion.Id==7)?this.factura.FacturasPrestadoresImagenes.find(a=>a.Documentacion.Id==7).Url:""}">
                        
                        </iframe>
                        
                    </div>
                
                </div>
               

            `;
        }
        
    }



    aprobar(e){
       
        store.dispatch(aprobar({ Id: this.factura.Id, IdFacturasPrestadoresEstado: 3 }))

    }

    rechazar(e){
       
        store.dispatch(rechazar({ Id: this.factura.Id, IdFacturasPrestadoresEstado: 7 }))
    }
    volver(e){
        store.dispatch(goHistoryPrev())
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
            const isCurrentScreen = ["detalleFactura"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                
            }
            this.update();
        }

        if (name==FACTURA){
            this.factura = state.facturasPrestadores.selected
            this.update()
        }

        if (name==ESTADOS){
            this.estados = state.facturasPrestadoresEstados.entities
            this.update()
        }

        if (name==COMPROBANTES){
            this.comprobantes = state.tipoComprobantes.entities
            this.update()
        }

        if (name==APROBADO|| name == RECHAZADO){
            this.volver()
        }



    }

    buscar(e) {
        this.periodoActual = this.shadowRoot.querySelector("#search").value;
        const estado = this.shadowRoot.querySelector("#estados");
        const filterEstado = estado.value == -1 ? "" : " and IdFacturasPrestadoresEstado eq " + estado.value;
        store.dispatch(
            getFacturas({
                expand: "SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
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
window.customElements.define("detalle-factura", detalleFactura);
