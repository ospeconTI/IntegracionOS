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
import { get as getPresentacionesDebitos } from "../../redux/presentacionesDebitos/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

import { SEARCH } from "../../../assets/icons/svgs";

export class filtrosND extends connect(store)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes = [];
        this.periodos = [];
        this.estados = [];
        this.periodoActual = null;
        this.open = false;
        this.presentacionSSS = {};
        this.orientacion = "";
        this.hidden = true;
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

            :host([hidden]) {
                display: none;
            }
            :host([orientacion="vertical"]) {
                display: grid;
                grid-template-areas:
                    "botones"
                    "hiscli"
                    "expe"
                    "presta"
                    "tipo"
                    "sucur"
                    "nro";
            }
            :host([orientacion="horizontal"]) {
                display: grid;
                grid-template-areas: "botones hiscli expe presta tipo sucur nro";
            }
            .area1 {
                grid-area: botones;
            }
            .area2 {
                grid-area: hiscli;
            }
            .area3 {
                grid-area: expe;
            }
            .area4 {
                grid-area: presta;
            }
            .area5 {
                grid-area: tipo;
            }
            .area6 {
                grid-area: sucur;
            }
            .area7 {
                grid-area: nro;
            }

            form[orientacion="horizontal"] {
                height: 10rem;
                width: 50rem;
            }
            form[orientacion="vertical"] {
                height: 50rem;
                width: 10rem;
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
            <div class="form">
                <div class="grid fit" style="grid-gap:0">
                    <div class="grid column area1">
                        <button btn3 @click="${this.limpiar}">Limpiar Filtros</button>
                        <button btn1 @click="${this.buscar}">Buscar</button>
                        <button btn1 @click="${this.cerrar}">Cerrar</button>
                    </div>

                    <div class="input area2">
                        <label>DNI</label>
                        <input type="number" id="hiscli" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                    </div>
                    <div class="input area3">
                        <label>Expte</label>
                        <input type="number" id="expediente" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                    </div>
                    <prestadores-component id="prestador" class="area4"></prestadores-component>
                    <div class="select area5">
                        <label>Tipo</label>
                        <select id="tipo">
                            <option value="-1" selected>Todos</option>
                            ${this.tipoComprobantes.map((c) => {
                                return html`<option value="${c.CodigoSSS}">${c.Nombre}</option>`;
                            })}
                        </select>
                    </div>
                    <div class="input area6">
                        <label>Punto de venta</label>
                        <input type="number" id="sucursal" autocomplete="off" maxlength="5" @input=${this.maxLength} />
                    </div>
                    <div class="input area7">
                        <label>Número</label>
                        <input type="number" id="numero" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                    </div>
                </div>
            </div>
        `;
    }

    cerrar() {
        this.isOpen = false;
        this.update();
    }

    limpiar() {
        const expediente = this.shadowRoot.querySelector("#expediente");
        const hiscli = this.shadowRoot.querySelector("#hiscli");
        const prestador = this.shadowRoot.querySelector("#prestador");
        const tipo = this.shadowRoot.querySelector("#tipo");
        const sucursal = this.shadowRoot.querySelector("#sucursal");
        const numero = this.shadowRoot.querySelector("#numero");

        expediente.value = "";
        hiscli.value = "";
        prestador.value = "";
        tipo.value = -1;
        sucursal.value = "";
        numero.value = "";

        let filtro = "";
        //siempre debe traer solo las facturas aprobadas por SSS
        filtro += "FacturasPrestadores/IdFacturasPrestadoresEstado eq 5 and ";

        if (expediente != 0 && expediente != "") {
            filtro += "FacturasPrestadores/Expediente_Bono/Expediente eq " + expediente + " and ";
        }

        if (hiscli != 0 && hiscli != "") {
            filtro += "FacturasPrestadores/Expediente_Bono/Cabecera/Hiscli eq " + hiscli + " and ";
        }

        if (prestador.value && prestador.value != "") {
            filtro += "FacturasPrestadores/Expediente_Bono/Cabecera/Prestador eq " + prestador.value + " and ";
        }

        if (tipo != -1) {
            filtro += "TipoComprobante eq '" + tipo + "' and ";
        }

        if (sucursal != 0) {
            filtro += "PuntoVenta eq '" + sucursal + "' and ";
        }

        if (numero != 0) {
            filtro += " NumeroComprobante eq '" + numero + "' and ";
        }

        filtro = filtro.slice(0, -5);

        var params = {
            filter: "IdPresentacionSSS eq " + this.presentacionSSS.Id,
        };
        store.dispatch(getPresentacionesDebitos(params));

        this.items = [];
        this.update();
    }

    buscar(e) {
        const hiscli = this.shadowRoot.querySelector("#hiscli").value;
        const expediente = this.shadowRoot.querySelector("#expediente").value;
        const prestador = this.shadowRoot.querySelector("#prestador");
        const tipo = this.shadowRoot.querySelector("#tipo").value;
        const sucursal = this.shadowRoot.querySelector("#sucursal").value;
        const numero = this.shadowRoot.querySelector("#numero").value;

        let tieneFiltro = false;
        let filtro = "";

        if (expediente != 0 && expediente != "") {
            filtro += "PresentacionSSS_Historico/FacturasPrestadores/Expediente_Bono/Expediente eq " + expediente + " and ";
            tieneFiltro = true;
        }

        if (hiscli != 0 && hiscli != "") {
            filtro += "PresentacionSSS_Historico/FacturasPrestadores/Expediente_Bono/Cabecera/Hiscli eq " + hiscli + " and ";
            tieneFiltro = true;
        }

        if (prestador.value && prestador.value != "") {
            filtro += "PresentacionSSS_Historico/FacturasPrestadores/Expediente_Bono/Cabecera/Prestador eq " + prestador.value + " and ";
            tieneFiltro = true;
        }

        if (tipo != -1) {
            filtro += "PresentacionSSS_Historico/TipoComprobante eq '" + tipo + "' and ";
            tieneFiltro = true;
        }

        if (sucursal != 0) {
            filtro += "PresentacionSSS_Historico/PuntoVenta eq '" + sucursal + "' and ";
            tieneFiltro = true;
        }

        if (numero != 0) {
            filtro += " PresentacionSSS_Historico/NumeroComprobante eq '" + numero + "' and ";
            tieneFiltro = true;
        }

        filtro = filtro.slice(0, -5);

        if (tieneFiltro == true) {
            var params = {
                filter: "IdPresentacionSSS eq " + this.presentacionSSS.Id + " and " + filtro,
            };

            store.dispatch(getPresentacionesDebitos(params));
            this.cerrar();
        } else {
            alert("Debe hacer algún filtro");
        }
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
        if (name == PRESENTACIONSSS) {
            this.presentacionSSS = state.presentacionesCabecera.selected;
            this.update();
        }
        if (name == COMPROBANTES) {
            this.tipoComprobantes = state.tipoComprobantes.entities;
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
            isOpen: {
                type: Boolean,
                reflect: true,
                value: false,
            },
            orientacion: {
                type: String,
                reflect: true,
                value: "vertical",
            },
        };
    }
}
window.customElements.define("filtros-nd", filtrosND);
