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
import { traeParaBonos } from "../../redux/cabecera/actions";
import { generarBonosPeriodo } from "../../redux/bonos/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const LISTARPERIODOSBONOS = "periodosBono.listaTimeStamp";
const EXPEDIENTES = "cabecera.paraBonosTimeStamp";
const BONOS_GENERADOS = "bonos.generarBonosPeriodoTimeStamp";

export class generarBonos extends connect(store, MEDIA_CHANGE, SCREEN, LISTARPERIODOSBONOS, EXPEDIENTES, BONOS_GENERADOS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, "0");
        this.periodos = [];
        this.expedientes = [];
        this.mostrarGeneracion = false;
        this.bonos = [];
        this.generarHidden = true;
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

            *[hidden] {
                display: none !important;
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

            .option-input {
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance: none;
                -o-appearance: none;
                appearance: none;
                position: relative;
                top: 13.33333px;
                right: 0;
                bottom: 0;
                left: 0;
                height: 2rem;
                width: 2rem;
                transition: all 0.15s ease-out 0s;
                background: #cbd1d8;
                border: none;
                color: #fff;
                cursor: pointer;
                display: inline-block;
                margin-right: 0.5rem;
                outline: none;
                position: relative;
                z-index: 1000;
            }
            .option-input:hover {
                background: #9faab7;
            }
            .option-input:checked {
                background: var(--primary-color);
            }
            .option-input:checked::before {
                height: 2rem;
                width: 2rem;
                position: absolute;
                content: "✔";
                display: inline-block;
                font-size: 26.66667px;
                text-align: center;
                line-height: 2rem;
            }
            .option-input:checked::after {
                -webkit-animation: click-wave 0.65s;
                -moz-animation: click-wave 0.65s;
                animation: click-wave 0.65s;
                background: var(--primary-color);
                content: "";
                display: block;
                position: relative;
                z-index: 10;
            }
            .option-input.radio {
                border-radius: 50%;
            }
            .option-input.radio::after {
                border-radius: 50%;
            }
            #resultado {
                position: absolute;
                height: 80vh;
                width: 80vw;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                overflow-y: auto;
                border-radius: 1rem;
                box-shadow: var(--shadow-elevation-3-box);
                align-items: flex-start;
                padding: 1rem;
            }
        `;
    }
    render() {
        return html`
            <div class="grid row start">
                <div class="grid column start">
                    <div class="select">
                        <label>Período</label>
                        <select id="periodo">
                            ${this.periodos.map((periodo) => {
                                return html` <option value=${periodo}>${periodo}</option> `;
                            })}
                        </select>
                    </div>
                    <div class="select">
                        <label>Búsqueda por</label>
                        <select id="criterio">
                            <option value="E">Expediente</option>
                            <option value="D">DNI</option>
                            <option value="P">Prestador</option>
                        </select>
                    </div>
                    <div class="input">
                        <label>Número</label>
                        <input type="number" id="valor" />
                    </div>
                    <button btn1 @click="${this.buscar}">Consultar</button>
                </div>
            </div>

            <div class="grid">
                ${this.expedientes.map((item) => {
                    return html`
                        <div class="grid row tarjeta">
                            <div class="grid fit">
                                <div class="grid column start">
                                    <div>Expediente:</div>
                                    <div class="primaryColorInvert">${item.Numero}</div>
                                    <div>Fecha:${new Date(item.Fecha).toLocaleDateString()}</div>
                                </div>
                                <div class="justify-self-center"><input type="checkbox" marca class="option-input checkbox" .item="${item}" /></div>
                            </div>
                            <div class="sublabel">Beneficiario:${item.Nombre + " (" + item.Obrasoc + ") DNI " + item.Hiscli}</div>
                            <div class="sublabel">Prestacion:${item.Detalle.SSS_Prestaciones.Descripcion}</div>
                            <div class="sublabel">Prestador:${item.prestado.nombre}</div>
                            <div class="sublabel">Desde ${item.Detalle.Periodo_Desde + " hasta " + item.Detalle.Periodo_Hasta}</div>
                        </div>
                    `;
                })}
                <button ?hidden="${this.generarHidden}" btn1 class="justify-self-center" @click="${this.generar}">Generar Bonos</button>
            </div>
            ${this.modal()}
        `;
    }

    modal() {
        if (this.bonos.length > 0) {
            return html` <div id="resultado" ?hidden="${!this.mostrarGeneracion}" class="grid row tarjeta">
                <div class="grid fit">
                    <h3>Resultado de la Generación del período:${this.bonos[0].Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</h3>
                    <button btn2 @click="${this.cerrarResultado}" class="end">Cerrar</button>
                </div>
                ${this.bonos.map((item) => {
                    return html` <div class="grid fit">
                        <div>Expediente: ${item.Expediente}</div>
                        <div>Estado: ${item.Estado}</div>
                        <div>Resultado: ${item.Resultado}</div>
                    </div>`;
                })}
            </div>`;
        } else {
            return html` <div id="resultado" ?hidden="${!this.mostrarGeneracion}" class="grid row tarjeta">
                <div class="grid fit">
                    <h3>No se obtuvieron resultados</h3>
                    <button btn2 @click="${this.cerrarResultado}" class="end">Cerrar</button>
                </div>
            </div>`;
        }
    }

    cerrarResultado() {
        this.mostrarGeneracion = false;
        this.expedientes = [];
        this.generarHidden = true;
        this.update();
    }

    generar() {
        let marcados = [...this.shadowRoot.querySelectorAll("input[marca]:checked")];
        const periodo = this.shadowRoot.querySelector("#periodo").value;
        let Expedientes = [];
        marcados.forEach((expediente) => {
            Expedientes.push(expediente.item.Numero);
        });

        store.dispatch(generarBonosPeriodo(periodo, Expedientes));
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
            }
            this.update();
        }
        if (name == LISTARPERIODOSBONOS) {
            this.periodos = state.periodosBono.entities;
            this.update();
        }

        if (name == EXPEDIENTES) {
            this.expedientes = state.cabecera.paraBonos;
            if (this.expedientes.length > 0) {
                this.generarHidden = false;
            }

            this.update();
        }

        if (name == BONOS_GENERADOS) {
            this.bonos = state.bonos.generarBonosPeriodo;
            this.mostrarGeneracion = true;
            this.update();
        }
    }

    buscar(e) {
        const periodo = this.shadowRoot.querySelector("#periodo").value;
        const criterio = this.shadowRoot.querySelector("#criterio").value;
        const valor = this.shadowRoot.querySelector("#valor").value;
        let filtro = "";
        switch (criterio) {
            case "D":
                filtro = "Hiscli eq ";
                break;
            case "E":
                filtro = "Numero eq ";
                break;
            case "P":
                filtro = "Prestador eq ";
        }
        filtro += valor;

        store.dispatch(traeParaBonos(periodo, filtro));
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
