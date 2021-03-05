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
import { get as getFacturas, rechazar, aprobar, setSelected } from "../../redux/facturasPrestadores/actions";
import { SEARCH } from "../../../assets/icons/svgs";
import { goHistoryPrev } from "../../redux/routing/actions";
import { showError } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURA = "facturasPrestadores.selectedTimeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";
const COMPROBANTES = "tipoComprobantes.timeStamp";

const APROBADO = "facturasPrestadores.aprobarTimeStamp";
const RECHAZADO = "facturasPrestadores.rechazarTimeStamp";
const MOTIVOSRECHAZO = "facturasPrestadoresRechazos.timeStamp";
export class detalleFactura extends connect(store, FACTURA, MEDIA_CHANGE, SCREEN, ESTADOS, COMPROBANTES, APROBADO, RECHAZADO, MOTIVOSRECHAZO)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, "0");
        this.factura = null;
        this.comprobantes = [];
        this.estados = [];
        this.imagenActual = "";
        this.documentoActual = ID_TIPO_DOCUMENTO_FACTURA;
        this.rechazos = null;
        this.modo = "";
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
                grid-template-rows: auto auto 1fr;
                align-content: start;
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

            .tarjeta {
                padding: 0.5rem;
                background-color: white;
                box-shadow: var(--shadow-elevation-2-box);
                font-size: 0.8rem;
            }

            .columnas {
                grid-template-columns: 1fr 2fr;
            }
            .btn1[modo="C"] {
                display: none;
            }
        `;
    }
    render() {
        if (this.factura) {
            return html`
                <div class="grid fit18 tarjeta">
                    <div>Nº: ${this.factura.Id}</div>
                    <div>Int: <span>${this.factura.Expediente_Bono.Cabecera.Evento == 4 ? "SI" : "NO"}</span></div>
                    <div>Prestador: ${this.factura.prestado.nombre + " - " + this.factura.IdPrestador}</div>
                    <div>Beneficiario: ${this.factura.Expediente_Bono.Cabecera.Nombre}</div>
                    <div>Expediente: ${this.factura.Expediente_Bono.Expediente}</div>
                    <div>Dependencia: ${this.factura.Expediente_Bono.Cabecera.Detalle.Dependencia == "N" ? "NO" : "SI"}</div>
                    <div>Periodo: ${this.factura.Expediente_Bono.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>
                    <div>Prestación: ${this.factura.Expediente_Bono.Cabecera.Detalle.SSS_Prestaciones.Descripcion}</div>

                    <!-- <div>Cantidad Autorizada: ${this.factura.Expediente_Bono.Cabecera.Detalle.Cantidad}</div>
                    <div>Importe Autorizado $: ${this.factura.Expediente_Bono.Cabecera.Detalle.Importe}</div> -->
                </div>
                <div class="grid column">
                    <button btn3 id="volver" @click="${this.volver}">Volver</button>
                    <button style="display:${this.modo == "C" ? "none" : ""}" btn1 id="aprobar" @click="${this.aprobar}">Aprobar</button>
                    <button style="display:${this.modo == "C" ? "none" : ""}" btn1 id="rechazar" @click="${this.rechazar}">Rechazar</button>

                    <div class="select no-padding" style="grid-template-rows:1fr;display:${this.modo == "C" ? "none" : ""}">
                        <select id="motivosRechazo">
                            <option disabled selected value="-1">Motivo de Rechazo</option>
                            ${this.rechazos.map((c) => {
                                return html`<option value="${c.Id}">${c.Descripcion}</option>`;
                            })}
                        </select>
                    </div>

                    <div class="select no-padding" style="grid-template-rows:1fr">
                        <select id="selectImagenes" .value="${this.documentoActual}" @change="${this.cambiaImagen}">
                            ${this.factura.FacturasPrestadoresImagenes.map((c) => {
                                return html`<option ?selected=${c.Documentacion.Id == ID_TIPO_DOCUMENTO_FACTURA} value="${c.Documentacion.Id}">${c.Documentacion.Descripcion}</option>`;
                            })}
                        </select>
                    </div>
                </div>
                <div class="grid column columnas align-start">
                    <div class="grid fit ">
                        <div class="select">
                            <label>Tipo</label>
                            <select id="tipo" .value=${this.factura.IdTipoComprobante} ?disabled="${this.modo == "C" ? true : false}">
                                ${this.comprobantes.map((c) => {
                                    return html`<option ?selected=${this.factura.IdTipoComprobante === c.Id} value="${c.Id}">${c.Nombre}</option>`;
                                })}
                            </select>
                        </div>
                        <div class="input">
                            <label>Punto de venta</label>
                            <input
                                ?disabled="${this.modo == "C" ? true : false}"
                                type="number"
                                id="sucursal"
                                autocomplete="off"
                                maxlength="5"
                                @input=${this.maxLength}
                                .value="${this.factura.PuntoVenta}"
                            />
                        </div>
                        <div class="input">
                            <label>Número</label>
                            <input
                                ?disabled="${this.modo == "C" ? true : false}"
                                type="number"
                                id="numero"
                                autocomplete="off"
                                maxlength="8"
                                @input=${this.maxLength}
                                .value="${this.factura.NroComprobante}"
                            />
                        </div>

                        <div class="input">
                            <label>Fecha</label>
                            <input ?disabled="${this.modo == "C" ? true : false}" type="date" id="fecha" .value="${this.factura.Fecha.substr(0, 10)}" />
                        </div>
                        <div class="input">
                            <label>Cantidad</label>
                            <input ?disabled="${this.modo == "C" ? true : false}" type="number" id="cantidad" step="1" placeholder="0" autocomplete="off" .value="${this.factura.Cantidad}" />
                        </div>

                        <div class="input">
                            <label>Cantidad Autorizada</label>
                            <input
                                type="number"
                                disabled
                                id="cantidadAutorizada"
                                step="1"
                                placeholder="0"
                                autocomplete="off"
                                .value="${this.factura.Expediente_Bono.Cabecera.Detalle.Sesiones
                                    ? this.factura.Expediente_Bono.Cabecera.Detalle.Sesiones
                                    : this.factura.Expediente_Bono.Cabecera.Detalle.Cantidad}"
                            />
                        </div>

                        <div class="input">
                            <label>Importe</label>
                            <input ?disabled="${this.modo == "C" ? true : false}" type="number" id="importe" step=".01" placeholder="0,00" autocomplete="off" .value="${this.factura.Importe}" />
                        </div>

                        <div class="input">
                            <label>Importe Autorizado</label>
                            <input disabled type="number" id="importeAutorizado" step=".01" placeholder="0,00" autocomplete="off" .value="${this.factura.Expediente_Bono.Cabecera.Detalle.Importe}" />
                        </div>

                        <div class="input">
                            <label>C.A.E.</label>
                            <input ?disabled="${this.modo == "C" ? true : false}" type="text" id="cae" autocomplete="off" maxlength="14" @input=${this.maxLength} .value="${this.factura.CAE}" />
                        </div>
                        <div class="input">
                            <label>Vencimiento C.A.E.</label>
                            <input ?disabled="${this.modo == "C" ? true : false}" type="date" id="vtoCae" autocomplete="off" .value="${this.factura.VtoCAE.substr(0, 10)}" />
                        </div>
                    </div>

                    <div class="grid row  align-self-stretch justify-self-stretch">
                        <iframe id="imagenes" type="application/pdf" style="border:none;height:100%;width:100%" src="${this.imagenActual}"> </iframe>
                    </div>
                </div>
            `;
        }
    }
    esFechaValida(fecha) {
        if (fecha.value != "") {
            let fechaHoy = new Date();

            fechaHoy = new Date(fechaHoy.getFullYear() + "-" + (fechaHoy.getMonth() + 1).toString().padStart(2, "0") + "-" + fechaHoy.getDate().toString().padStart(2, "0") + "T00:00:00");
            let fechaFactura = new Date(fecha.value + "T00:00:00");
            //fechaFactura = new Date(fechaFactura.getTime() - fechaFactura.getTimezoneOffset() * 60000).toJSON();
            if (fechaFactura > fechaHoy) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }
    esFechaEnPeriodo(fecha) {
        let periodo = this.factura.Expediente_Bono.Periodo.toString();
        let ultimosDias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let ultimoDiaString = periodo + ultimosDias[parseInt(periodo.substr(4, 2), 10) - 1].toString();
        let fechaMinima = new Date(ultimoDiaString.substr(0, 4) + "-" + ultimoDiaString.substr(4, 2) + "-" + ultimoDiaString.substr(6, 2) + "T00:00:00");
        return new Date(fecha.value + "T00:00:00") >= fechaMinima;
    }

    esFechaCaeCorrecta(fecha, fechaCae) {
        let fechaFactura = new Date(fecha.value + "T00:00:00");
        let fechaCAE = new Date(fechaCae.value + "T00:00:00");

        if (fechaFactura > fechaCAE) {
            return false;
        }
        return true;
    }
    validarFactura() {
        const fecha = this.shadowRoot.querySelector("#fecha");
        const importe = this.shadowRoot.querySelector("#importe");
        const sucursal = this.shadowRoot.querySelector("#sucursal");
        const numero = this.shadowRoot.querySelector("#numero");
        const vtoCae = this.shadowRoot.querySelector("#vtoCae");
        const cantidad = this.shadowRoot.querySelector("#cantidad");
        const cae = this.shadowRoot.querySelector("#cae");
        const errores = [];

        if (!this.esFechaValida(fecha)) {
            errores.push({
                campo: "Fecha Factura",
                mensaje: "Debe ser menor al dia de hoy",
            });
        }

        if (!this.esFechaEnPeriodo(fecha)) {
            errores.push({
                campo: "Fecha Factura",
                mensaje: "No puede ser menor al utltimo día del período",
            });
        }

        if (importe.value == 0) {
            errores.push({
                campo: "Importe",
                mensaje: "No puede ser vacío",
            });
        }

        if (sucursal.value == "" || sucursal.value == 0) {
            errores.push({
                campo: "Sucursal",
                mensaje: "No puede ser vacío",
            });
        }

        if (numero.value == "" || numero.value == 0) {
            errores.push({
                campo: "Numero de Comprobante",
                mensaje: "No puede ser vacío",
            });
        }

        if (cae.value.length < cae.maxLength) {
            errores.push({ campo: "CAE", mensaje: "Debe tener 14 digitos" });
        }

        if (vtoCae.value == "") {
            errores.push({ campo: "Vencimiento CAE", mensaje: "No puede ser vacío" });
        } else {
            if (!this.esFechaCaeCorrecta(fecha, vtoCae)) {
                errores.push({
                    campo: "Vencimiento CAE",
                    mensaje: "Debe ser Mayor a la fecha de la factura",
                });
            }
        }

        if (cantidad.value == "" || cantidad.value == 0) {
            errores.push({
                campo: "Cantidad",
                mensaje: "No puede ser vacío",
            });
        }

        return errores.length == 0 ? null : errores;
    }

    cambiaImagen(e) {
        this.imagenActual = this.factura.FacturasPrestadoresImagenes.find((a) => a.IdDocumentacion == e.currentTarget.value).Url;
        this.update();
    }

    aprobar(e) {
        if (store.getState().api.loading == 0) {
            const errores = this.validarFactura();
            if (!errores) {
                const tipoComprobante = this.shadowRoot.querySelector("#tipo").value;
                const sucursal = this.shadowRoot.querySelector("#sucursal").value;
                const numero = this.shadowRoot.querySelector("#numero").value;
                const fecha = this.shadowRoot.querySelector("#fecha").value;
                const cantidad = this.shadowRoot.querySelector("#cantidad").value;
                const importe = this.shadowRoot.querySelector("#importe").value;
                const cae = this.shadowRoot.querySelector("#cae").value;
                const vtoCae = this.shadowRoot.querySelector("#vtoCae").value;

                store.dispatch(
                    aprobar({
                        Id: this.factura.Id,
                        IdFacturasPrestadoresEstado: 3,
                        IdTipoComprobante: parseInt(this.shadowRoot.querySelector("#tipo").value, 10),
                        Fecha: this.shadowRoot.querySelector("#fecha").value,
                        PuntoVenta: parseInt(this.shadowRoot.querySelector("#sucursal").value, 10),
                        NroComprobante: parseInt(this.shadowRoot.querySelector("#numero").value, 10),
                        CAE: this.shadowRoot.querySelector("#cae").value,
                        VtoCAE: this.shadowRoot.querySelector("#vtoCae").value,
                        Cantidad: parseInt(this.shadowRoot.querySelector("#cantidad").value, 10),
                        Importe: new Number(this.shadowRoot.querySelector("#importe").value),
                    })
                );
            } else {
                store.dispatch(showError(errores));
            }
        }
    }

    rechazar(e) {
        const motivo = this.shadowRoot.querySelector("#motivosRechazo").value;
        if (motivo == -1) {
            alert("Debe Seleccionar un motivo de Rechazo");
            return false;
        }
        store.dispatch(rechazar(this.factura.Id, motivo));
    }
    volver(e) {
        store.dispatch(
            getFacturas({
                top: 100,
                expand:
                    "FacturasPrestadoresRechazos,prestado,SSS_TipoComprobantes,FacturasPrestadoresImagenes($expand=Documentacion),FacturasPrestadoresEstados,Expediente_Bono($expand=Cabecera($expand=Detalle($expand=SSS_Prestaciones)))",
                filter: store.getState().filtro.value,
                orderby: " Id ",
                count: true,
            })
        );
        const motivosRechazo = this.shadowRoot.querySelector("#motivosRechazo");
        motivosRechazo.value = "-1";
        this.update();
        store.dispatch(goHistoryPrev());
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
            const isCurrentScreen = ["detalleFactura", "detalleFacturaC"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                if (state.screen.name == "detalleFactura") {
                    this.modo = "";
                } else {
                    this.modo = "C";
                }
            }
            this.update();
        }

        if (name == FACTURA) {
            this.documentoActual = "0";
            this.factura = { Fecha: "", VtoCAE: "", Expediente_Bono: { Periodo: 0, Cabecera: { Detalle: { SSS_Prestaciones: {} } } }, prestado: {}, FacturasPrestadoresImagenes: [] };
            this.update();
            this.documentoActual = ID_TIPO_DOCUMENTO_FACTURA;
            this.factura = state.facturasPrestadores.selected;
            this.imagenActual = this.factura.FacturasPrestadoresImagenes.find((a) => a.Documentacion.Id == ID_TIPO_DOCUMENTO_FACTURA)
                ? this.factura.FacturasPrestadoresImagenes.find((a) => a.Documentacion.Id == ID_TIPO_DOCUMENTO_FACTURA).Url
                : "";

            this.update();
        }

        if (name == ESTADOS) {
            this.estados = state.facturasPrestadoresEstados.entities;
            this.update();
        }

        if (name == COMPROBANTES) {
            this.comprobantes = state.tipoComprobantes.entities;
            this.update();
        }

        if (name == APROBADO || name == RECHAZADO) {
            this.volver();
        }

        if (name == MOTIVOSRECHAZO) {
            this.rechazos = state.facturasPrestadoresRechazos.entities;
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
            modo: {
                type: String,
                reflect: true,
            },
        };
    }
}
window.customElements.define("detalle-factura", detalleFactura);
