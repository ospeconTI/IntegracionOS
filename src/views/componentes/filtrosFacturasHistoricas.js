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
import { get as getPresentacionSSS_Historico } from "../../redux/presentacionSSS_Historico/actions";
import { add as addPresentacionesDebitos } from "../../redux/presentacionesDebitos/actions";
import { add as addPresentacionesCreditos } from "../../redux/presentacionSSS_Creditos/actions";
import { set as setFiltro } from "../../redux/filtro/actions";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const COMPROBANTES = "tipoComprobantes.timeStamp";
const HISTORICO_TIMESTAMP = "presentacionSSS_Historico.getTimeStamp";
const PRESENTACIONES_TIMESTAMP = "presentacionesCabecera.selectedTimeStamp";
export class filtrosFacturasHistoricas extends connect(store, MEDIA_CHANGE, SCREEN, COMPROBANTES, HISTORICO_TIMESTAMP, PRESENTACIONES_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes = [];
        this.estados = [];
        this.Mostrar = false;
        this.items = [];
        this.isOpen = true;
        this.hidden = false;
        this.idPresentacion = 0;
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
                grid-template-columns: 2.8fr 2.8fr 4fr 2fr 2.5fr 2.5fr 2.5fr 2fr 8fr 7fr 5fr;
                padding: 0.3rem !important;
            }
            .rows {
                overflow-y: auto;
                height: 50vh;
                gap: 0.3rem;
                align-content: flex-start;
                box-sizing: content-box;
                font-size: 0.7rem;
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
            .btnChico {
                font-size: 0.6rem !important;
                padding: 0.3rem !important;
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
                            <prestadores-component id="prestador"></prestadores-component>
                        </div>
                        <div class="grid column">
                            <div class="select">
                                <label>Tipo</label>
                                <select id="tipo">
                                    <option value="-1" selected>Todos</option>
                                    ${this.tipoComprobantes.map((c) => {
                                        return html`<option value="${c.CodigoSSS}">${c.Nombre}</option>`;
                                    })}
                                </select>
                            </div>
                            <div class="input">
                                <label>Punto de venta</label>
                                <input type="number" id="sucursal" autocomplete="off" maxlength="5" @input=${this.maxLength} />
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
                        <div class="ordena" @click=${this.ordenar} .orden="${"CUITPrestador"}">Prestador</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"PeriodoPrestacion"}">Periodo Prestacion</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"ImporteComprobante"}">Importe Comprobante</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"ImporteSolicitado"}">Importe Solicitado</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"ImporteSubsidiado"}">Importe Subsidiado</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"Expediente"}">Expediente</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"Practica"}">Practica</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"AfiNombre"}">Afiliado</div>
                        <div></div>
                    </div>
                    <div class="inner-grid  rows">
                        ${this.items != null
                            ? this.items.map((item) => {
                                  return html`
                                      <div class="inner-grid columnas datos bordeRow" .item="${item}">
                                          <div>${item.PuntoVenta + item.FacturasPrestadores.SSS_TipoComprobantes.TipoFactura + item.NumeroComprobante}</div>
                                          <div>${new Date(item.FechaEmision).toLocaleDateString()}</div>
                                          <div>${item.FacturasPrestadores.prestado.numero + " - " + item.FacturasPrestadores.prestado.nombre}</div>
                                          <div>${item.PeriodoPrestacion}</div>
                                          <div>${item.ImporteComprobante}</div>
                                          <div>${item.ImporteSolicitado}</div>
                                          <div>${item.ImporteSubsidiado}</div>
                                          <div>${item.FacturasPrestadores.Expediente_Bono.Expediente}</div>
                                          <div>${item.FacturasPrestadores.Expediente_Bono.Cabecera.Detalle.SSS_Prestaciones.Descripcion}</div>
                                          <div>${item.FacturasPrestadores.Expediente_Bono.Cabecera.Hiscli + " - " + item.FacturasPrestadores.Expediente_Bono.Cabecera.Nombre}</div>
                                          <div class="grid column">
                                              <button btn1 class="btnChico" @click="${this.generaND}" .item="${item}">ND</button>
                                              <button btn1 class="btnChico" @click="${this.generaNDNC}" .item="${item}">ND y NC</button>
                                          </div>
                                      </div>
                                  `;
                              })
                            : html``}
                    </div>
                </div>
            </div>
        `;
    }

    generaND(e) {
        var item = e.currentTarget.item;

        var itemND = {
            IdPresentacionSSS: this.idPresentacion,
            IdPresentacionSSS_Historico: item.Id,
            IdPresentacionSSS_DebitosEstado: 1,
            UsuarioUpdate: "",
            FechaUpdate: new Date(),
            Activo: true,
        };
        store.dispatch(addPresentacionesDebitos(itemND));

        this.cerrar();
    }

    generaNDNC(e) {
        var item = e.currentTarget.item;
        //[IdPresentacionSSS], [IdFacturasPrestadores], [IdPresentacion_CreditosEstado], [UsuarioUpdate], [FechaUpdate], [Activo]
        var itemNC = {
            IdPresentacionSSS: this.idPresentacion,
            IdFacturasPrestadores: item.FacturasPrestadores.Id,
            IdPresentacion_CreditosEstado: 1,
            UsuarioUpdate: "Usuario",
            FechaUpdate: new Date(),
            Activo: true,
        };
        store.dispatch(addPresentacionesCreditos(itemNC));

        this.generaND(e);
    }

    cerrar() {
        this.Mostrar = false;
        this.limpiar();
        this.update();
    }

    limpiar() {
        const orden = this.shadowRoot.querySelector("#orden");
        const expediente = this.shadowRoot.querySelector("#expediente");
        const hiscli = this.shadowRoot.querySelector("#hiscli");
        const prestador = this.shadowRoot.querySelector("#prestador");
        const tipo = this.shadowRoot.querySelector("#tipo");
        const sucursal = this.shadowRoot.querySelector("#sucursal");
        const numero = this.shadowRoot.querySelector("#numero");

        orden.value = "";
        expediente.value = "";
        hiscli.value = "";
        prestador.value = "";
        tipo.value = -1;
        sucursal.value = "";
        numero.value = "";

        let filtro = "";
        //siempre debe traer solo las facturas aprobadas por SSS
        filtro += "FacturasPrestadores/IdFacturasPrestadoresEstado eq 5 and ";

        if (orden != 0 && orden != "") {
            filtro += "FacturasPrestadores/Id eq " + orden + " and ";
        }

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
        //store.dispatch(setFiltro(filtro));
        this.items = [];

        this.update();
    }
    buscar(e) {
        const orden = this.shadowRoot.querySelector("#orden").value;
        const hiscli = this.shadowRoot.querySelector("#hiscli").value;
        const expediente = this.shadowRoot.querySelector("#expediente").value;
        const prestador = this.shadowRoot.querySelector("#prestador");
        const tipo = this.shadowRoot.querySelector("#tipo").value;
        const sucursal = this.shadowRoot.querySelector("#sucursal").value;
        const numero = this.shadowRoot.querySelector("#numero").value;

        let tieneFiltro = false;
        let filtro = "";
        //siempre debe traer solo las facturas aprobadas por SSS
        filtro += "FacturasPrestadores/IdFacturasPrestadoresEstado eq 5 and ";
        filtro += "PresentacionSSS/UltimaClave eq Clave and ";
        filtro += "TipoArchivo eq 'DS' and ";
        //El siguiente paso hace que no se muestren las fact que ya son débitos
        //filtro += "PresentacionSSS_Debitos/all(f:f/IdPresentacionSSS_Historico ne Id) and ";

        if (orden != 0 && orden != "") {
            filtro += "FacturasPrestadores/Id eq " + orden + " and ";
            tieneFiltro = true;
        }

        if (expediente != 0 && expediente != "") {
            filtro += "FacturasPrestadores/Expediente_Bono/Expediente eq " + expediente + " and ";
            tieneFiltro = true;
        }

        if (hiscli != 0 && hiscli != "") {
            filtro += "FacturasPrestadores/Expediente_Bono/Cabecera/Hiscli eq " + hiscli + " and ";
            tieneFiltro = true;
        }

        if (prestador.value && prestador.value != "") {
            filtro += "FacturasPrestadores/Expediente_Bono/Cabecera/Prestador eq " + prestador.value + " and ";
            tieneFiltro = true;
        }

        if (tipo != -1) {
            filtro += "TipoComprobante eq '" + tipo + "' and ";
            tieneFiltro = true;
        }

        if (sucursal != 0) {
            filtro += "PuntoVenta eq '" + sucursal + "' and ";
            tieneFiltro = true;
        }

        if (numero != 0) {
            filtro += " NumeroComprobante eq '" + numero + "' and ";
            tieneFiltro = true;
        }

        filtro = filtro.slice(0, -5);

        //store.dispatch(setFiltro(filtro));
        //this.cerrar();
        if (tieneFiltro == true) {
            store.dispatch(
                getPresentacionSSS_Historico({
                    expand: "PresentacionSSS_Debitos,FacturasPrestadores($expand=prestado,SSS_TipoComprobantes,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones))))",
                    filter: filtro,
                })
            );
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
            const isCurrentScreen = ["presentacionesDebitos"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                const estados = this.shadowRoot.querySelector("#estados");
            }
            this.update();
        }

        if (name == COMPROBANTES) {
            this.tipoComprobantes = state.tipoComprobantes.entities;
            this.update();
        }

        if (name == HISTORICO_TIMESTAMP) {
            this.items = state.presentacionSSS_Historico.entities;
            this.update();
        }

        if (name === PRESENTACIONES_TIMESTAMP) {
            this.idPresentacion = state.presentacionesCabecera.selected.Id;
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
