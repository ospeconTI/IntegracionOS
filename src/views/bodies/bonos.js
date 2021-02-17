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
const BONOS = "bonos.timeStamp";

export class bonosBody extends connect(store, BONOS, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = {
            A: "APROBADO",
            P: "PENDIENTE",
            R: "RECHAZADO",
        };
        this.estado = "APROBADO";
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
        if (this.bonos) {
            return html`
                <div class="grid row">
                    <div class="grid column start">
                        <div class="input">
                            <label>Período</label>
                            <input type="text" id="search" autocomplete="off" value="${this.periodoActual}" />
                        </div>
                        <div class="select">
                            <label>Estado</label>
                            <select id="estados">
                                ${Object.entries(this.estados).map((estado, index) => {
                                    return html` <option value=${estado[0]} ?selected=${index == 0}>${estado[1]}</option> `;
                                })}
                            </select>
                        </div>
                        <button btn1 @click="${this.buscar}">Consultar autorizaciones</button>
                    </div>

                    <!--                     <div class="grid column start">
                        <div class="input">
                            <label>Busqueda por Expediente</label>
                            <input type="text" id="search" autocomplete="off" />
                        </div>
                        <button btn3 @click="${this.filtrar}">${SEARCH}</button>
                    </div>
 -->
                    <div class="grid">
                        ${this.bonos.map((item) => {
                            return html`
                                <div class="grid row tarjeta">
                                    <div class="grid fit">
                                        <div class="grid column start">
                                            <div>Expediente:</div>
                                            <div class="primaryColorInvert">${item.Expediente}</div>
                                            <div>Autorización:</div>
                                            <div>${item.Id}</div>
                                            <div>Fecha:${new Date(item.Fecha).toLocaleDateString()}</div>
                                        </div>
                                        <button btn3 class="justify-self-end" ?hidden="${!this.puedePresentar(item)}" .item=${item} @click="${this.presentar}">Presentar Factura</button>
                                    </div>
                                    <div class="sublabel">Beneficiario:${item.Cabecera.Nombre + " (" + item.Cabecera.Obrasoc + ") DNI " + item.Cabecera.Hiscli}</div>
                                    <div class="sublabel">Prestacion:${item.Cabecera.Detalle.SSS_Prestaciones.Descripcion}</div>
                                    <div class="sublabel">Desde ${item.Cabecera.Detalle.Periodo_Desde + " hasta " + item.Cabecera.Detalle.Periodo_Hasta}</div>

                                    <div class="sublabel">Perído:${item.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>

                                    <div class="sublabel">Estado:<span class="colorEstados" estadobono="${this.estados[item.Estado]}">${this.estados[item.Estado]}</span></div>
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

    puedePresentar(bono) {
        // si no tiene bonos autorizados
        if (bono.Estado != "A") return false;
        // si no tiene facturas conformadas
        if (bono.FacturasPrestadores.length == 0) return true;
        // si tiene factura conformada no presentada
        if (bono.FacturasPrestadores[0].IdFacturasPrestadoresEstado == 1) return true;
        // si factura rechazada
        if (bono.FacturasPrestadores[0].IdFacturasPrestadoresEstado == 4) return true;

        return false;
    }

    presentar(e) {
        const paciente = {
            Cuil: e.currentTarget.item.Cuil,
            Hiscli: e.currentTarget.item.Cabecera.Hiscli,
            Nombre: e.currentTarget.item.Cabecera.Nombre,
            Obrasoc: e.currentTarget.item.Obrasoc,
        };

        const expediente = e.currentTarget.item.Cabecera;
        expediente.Expediente_Bono = [e.currentTarget.item];

        store.dispatch(setSelected({ currentPaciente: paciente, currentExpediente: expediente }));
        store.dispatch(goTo("factura", true));
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["bonos"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                store.dispatch(getBonos({ expand: "Cabecera($expand=Detalle($expand=SSS_Prestaciones)),FacturasPrestadores($expand=FacturasPrestadoresEstados,FacturasPrestadoresImagenes)", filter: "Cabecera/Prestador eq " + state.prestador.numero + " and Periodo eq " + this.periodoActual + " and Estado eq 'A'", orderby: "Id" }));
            }
            this.update();
        }
        if (name == BONOS) {
            this.bonos = state.bonos.entities;
            this.update();
        }
    }

    buscar(e) {
        this.periodoActual = this.shadowRoot.querySelector("#search").value;
        if (parseInt(this.periodoActual.substr(0,4),10)>=2021) {
        const estado = this.shadowRoot.querySelector("#estados").value;
        store.dispatch(getBonos({ expand: "Cabecera($expand=Detalle($expand=SSS_Prestaciones)),FacturasPrestadores($expand=FacturasPrestadoresEstados,FacturasPrestadoresImagenes)", filter: "Cabecera/Prestador eq " + store.getState().prestador.numero + " and Periodo eq " + this.periodoActual + " and Estado eq '" + estado + "'", orderby: "Id" }));} else {
            alert ("El período a buscar debe ser mayor o igual al 2021")
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
window.customElements.define("bonos-body", bonosBody);
