import { html, LitElement, css, svg } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { button } from "../css/button";
import { input } from "../css/input";
import { select } from "../css/select";
import { BUSCAR, AGREGAR, SAVE, CANCEL, DELETE, MODIF } from "../../../assets/icons/svgs";
import { update, remove } from "../../redux/presentacionesCabecera/actions";
import { getPeriodosPresentacion } from "../../redux/periodosPresentaciones/actions";

const MOSTRAR_FORM = "presentacionesCabecera.selectedTimeStamp";
const TIPO_ACCION = "presentacionesCabecera.tipoAccionTimeStamp";
const GET_PERIODOS = "periodosPresentaciones.timeStampPeriodosPresentacion";
export class formularioPresentaciones extends connect(store, MOSTRAR_FORM, TIPO_ACCION, GET_PERIODOS)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.item = null;
        this.itemOld = null;
        this.modo = "M";
        this.disabled = true;
        this.periodosPresentacion = [];
        this.listaPeriodos = [];
        this.estados = [];
    }

    static get styles() {
        return css`
            ${button}
            ${input}
            ${select}
            :host {
                top: 0;
                left: 0;
                display: grid;
                justify-items: center;
                align-items: center;
                position: absolute;
                height: 100%;
                width: 100%;
                z-index: 1000;
                background-color: rgba(0, 0, 0, 0.6);
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
                width: 40rem;
            }
            :host([hidden]) {
                display: none;
            }
            .boton {
                display: grid;
                font-weight: bold;
                cursor: pointer;
                color: var(--primary-color);
            }
            .tituloForm {
                display: grid;
                font-weight: bold;
                font-size: var(--font-header-size);
            }
            .mensaje {
                display: grid;
                grid-gap: 0.5rem;
                opacity: 0.8;
            }
            .titulo {
                font-size: var(--font-label-size);
                font-weight: bold;
                color: var(--color-gris);
                position: sticky;
                top: 6.5rem;
                background-color: white;
            }
            .divABM {
                grid-auto-flow: column;
                grid-template-columns: 1fr 1fr;
                display: grid;
                gap: 0.5rem;
            }
            .botonera {
                display: grid;
                justify-items: end;
                grid-auto-flow: column;
                justify-content: end;
                grid-gap: 1rem;
            }
            .botonera svg {
                height: 1.5rem;
                width: 1.5rem;
            }
            .inputABM {
                box-sizing: border-box;
                width: 100%;
                padding: 0.5rem;
                background-color: var(--color-blanco);
                border: 1px solid var(--color-gris-claro);
                color: var(--color-azul-oscuro);
                font-size: var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
                outline: none;
                font-family: inherit;
                border-radius: 0.5rem;
                height: 1.8rem;
                border-color: var(--color-gris-claro);
            }
        `;
    }
    render() {
        return html`${this.formulario()}`;
    }

    formulario() {
        if (this.item != null) {
            return html`
                <div class="form">
                    <div class="divABM">
                        <div class="select">
                            <label>Periodo Presentación</label>
                            <select id="periodoPresentacion" ?disabled="${this.modo == "D" ? true : false}">
                                ${this.listaPeriodos.map((periodo) => {
                                    if (this.item.PeriodoPresentacion == periodo) {
                                        return html` <option value=${periodo} selected>${periodo}</option> `;
                                    } else {
                                        return html` <option value=${periodo}>${periodo}</option> `;
                                    }
                                })}
                            </select>
                        </div>
                        <div class="input">
                            <label>Fecha Cierre</label>
                            <input ?disabled="${this.modo == "D" ? true : false}" type="date" id="fechaPresentacion" autocomplete="off" .value="${this.item.FechaPresentacion.substr(0, 10)}" />
                        </div>
                    </div>
                    <div class="divABM">
                        <div class="select">
                            <label>Periodo Desde</label>
                            <select id="periodoDesde" ?disabled="${this.modo == "D" ? true : false}">
                                ${this.periodosPresentacion.map((periodo) => {
                                    if (this.item.PeriodoDesde == periodo) {
                                        return html` <option value=${periodo} selected>${periodo}</option> `;
                                    } else {
                                        return html` <option value=${periodo}>${periodo}</option> `;
                                    }
                                })}
                            </select>
                        </div>
                        <div class="select">
                            <label>Periodo Hasta</label>
                            <select id="periodoHasta" ?disabled="${this.modo == "D" ? true : false}">
                                ${this.periodosPresentacion.map((periodo) => {
                                    if (this.item.PeriodoHasta == periodo) {
                                        return html` <option value=${periodo} selected>${periodo}</option> `;
                                    } else {
                                        return html` <option value=${periodo}>${periodo}</option> `;
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div class="select">
                        <label>Estado Presentacion</label>
                        <select id="estado" ?disabled="${this.modo == "D" ? true : false}">
                            ${this.estados.map((estado) => {
                                if (this.item.IdEstadoPresentacionSSS == estado.Id) {
                                    return html` <option value=${estado.Id} selected>${estado.Descripcion}</option> `;
                                } else {
                                    return html` <option value=${estado.Id}>${estado.Descripcion}</option> `;
                                }
                            })}
                        </select>
                    </div>
                    <div class="botonera">
                        <button btn2 class="button" @click=${this.grabar}>${SAVE}</button>
                        <button btn2 class="button" @click=${this.cerrar}>${CANCEL}</button>
                    </div>
                </div>
            `;
        }
    }

    cerrar(e) {
        /*         const itemVacio = {
            Activo: true,
            Clasif_Materiales: {},
            FechaUpdate: "",
            Id: 0,
            IdClasif: 0,
            IdTipoMaterial: 0,
            UsuarioUpdate: "Desarrollo",
            codigo: 0,
            costo: 0,
            nombre: "",
        };
        this.item = itemVacio;
        this.update();
        this.item = this.itemOld; 
        this.update();*/

        this.hidden = true;
    }

    grabar(e) {
        const item = {};
        item.Activo = true;
        item.FechaUpdate = new Date();
        item.Id = this.item.Id;
        item.IdEstadoPresentacionSSS = this.shadowRoot.querySelector("#estado").value;
        item.PeriodoDesde = this.shadowRoot.querySelector("#periodoDesde").value;
        item.PeriodoHasta = this.shadowRoot.querySelector("#periodoHasta").value;
        item.PeriodoPresentacion = this.shadowRoot.querySelector("#periodoPresentacion").value;
        item.FechaPresentacion = this.shadowRoot.querySelector("#fechaPresentacion").value;
        item.UsuarioUpdate = "";

        if (this.modo == "M") {
            store.dispatch(update(item));
        }
        if (this.modo == "D") {
            store.dispatch(remove(item.Id));
        }
        this.hidden = true;
    }

    stateChanged(state, name) {
        if (name === MOSTRAR_FORM) {
            this.item = state.presentacionesCabecera.selected;
            this.itemOld = state.presentacionesCabecera.selected;
            //if (this.item != {}) {
            store.dispatch(getPeriodosPresentacion(this.item.PeriodoPresentacion));
        }
        if (name === TIPO_ACCION) {
            this.modo = state.presentacionesCabecera.tipoAction;
            this.disabled = this.modo == "M" || this.modo == "A" ? false : true;
            this.update();
        }
        if (name === GET_PERIODOS) {
            this.periodosPresentacion = state.periodosPresentaciones.periodosPresentacion;
            this.listaPeriodos = state.periodosPresentaciones.listaPeriodos;

            const estados = [
                { Id: 1, Descripcion: "En Proceso" },
                { Id: 2, Descripcion: "Cerrada" },
            ];
            this.estados = estados;

            if (this.item != null) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
            this.update();
        }
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
                value: true,
            },
            disabled: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("formulario-presentaciones", formularioPresentaciones);
