/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { input } from "../css/input";
import { select } from "../css/select";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { set as setPeriodo } from "../../redux/periodo/actions";
import { goTo, goHistoryPrev } from "../../redux/routing/actions";
import { showError } from "../../redux/ui/actions";
import { add as addFactura, update as updateFactura, updateEstado } from "../../redux/facturasPrestadores/actions";
import { GET, getCurrent } from "../../redux/cabecera/actions";
import { setStep } from "../../redux/ui/actions";
import { add as addImagen, remove as removeImagen } from "../../redux/facturasPrestadoresImagenes/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const TIPO_COMPROBANTES = "tipoComprobantes.timeStamp";
const DOCUMENTACION = "documentacion.timeStamp";
const EXPEDIENTE_SELECTED = "cabecera.selectedTimeStamp";
const GET_EXPEDIENTE = "cabecera.timeStamp";
const ADD_SUCCESS = "facturasPrestadores.addTimeStamp";
const UPDATE_SUCCESS = "facturasPrestadores.updateTimeStamp";
const UPDATE_ESTADO_SUCCESS = "facturasPrestadores.updateEstadoTimeStamp";
const REMOVE_IMAGEN_SUCCESS = "facturasPrestadoresImagenes.removeTimeStamp";
const ADD_IMAGEN_SUCCESS = "facturasPrestadoresImagenes.addTimeStamp";

export class facturaBody extends connect(store, UPDATE_ESTADO_SUCCESS, GET_EXPEDIENTE, UPDATE_SUCCESS, ADD_IMAGEN_SUCCESS, REMOVE_IMAGEN_SUCCESS, ADD_SUCCESS, EXPEDIENTE_SELECTED, DOCUMENTACION, MEDIA_CHANGE, SCREEN, TIPO_COMPROBANTES)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.currentExpediente = null;
        this.currentBono = null;
        this.tipoComprobantes = [];
        this.files = [];
        this.step = 1;
        this.currentFactura = {};
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${input}
            ${select}

            :host {
                box-sizing: border-box;
                display: grid;
                grid-auto-flow: row;
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
            *[hidden] {
                display: none !important;
            }

            .capitalize {
                text-transform: capitalize;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            .border-bottom {
                border-bottom: 1px solid var(--color-gris);
            }
            .tarjeta {
                padding: 0.5rem;
                background-color: white;
                box-shadow: var(--shadow-elevation-2-box);
                gap: 2rem;
            }
            .cabecera {
                color: var(--color-azul-oscuro);
                gap: 1rem;
                padding: 0 0 1rem 0;
            }
            .fild {
                display: grid;
                gap: 0.5rem;
            }
            .field label:first-child {
                color: var(--color-azul-oscuro);
                font-size: 0.8rem;
            }
            .resumen {
                gap: 1.5rem;
            }
        `;
    }
    render() {
        if (this.currentPaciente && this.currentExpediente) {
            return html` <div class="grid row tarjeta">
                <div class="grid row no-padding">
                    <div class="grid border-bottom cabecera">
                        <button btn2 @click="${this.atras}" class="justify-self-end">Atras</button>
                        <div class="grid column start no-padding">
                            <div>Expediente</div>
                            <div>${this.currentExpediente.Numero}</div>
                            <div>Beneficiario:${this.currentPaciente.Nombre}</div>
                        </div>
                        <div>Perido: desde ${this.currentExpediente.Detalle.Periodo_Desde.replace(/^(\d{4})(\d{2})/, "$2-$1")} hasta ${this.currentExpediente.Detalle.Periodo_Hasta.replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>
                        <div>Prestación:${this.currentExpediente.Detalle.SSS_Prestaciones.Descripcion}</div>
                    </div>
                </div>

                <div class="grid">
                    <div class="grid row no-padding center" ?hidden="${this.step != 1}">
                        <div class="select">
                            <label>Período autorizado</label>
                            <select id="periodo">
                                ${this.getPeriodos()}
                            </select>
                        </div>
                        <button btn1 @click="${this.seleccionBono}">Continuar</button>
                    </div>

                    <div class="grid row no-padding" ?hidden="${this.step != 2}">
                        <div class="grid fit">
                            <div class="select">
                                <label>Tipo</label>
                                <select id="tipo" .value=${this.currentFactura.IdTipoComprobante}>
                                    ${this.tipoComprobantes.map((c) => {
                                        return html`<option ?selected=${this.currentFactura.IdTipoComprobante === c.Id} value="${c.Id}">${c.Nombre}</option>`;
                                    })}
                                </select>
                            </div>
                            <div class="input">
                                <label>Punto de venta</label>
                                <input type="number" id="sucursal" autocomplete="off" maxlength="5" @input=${this.maxLength} .value="${this.currentFactura.PuntoVenta}" />
                            </div>
                            <div class="input">
                                <label>Número</label>
                                <input type="number" id="numero" autocomplete="off" maxlength="8" @input=${this.maxLength} .value="${this.currentFactura.NroComprobante}" />
                            </div>
                        </div>
                        <div class="grid fit">
                            <div class="input">
                                <label>Fecha</label>
                                <input type="date" id="fecha" autocomplete="off" .value="${this.currentFactura.Fecha}" />
                            </div>
                            <div class="input">
                                <label>Cantidad</label>
                                <input type="number" id="cantidad" step="1" placeholder="0" autocomplete="off" .value="${this.currentFactura.Cantidad}" />
                            </div>
                            <div class="input">
                                <label>Importe</label>
                                <input type="number" id="importe" step=".01" placeholder="0,00" autocomplete="off" .value="${this.currentFactura.Importe}" />
                            </div>
                        </div>
                        <div class="grid fit">
                            <div class="input">
                                <label>C.A.E.</label>
                                <input type="text" id="cae" autocomplete="off" maxlength="14" @input=${this.maxLength} .value="${this.currentFactura.CAE}" />
                            </div>
                            <div class="input">
                                <label>Vencimiento C.A.E.</label>
                                <input type="date" id="vtoCae" autocomplete="off" .value="${this.currentFactura.VtoCAE}" />
                            </div>
                        </div>

                        <button btn1 @click="${this.guardar}" class="justify-self-center">Continuar</button>
                    </div>

                    <div class="grid row no-padding" ?hidden="${this.step != 3}">
                        ${this.files.map((fileRef) => {
                            return html`
                                <div class="grid fit no-padding">
                                    <button btn3 .fileRef="${fileRef}" @click="${this.elegirImagen}">Subir ${fileRef.Descripcion} ${fileRef.Id == 7 ? " " + (this.currentFactura.PuntoVenta ? this.currentFactura.PuntoVenta.toString().padStart(5, "0") + "-" : "") + (this.currentFactura.NroComprobante ? this.currentFactura.NroComprobante.toString().padStart(8, "0") : "") : ""}</button>
                                    <div>${fileRef.file.name}</div>
                                    <button btn2 .fileRef="${fileRef}" @click="${this.eliminarImagen}" ?disabled="${!fileRef.file.name}">Eliminar</button>
                                </div>
                            `;
                        })}
                        <button btn1 @click="${this.finalizar}" class="justify-self-center">Continuar</button>
                    </div>
                    <div class="grid row no-padding resumen" ?hidden="${this.step != 4}">
                        <div class="grid fit no-padding">
                            <div class="field">
                                <label>Tipo</label>
                                <label> ${this.tipoComprobantes.find((c) => (this.currentFactura.IdTipoComprobante || 1) == c.Id).Nombre} </label>
                            </div>
                            <div class="field">
                                <label>Punto de venta</label>
                                <label>${this.currentFactura.PuntoVenta ? this.currentFactura.PuntoVenta.toString().padStart(5, "0") : ""}</label>
                            </div>
                            <div class="field">
                                <label>Número</label>
                                <lebel>${this.currentFactura.NroComprobante ? this.currentFactura.NroComprobante.toString().padStart(8, "0") : ""}</lebel>
                            </div>

                            <div class="field">
                                <label>Fecha</label>
                                <label>${this.currentFactura.Fecha ? this.currentFactura.Fecha.replace(/^(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1") : ""}</label>
                            </div>
                            <div class="field">
                                <label>Cantidad</label>
                                <label>${this.currentFactura.Cantidad}</label>
                            </div>
                            <div class="field">
                                <label>Importe</label>
                                <label>${this.currentFactura.Importe}</label>
                            </div>

                            <div class="field">
                                <label>C.A.E.</label>
                                <label>${this.currentFactura.CAE}</label>
                            </div>
                            <div class="field">
                                <label>Vto C.A.E.</label>
                                <label>${this.currentFactura.VtoCAE ? this.currentFactura.VtoCAE.replace(/^(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1") : ""}</label>
                            </div>
                        </div>
                        <div class="grid">
                            ${this.files.map((fileRef) => {
                                return html`
                                    <div class="field">
                                        <label>${fileRef.Descripcion}</label>
                                        <label><a href="${fileRef.file.url}" target="_blank">${fileRef.file.name}</a></label>
                                    </div>
                                `;
                            })}
                        </div>

                        <button btn1 @click="${this.presentar}" class="justify-self-center">Presentar</button>
                    </div>
                </div>

                <input type="file" hidden id="upload" @change="${this.setFile}" />
            </div>`;
        }
    }

    cambiarPeriodo(e) {
        const periodo = e.currentTarget.value;
        store.dispatch(setPeriodo(periodo));
    }

    maxLength(e) {
        const valor = e.currentTarget;
        const largo = valor.getAttribute("maxlength");
        if (valor.value.length > largo) {
            valor.value = valor.value.slice(0, largo);
        }
    }

    presentar(e) {
        if (store.getState().api.loading == 0) store.dispatch(updateEstado({ Id: this.currentBono.FacturasPrestadores[0].Id, IdFacturasPrestadoresEstado: 2 }));
    }
    guardar(e) {
        if (store.getState().api.loading == 0) {
            const errores = this.validarFactura();
            if (!errores) {
                const factura = {
                    IdBono: parseInt(this.shadowRoot.querySelector("#periodo").value, 10),
                    IdPrestador: store.getState().prestador.numero,
                    IdTipoComprobante: parseInt(this.shadowRoot.querySelector("#tipo").value, 10),
                    Fecha: this.shadowRoot.querySelector("#fecha").value,
                    PuntoVenta: parseInt(this.shadowRoot.querySelector("#sucursal").value, 10),
                    NroComprobante: parseInt(this.shadowRoot.querySelector("#numero").value, 10),
                    CAE: this.shadowRoot.querySelector("#cae").value,
                    VtoCAE: this.shadowRoot.querySelector("#vtoCae").value,
                    Cantidad: parseInt(this.shadowRoot.querySelector("#cantidad").value, 10),
                    Importe: new Number(this.shadowRoot.querySelector("#importe").value),
                };

                if (this.currentFactura.Id) {
                    factura.Id = this.currentFactura.Id;
                    store.dispatch(updateFactura(factura));
                } else {
                    factura.IdFacturasPrestadoresEstado = 1;
                    store.dispatch(addFactura(factura));
                }
            } else {
                store.dispatch(showError(errores));
            }
        }
    }

    async guardarImagen(fileRef) {
        if (store.getState().api.loading == 0) {
            let fileContent = await this.getFileContentAsync(fileRef.file);
            fileContent = fileContent.split(",")[1];
            store.dispatch(addImagen(store.getState().prestador.numero, this.currentFactura.Id, fileRef.Id, fileRef.file.name, fileContent));
        }
    }

    elegirImagen(e) {
        this.currentFile = e.currentTarget.fileRef.Descripcion;
        this.shadowRoot.querySelector("#upload").click();
    }
    eliminarImagen(e) {
        if (store.getState().api.loading == 0) {
            const index = e.currentTarget.fileRef;
            store.dispatch(removeImagen({ Id: index.file.id }));
            this.update();
        }
    }
    setFile(e) {
        const file = e.currentTarget.files[0];
        const index = this.files.find((t) => t.Descripcion == this.currentFile);
        index.file = file;
        this.guardarImagen(index);
        this.update();
        e.currentTarget.value = null;
    }

    async getFileContentAsync(file) {
        if (file.name) {
            let result_base64 = await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            });
            return result_base64;
        }
        return null;
    }

    getPeriodos() {
        return this.currentExpediente.Expediente_Bono.map((b) => {
            return html`<option value="${b.Id}">${b.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</option>`;
        });
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["factura"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                this.step = 1;
                store.dispatch(setStep(this.step));
            }
            this.update();
        }
        if (name == EXPEDIENTE_SELECTED) {
            this.currentExpediente = state.cabecera.selected.currentExpediente;
            this.currentPaciente = state.cabecera.selected.currentPaciente;
            this.update();
        }

        if (name == TIPO_COMPROBANTES) {
            this.tipoComprobantes = state.tipoComprobantes.entities;
            this.update();
        }

        if (name == DOCUMENTACION) {
            this.files = state.documentacion.entities.map((f) => {
                f.file = {};
                return f;
            });

            this.update();
        }

        if (name == ADD_SUCCESS || name == UPDATE_SUCCESS || name == REMOVE_IMAGEN_SUCCESS || name == ADD_IMAGEN_SUCCESS || name == UPDATE_ESTADO_SUCCESS) {
            store.dispatch(getCurrent(state.prestador.numero, state.periodo.periodoActual));
        }

        if (name == ADD_SUCCESS || name == UPDATE_SUCCESS) this.proximo();

        if (name == UPDATE_ESTADO_SUCCESS) store.dispatch(goHistoryPrev());

        if (name == GET_EXPEDIENTE) {
            this.actualizarSeleccionados();
            this.update();
        }
    }

    finalizar(e) {
        let obligatorias = this.files.filter((f) => f.file.name && f.Obligatoria);
        let noObligatorias = this.files.filter((f) => f.file.name && !f.Obligatoria);

        if (obligatorias.length == 0) {
            alert("Al menos debe presentar imagen de factura/recibo");
            return;
        }
        if (noObligatorias.length == 0) {
            alert("Al menos debe presentar ddjj o certificado de asistencia");
            return;
        }

        this.proximo();
    }

    seleccionBono() {
        this.actualizarSeleccionados();
        this.proximo();
    }

    actualizarSeleccionados() {
        const periodo = this.shadowRoot.querySelector("#periodo");
        if (periodo) {
            this.currentFactura = {
                IdBono: parseInt(this.shadowRoot.querySelector("#periodo").value, 10),
                IdPrestador: store.getState().prestador.numero,
                IdTipoComprobante: 1,
                Fecha: "",
                PuntoVenta: null,
                NroComprobante: null,
                CAE: "",
                VtoCAE: "",
                Cantidad: 1,
                Importe: null,
            };
            this.currentExpediente = store.getState().cabecera.selected.currentExpediente;
            if (this.currentExpediente) {
                this.currentBono = this.currentExpediente.Expediente_Bono.find((e) => e.Id == parseInt(periodo.value, 10));
                if (this.currentBono) {
                    if (this.currentBono.FacturasPrestadores[0]) {
                        // si es una factura que se esta conformando se modifica el registro actual
                        if (this.currentBono.FacturasPrestadores[0].IdFacturasPrestadoresEstado == 1) {
                            this.currentFactura = this.currentBono.FacturasPrestadores[0];
                        } 
                    } else {
                        // verifico si debe cargar sesiones en lugar de cantidad
                        if (this.currentExpediente.Detalle.Sesiones){
                            this.currentFactura.Cantidad = this.currentExpediente.Detalle.Sesiones
                        }
                    }

                    this.currentFactura.Fecha = this.currentFactura.Fecha.substr(0, 10);
                    this.currentFactura.VtoCAE = this.currentFactura.VtoCAE.substr(0, 10);

                    this.files = store.getState().documentacion.entities.map((f) => {
                        if (this.currentBono.FacturasPrestadores[0]) {
                            let imagen = this.currentBono.FacturasPrestadores[0].FacturasPrestadoresImagenes.find((i) => i.IdDocumentacion == f.Id);
                            f.file = imagen ? { id: imagen.Id, name: imagen.Nombre, url: imagen.Url } : { file: {} };
                            return f;
                        } else {
                            return { file: {} };
                        }
                    });
                }
            }
        }
    }

    atras() {
        this.step--;
        store.dispatch(setStep(this.step));
        if (this.step == 0) {
            store.dispatch(goHistoryPrev());
        } else {
            this.update();
        }
    }

    proximo() {
        this.step++;
        store.dispatch(setStep(this.step));
        this.update();
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
        let periodo = this.currentBono.Periodo.toString();
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
        const errores = [];

        if (!this.esFechaValida(fecha)) {
            errores.push({
                campo: "Fecha Factura",
                mensaje: "Debe ser menor al dia de hoy",
            });
        }
        /*         if (!this.esFechaEnPeriodo(fecha)) {
            errores.push({
                campo: "Fecha Factura",
                mensaje: "No puede ser menor al utltimo día del período",
            });
        }
 */
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

window.customElements.define("factura-body", facturaBody);
