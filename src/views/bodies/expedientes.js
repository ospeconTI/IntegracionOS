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
import { getCurrent as getCurrentCabecera, setSelected } from "../../redux/cabecera/actions";

import { SEARCH } from "../../../assets/icons/svgs";
import { generar as generarBonos } from "../../redux/bonos/actions";
import { showWarning } from "../../redux/ui/actions";
import { goTo } from "../../redux/routing/actions";
import { EXPAND_UP, EXPAND_DOWN } from "../../../assets/icons/svgs";
import { set as setPeriodo } from "../../redux/periodo/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const EXPEDIENTES = "cabecera.timeStamp";
const PRESTADOR = "prestador.timeStamp";
const GENERAR_BONOS_OK = "bonos.generarTimeStamp";
const GENERAR_BONOS_ERROR = "bonos.generarErrorTimeStamp";

const PERIODOS = "periodo.listaTimeStamp";
const ACTUAL = "periodo.timeStamp";
const PERIODOSMENSUALES = "periodosMensuales.timeStamp";

export class expedientesBody extends connect(store, EXPEDIENTES, MEDIA_CHANGE, SCREEN, PRESTADOR, GENERAR_BONOS_OK, GENERAR_BONOS_ERROR, PERIODOS, ACTUAL, PERIODOSMENSUALES)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.mostrarGeneracion = false;
        this.mostrarFacturacion = false;
        this.currentPaciente = null;
        this.currentExpediente = null;
        this.bonosGenerados = [];
        this.periodos = [];
        this.actual = null;
        this.periodoMensualActual = null;
        this.periodosMensualSiguiente = null;
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
            }

            :host([hidden]) {
                display: none;
            }

            .toggle:not(:checked) + * + * + .detalles {
                display: none;
            }
            .area1-1,
            .area1-1 + label {
                grid-area: 1 / 1;
                cursor: pointer;
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
            .detalles {
                border-top: 1px solid var(--color-gris);
                padding: 0.5rem;
            }
            .detalle {
                background-color: var(--color-celeste-muy-claro);
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
            #resultado {
                position: absolute;
                height: 80vh;
                width: 80vw;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 100;
                overflow-y: auto;
            }

            #facturacion {
                position: absolute;
                height: 100vh;
                width: 100vw;
                top: 0;
                left: 0;
                z-index: 100;
                background-color: rgba(0, 0, 0, 0.5);
                color: var(--color-azul-oscuro);
            }
            #facturacion > div {
                width: 70vw;
                max-height: calc(100vh - 1rem);
                overflow-y: auto;
            }
            :host(:not([media-size="large"])) #facturacion > div {
                width: auto;
            }
            .capitalize {
                text-transform: capitalize;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `;
    }
    render() {
        if (this.pacientes) {
            return html`
                <div class="grid fit">
                    <div class="select">
                        <label>Filtro por Período</label>
                        <select id="listaperiodos" @change="${this.cambiarPeriodo}">
                            ${this.periodos.map((periodo) => {
                                return html`<option value="${periodo}" ?selected=${periodo == this.actual}>${periodo}</option>`;
                            })}
                        </select>
                    </div>
                    <!--  <div class="input">
                        <label>Busqueda por nombre o DNI</label>
                        <input type="text" id="search" autocomplete="off" />
                    </div> -->
                    <!-- <button btn3 @click="${this.filtrar}" style="width:3rem">${SEARCH}</button> -->
                    <button btn2 .periodo=${"ANTERIOR"} @click="${this.generar}">Generar autorizaciones para el período 01-2021</button>
                    <button btn1 .periodo=${"ACTUAL"} @click="${this.generar}">
                        Generar autorizaciones para el período ${this.periodoMensualActual.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}
                    </button>
                    <button btn2 .periodo=${"PROXIMO"} @click="${this.generar}">
                        Generar autorizaciones para el período ${this.periodosMensualSiguiente.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}
                    </button>
                </div>

                <div class="grid">
                    ${this.pacientes.map((item) => {
                        return html`
                            <div class="grid tarjeta">
                                <input type="checkbox" class="toggle area1-1" />
                                <label> ${EXPAND_DOWN}${EXPAND_UP} </label>

                                <div class="grid row">
                                    <div class="grid column start">
                                        <div>${item.Nombre}</div>
                                        <div class="primaryColor">${item.Obrasoc}</div>
                                    </div>
                                    <div class="grid row">
                                        <div class="sublabel">DNI:${item.Hiscli.toString().replace(/^(\d{1,3})(\d{3})(\d{3})$/, "$1.$2.$3")}</div>
                                        <div class="sublabel">CUIL:${item.Cuil.toString().replace(/^(\d{2})(\d{8})(\d{1})/, "$1-$2-$3")}</div>
                                    </div>
                                </div>

                                <div class="grid detalles">
                                    ${item.expedientes.map((expe) => {
                                        return html`
                                            <div class="grid row detalle">
                                                <button btn3 class="justify-self-end" ?hidden="${!this.puedePresentar(expe)}" .paciente="${item}" .expediente="${expe}" @click="${this.integrar}">
                                                    Presentar Factura
                                                </button>
                                                <div class="grid fit">
                                                    <div class="grid column center">
                                                        <div>Expediente:</div>
                                                        <div class="primaryColorInvert">${expe.Numero}</div>
                                                    </div>
                                                    <div class="grid">${expe.Detalle.SSS_Prestaciones.Descripcion}</div>
                                                    <div class="grid center">Fecha: ${new Date(expe.Fecha).toLocaleDateString()}</div>
                                                </div>
                                                <div class="grid fit sublabel itemsCenter">
                                                    <div>
                                                        Perido: desde ${expe.Detalle.Periodo_Desde.replace(/^(\d{4})(\d{2})/, "$2-$1")} hasta
                                                        ${expe.Detalle.Periodo_Hasta.replace(/^(\d{4})(\d{2})/, "$2-$1")}
                                                    </div>
                                                    <div>Cantidad máxima autorizada: ${expe.Detalle.Sesiones ? expe.Detalle.Sesiones : expe.Detalle.Cantidad}</div>
                                                    <div>Dependencia: ${expe.Detalle.Dependencia}</div>
                                                </div>
                                            </div>
                                        `;
                                    })}
                                </div>
                            </div>
                        `;
                    })}
                </div>

                ${this.formAutorizaciones()}
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }
    puedePresentar(expe) {
        // si no tiene bonos autorizados
        if (expe.Expediente_Bono.length == 0) return false;
        // si no tiene facturas conformadas
        if (expe.Expediente_Bono[0].FacturasPrestadores.length == 0) return true;
        // si tiene factura conformada no presentada
        if (expe.Expediente_Bono[0].FacturasPrestadores[0].IdFacturasPrestadoresEstado == 1) return true;
        // si factura rechazada
        if (expe.Expediente_Bono[0].FacturasPrestadores[0].IdFacturasPrestadoresEstado == 4) return true;

        return false;
    }
    integrar(e) {
        store.dispatch(setSelected({ currentPaciente: e.currentTarget.paciente, currentExpediente: e.currentTarget.expediente }));
        store.dispatch(goTo("factura", true));
    }
    formAutorizaciones() {
        if (this.bonosGenerados.length > 0) {
            return html` <div id="resultado" ?hidden="${!this.mostrarGeneracion}" class="grid row tarjeta">
                <div class="grid fit">
                    <h3>Resultado de la Generación del período:${this.bonosGenerados[0].Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</h3>
                    <button btn2 @click="${this.cerrarResultado}" class="end">Cerrar</button>
                </div>
                ${this.bonosGenerados.map((item) => {
                    return html` <div class="grid fit">
                        <div>Expediente: ${item.Expediente}</div>
                        <div>Estado: ${item.Estado}</div>
                        <div>Resultado: ${item.Resultado}</div>
                    </div>`;
                })}
                <button btn1 @click="${this.verBonos}">Consultar autorizaciones</button>
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

    verBonos(e) {
        this.cerrarResultado();
        store.dispatch(goTo("bonos"));
    }

    generar(e) {
        if (store.getState().api.loading == 0) {
            store.dispatch(
                generarBonos(
                    e.currentTarget.periodo,
                    store.getState().cabecera.entities.map((e) => e.Numero)
                )
            );
        }
    }
    filtrar(e) {}

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["expedientes", "main"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
            this.update();
        }

        if (name == EXPEDIENTES) {
            this.pacientes = state.cabecera.entities.reduce((acumulado, item) => {
                //busco al paciente en el acumulado
                let acumuladoItem = acumulado.find((f) => f.Hiscli == item.Hiscli);
                if (acumuladoItem) {
                    //si esta le agrego un expediente
                    acumuladoItem.expedientes.push(item);
                } else {
                    //si no esta lo agrego y le agrego un expediente
                    acumuladoItem = {
                        Hiscli: item.Hiscli,
                        Nombre: item.Nombre,
                        Cuil: item.Cuil,
                        Obrasoc: item.Obrasoc,
                        expedientes: [item],
                    };
                    acumulado.push(acumuladoItem);
                }
                return acumulado;
            }, []);
            this.update();
        }
        if (name == GENERAR_BONOS_OK) {
            this.bonosGenerados = state.bonos.generarEntities;
            this.mostrarGeneracion = true;
            this.update();
        }
        if (name == GENERAR_BONOS_ERROR) {
            store.dispatch(showWarning("Se produjo un error intentando generar bonos"));
        }

        if (name == PERIODOS) {
            this.periodos = state.periodo.listaPeriodo;
            this.update();
        }

        if (name == ACTUAL) {
            this.actual = state.periodo.periodoActual;
            store.dispatch(getCurrentCabecera(state.prestador.numero, state.periodo.periodoActual));
            this.update();
        }

        if (name == PERIODOSMENSUALES) {
            this.periodoMensualActual = state.periodosMensuales.periodoMensualActual;
            if (parseInt(this.periodoMensualActual.toString().substr(4, 2), 10) != 12) {
                this.periodosMensualSiguiente = parseInt(this.periodoMensualActual.toString().substr(0, 4), 10) * 100 + parseInt(this.periodoMensualActual.toString().substr(4, 2), 10) + 1;
            }
            this.update();
        }
    }

    cerrarResultado() {
        this.mostrarGeneracion = false;
        this.update();
    }
    cerrarFacturacion() {
        this.mostrarFacturacion = false;
        this.update();
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
window.customElements.define("expedientes-body", expedientesBody);
