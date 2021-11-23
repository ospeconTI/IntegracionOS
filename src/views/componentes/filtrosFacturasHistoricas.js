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
import { get as getFacturas } from "../../redux/facturasPrestadores/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const COMPROBANTES = "tipoComprobantes.timeStamp";
const PERIODOS = "periodosMensuales.listaTimeStamp";
const PERIODOSMES = "periodosMensuales.timeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";
//const SETFILTRO = "filtro.timeStamp"

export class filtrosFacturasHistoricas extends connect(store, MEDIA_CHANGE, SCREEN, PERIODOS, PERIODOSMES, COMPROBANTES, ESTADOS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes = [];
        this.periodos = [];
        this.estados = [];
        this.periodoActual = null;
        this.Mostrar = false;
        this.items = [];
        this.isOpen = true;
        this.hidden = false;
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
                top: 0;
                left: 0;
                display: none;
                justify-items: center;
                align-items: center;
                position: absolute;
                height: 100%;
                width: 100%;
                z-index: 1000;
                background-color: rgba(0, 0, 0, 0.6);
            }

            :host([Mostrar]) {
                display: grid;
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
            .form {
                display: grid;
                grid-auto-flow: row;
                background-color: white;
                box-shadow: var(--shadow-elevation-6-box);
                color: black;
                padding: 1.5rem;
                border-radius: 5px;
                grid-gap: 1rem;
                width: 80rem;
            }
            .columnas {
                grid-template-columns: 2fr 1fr 2fr 2fr 2fr 2fr 2fr 8fr 8fr;
                padding: 0.3rem !important;
            }
            .rows {
                overflow-y: auto;
                height: 50vh;
                gap: 0.3rem;
                align-content: flex-start;
                box-sizing: content-box;
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
        `;
    }
    render() {
        return html`
            <div class="form" style="grid-gap:0">
                <div>
                    <div class="grid column">
                        <div class="grid column">
                            <div class="input">
                                <label>DNI</label>
                                <input type="number" id="hiscli" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                            </div>
                            <div class="input">
                                <label>Expte</label>
                                <input type="number" id="expediente" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                            </div>
                            <prestadores-component id="prestador"></prestadores-component>
                        </div>
                        <div class="grid column">
                            <div class="select">
                                <label>Tipo</label>
                                <select id="tipo">
                                    <option value="-1" selected>Todos</option>
                                    ${this.tipoComprobantes.map((c) => {
                                        return html`<option value="${c.Id}">${c.Nombre}</option>`;
                                    })}
                                </select>
                            </div>
                            <div class="input">
                                <label>Punto de venta</label>
                                <input type="number" id="sucursal" autocomplete="off" maxlength="4" @input=${this.maxLength} />
                            </div>
                            <div class="input">
                                <label>Número</label>
                                <input type="number" id="numero" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                            </div>
                        </div>
                        <div class="grid column">
                            <button btn3 @click="${this.limpiar}">Limpiar Filtros</button>
                            <button btn1 @click="${this.buscar}">Buscar</button>
                            <button btn1 @click="${this.cerrar}">Cerrar</button>
                        </div>
                    </div>
                </div>
                <div>
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
                                </div>
                            `;
                        })}
                    </div>
                </div>
            </div>
        `;
    }

    cerrar() {
        this.Mostrar = false;
        this.update();
    }

    limpiar() {
        const orden = this.shadowRoot.querySelector("#orden");
        const expediente = this.shadowRoot.querySelector("#expediente");
        const hiscli = this.shadowRoot.querySelector("#hiscli");
        const periodo = this.shadowRoot.querySelector("#periodo");
        const tipo = this.shadowRoot.querySelector("#tipo");
        const sucursal = this.shadowRoot.querySelector("#sucursal");
        const numero = this.shadowRoot.querySelector("#numero");
        const estados = this.shadowRoot.querySelector("#estados");
        const prestador = this.shadowRoot.querySelector("#prestador");
        const integracion = this.shadowRoot.querySelector("#esIntegracion");
        const cuit = this.shadowRoot.querySelector("#cuit");

        orden.value = "";
        hiscli.value = "";
        expediente.value = "";
        periodo.value = -1;
        tipo.value = -1;
        sucursal.value = "";
        numero.value = "";
        estados.value = this.estado;
        prestador.value = "";
        integracion.value = -1;
        cuit.value = "";

        let filtro = "";

        if (periodo.value != -1) {
            filtro += "Expediente_Bono/Periodo eq " + periodo.value + " and ";
        }

        if (orden.value != 0 && orden.value != "") {
            filtro += "Expediente_Bono/Id eq " + orden.value + " and ";
        }

        if (expediente.value != 0 && expediente.value != "") {
            filtro += "Expediente_Bono/Expediente eq " + expediente.value + " and ";
        }

        if (prestador.value && prestador.value != "") {
            filtro += "IdPrestador eq " + prestador.value + " and ";
        }

        if (tipo.value != -1) {
            filtro += "IdTipoComprobante eq " + tipo.value + " and ";
        }

        if (sucursal.value != 0) {
            filtro += "PuntoVenta eq " + sucursal.value + " and ";
        }

        if (numero.value != 0) {
            filtro += " NroComprobante eq " + numero.value + " and ";
        }

        if (estados.value != -1) {
            filtro += " IdFacturasPrestadoresEstado eq " + estados.value + " and ";
        }

        if (integracion != -1) {
            filtro += "Expediente_Bono/Cabecera/Evento eq " + integracion.value + " and ";
        }

        filtro = filtro.slice(0, -5);
        //store.dispatch(setFiltro(filtro));

        this.update();
    }
    buscar(e) {
        const hiscli = this.shadowRoot.querySelector("#hiscli").value;
        const expediente = this.shadowRoot.querySelector("#expediente").value;
        const prestador = this.shadowRoot.querySelector("#prestador");
        const tipo = this.shadowRoot.querySelector("#tipo").value;
        const sucursal = this.shadowRoot.querySelector("#sucursal").value;
        const numero = this.shadowRoot.querySelector("#numero").value;

        let filtro = "";

        if (expediente != 0 && expediente != "") {
            filtro += "Expediente_Bono/Expediente eq " + expediente + " and ";
        }

        if (hiscli != 0 && hiscli != "") {
            filtro += "Expediente_Bono/Cabecera/Hiscli eq " + hiscli + " and ";
        }

        if (prestador.value && prestador.value != "") {
            filtro += "IdPrestador eq " + prestador.value + " and ";
        }

        if (tipo != -1) {
            filtro += "IdTipoComprobante eq " + tipo + " and ";
        }

        if (sucursal != 0) {
            filtro += "PuntoVenta eq " + sucursal + " and ";
        }

        if (numero != 0) {
            filtro += " NroComprobante eq " + numero + " and ";
        }

        filtro = filtro.slice(0, -5);

        store.dispatch(setFiltro(filtro));
        this.cerrar();
        /*  store.dispatch(getFacturas({
            expand: "prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
            filter: filtro , 
            orderby: "NroComprobante desc"}))     */
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
            const isCurrentScreen = ["presentacionesDebitos"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                const estados = this.shadowRoot.querySelector("#estados");
            }
            this.update();
        }

        if (name == ESTADOS) {
            this.estados = state.facturasPrestadoresEstados.entities;

            this.update();
        }

        if (name == COMPROBANTES) {
            this.tipoComprobantes = state.tipoComprobantes.entities;
            this.update();
        }

        if (name == PERIODOS) {
            this.periodos = state.periodosMensuales.entities;
            this.update();
        }
        if (name == PERIODOSMES) {
            (this.periodoActual = state.periodosMensuales.periodoMensualActual), this.update();
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
                value: false,
            },
            area: {
                type: String,
            },
            estado: {
                type: Number,
                reflect: true,
                value: 0,
            },
            Mostrar: {
                type: Boolean,
                reflect: true,
                value: false,
            },
            isOpen: {
                type: Boolean,
                reflect: true,
                value: true,
            },
        };
    }
}
window.customElements.define("filtros-facturashistoricas", filtrosFacturasHistoricas);
