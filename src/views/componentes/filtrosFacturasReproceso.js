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
import { getFacturasRechazadasSSS } from "../../redux/facturasPrestadores/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const COMPROBANTES = "tipoComprobantes.timeStamp";
const PERIODOS = "periodosMensuales.listaTimeStamp";
const PERIODOSMES = "periodosMensuales.timeStamp";

export class filtrosFacturasReproceso extends connect(store, MEDIA_CHANGE, SCREEN, PERIODOS, PERIODOSMES, COMPROBANTES)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes = [];
        this.periodos = [];
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
                    <label>Orden</label>
                    <input type="number" id="orden" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>DNI</label>
                    <input type="number" id="hiscli" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>Expte</label>
                    <input type="number" id="expediente" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="select">
                    <label>Período</label>
                    <select id="periodo">
                        <option value="-1">Cualquier Período</option>
                        ${this.periodos.map((c) => {
                            return html`<option value="${c}">${c}</option>`;
                        })}
                    </select>
                </div>

                <div class="input">
                    <label>CUIT</label>
                    <input type="number" id="cuit" autocomplete="off" maxlength="11" @input=${this.maxLength} />
                </div>

                <prestadores-component id="prestador"></prestadores-component>

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
        `;
    }

    cerrar() {
        this.isOpen = false;
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
        const prestador = this.shadowRoot.querySelector("#prestador");
        const cuit = this.shadowRoot.querySelector("#cuit");

        orden.value = "";
        hiscli.value = "";
        expediente.value = "";
        periodo.value = -1;
        tipo.value = -1;
        sucursal.value = "";
        numero.value = "";
        prestador.value = "";
        cuit.value = "";

        var filtro = null;
        store.dispatch(getFacturasRechazadasSSS(filtro));
        this.update();
        this.cerrar();
    }
    buscar(e) {
        const orden = this.shadowRoot.querySelector("#orden").value;
        const periodo = this.shadowRoot.querySelector("#periodo").value;
        const expediente = this.shadowRoot.querySelector("#expediente").value;
        const prestador = this.shadowRoot.querySelector("#prestador");
        const tipo = this.shadowRoot.querySelector("#tipo").value;
        const sucursal = this.shadowRoot.querySelector("#sucursal").value;
        const numero = this.shadowRoot.querySelector("#numero").value;
        const cuit = this.shadowRoot.querySelector("#cuit").value;
        const hiscli = this.shadowRoot.querySelector("#hiscli").value;
        let filtro = "";

        if (periodo != -1) {
            filtro += "Periodo eq " + periodo + " and ";
        }

        if (orden != 0 && orden != "") {
            filtro += "Id eq " + orden + " and ";
        }

        if (expediente != 0 && expediente != "") {
            filtro += "Expediente eq " + expediente + " and ";
        }

        if (hiscli != 0 && hiscli != "") {
            filtro += "Documento eq " + hiscli + " and ";
        }

        if (prestador.value && prestador.value != "") {
            filtro += "IdPrestador eq " + prestador.value + " and ";
        }

        if (tipo != -1) {
            filtro += "IdTipoComprobante eq " + tipo + " and ";
        }

        if (sucursal != 0) {
            filtro += "PuntoVenta eq " + sucursal.padStart(4, "0") + " and ";
        }

        if (numero != 0) {
            filtro += " NroComprobante eq " + numero.padStart(8, "0") + " and ";
        }

        if (cuit != 0 && cuit != "") {
            filtro += " CUIT eq " + cuit + " and ";
        }

        filtro = filtro.slice(0, -5);

        store.dispatch(getFacturasRechazadasSSS(filtro));
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
            const isCurrentScreen = ["aprobacionFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
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
window.customElements.define("filtros-facturasreproceso", filtrosFacturasReproceso);
