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
import { get as getPresentacionesCabecera, setSelected, setTipoAccion } from "../../redux/presentacionesCabecera/actions";
import { PERSON, SEARCH } from "../../../assets/icons/svgs";
import { filtrosPresentaciones } from "../componentes/filtrosPresentaciones";
import { goTo } from "../../redux/routing/actions";
import { set as setFiltro } from "../../redux/filtro/actions";
import { COPY, ADD, MODIF, DELETE, DETALLE } from "../../../assets/icons/svgs";
import { formularioPresentaciones } from "./formularioPresentaciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PRESENTACIONES_CAB = "presentacionesCabecera.timeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";
const FILTROTS = "filtro.timeStamp";
const MY_NET = "notifications.myNetTimeStamp";
const MESSAGE = "notifications.singleMessageTimeStamp";

export class presentacionesCabecera extends connect(store, PRESENTACIONES_CAB, MEDIA_CHANGE, SCREEN, ESTADOS, FILTROTS, MY_NET, MESSAGE)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.myNet = [];
        this.messages = [];
        this.items = [];
        this.order = "";

        this.periodoActual = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString();
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
            .cabecera {
                background-color: white;
                color: var(--color-azul-oscuro);
                fill: var(--color-azul-oscuro);
                stroke: var(--color-azul-oscuro);
                font-size: 0.7rem;
                font-weight: bold;
            }

            .datos {
                position: relative;
                background-color: white;
                color: var(--color-azul-oscuro);
                font-size: 0.7rem;
                cursor: pointer;
                min-height: 1.6rem;
            }
            .datos:hover {
                background-color: var(--color-gris-claro);
            }
            .ordena {
                cursor: pointer;
            }

            filtros-presentaciones {
                position: fixed;
                top: 0px;
                width: 30%;
                height: 100vh;
                z-index: 1000;
                background-color: white;
                left: -100%;
                transition: all 0.5s ease 0s;
            }

            filtros-presentaciones[isOpen] {
                left: 0;
            }

            .rows {
                overflow-y: auto;
                height: 68vh;
                gap: 0.3rem;
                align-content: flex-start;
                box-sizing: content-box;
            }

            .contenedor {
                background-color: var(--color-crudo);
            }
            .bordeRow {
                border-bottom: 1px solid var(--color-gris-claro);
                gap: 0.3rem;
            }

            .columnas {
                grid-template-columns: 0.3fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.4fr;
                padding: 0.3rem !important;
            }
            .myNet {
                display: grid;
                gap: -0.2rem;
                grid-auto-flow: column;
                align-items: center;
                justify-items: start;
                overflow-x: hidden;
            }
            .myNetNode {
                place-content: center;
                border-radius: 50%;
                width: 1rem;
                height: 1rem;
                border: 2px solid var(--primary-color);
                font-size: 0.5rem;
            }

            .complementaria {
                font-size: 0.7rem !important;
            }

            svg {
                height: 1.3rem;
                width: 1.3rem;
            }

            div[dirty] {
                color: var(--color-gris);
            }
            .botonAlta {
                position: absolute;
                top: 38rem;
                left: 45rem;
                padding: 1rem;
            }
            .botonAlta svg {
                height: 3rem;
                width: 3rem;
            }
            .botonera {
                grid-auto-flow: column;
                display: grid;
                justify-content: right;
            }
        `;
    }
    render() {
        if (this.items) {
            return html`
                <div class="grid row contenedor">
                    <div class="grid column ">
                        <button btn3 class="justify-self-start" id="showfiltros" @click="${this.mostrarFiltros}">${SEARCH}</button>
                        <div class="sublabel justify-self-end">Cantidad:${this.items.length}</div>
                    </div>
                    <filtros-presentaciones class="grid row start " id="filtros" hidden estado="2"></filtros-presentaciones>
                    <div class="grid columnas cabecera">
                        <div class="ordena">${PERSON}</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"PeriodoPresentacion"}">Presentacion</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"PeriodoDesde"}">Desde</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"PeriodoHasta"}">Hasta</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"FechaPresentacion"}">Fecha Cierre</div>
                        <div class="ordena" @click=${this.ordenar} .orden="${"IdEstadoPresentacionSSS"}">Estado</div>
                        <div></div>
                    </div>
                    <div class="inner-grid  rows">
                        ${this.items.map((item) => {
                            return html`
                                <div class="inner-grid columnas datos bordeRow" .item="${item}" ?dirty="${this.messages.find((e) => e.Document == item.Id)}">
                                    <div class="myNet">
                                        ${this.myNet
                                            .filter((el) => {
                                                return el.State.find((e) => e.Document == item.Id);
                                            })
                                            .map((el) => {
                                                return html`<div class="myNetNode inner-grid">${el.Name}</div>`;
                                            })}
                                    </div>
                                    <div>${item.PeriodoPresentacion}</div>
                                    <div>${item.PeriodoDesde}</div>
                                    <div>${item.PeriodoHasta}</div>
                                    <div>${new Date(item.FechaPresentacion).toLocaleDateString()}</div>
                                    <div>${item.PresentacionSSS_Estados.Descripcion}</div>
                                    <div class="botonera">${this.poneBotonera(item)}</div>
                                </div>
                            `;
                        })}
                    </div>
                    <button btn4 class="button botonAlta" @click=${this.agregar}>${ADD}</button>
                </div>
                <formulario-presentaciones class="body" id="formularioPresentacion" hidden></formulario-presentaciones>
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }

    // <button btn2 class="button" @click=${this.delete} .item="${item}">${DELETE}</button>
    // <button btn2 class="button" @click=${this.modif} .item="${item}">${MODIF}</button>
    // <button btn2 class="button" @click=${this.consultarDetalle} .item="${item}">${DETALLE}</button>

    poneBotonera(item) {
        if (item.IdEstadoPresentacionSSS == 1) {
            return html`
                <button btn2 class="button" @click=${this.delete} .item="${item}">${DELETE}</button>
                <button btn2 class="button" @click=${this.modif} .item="${item}">${MODIF}</button>
                <button btn2 class="button" @click=${this.consultarDetalle} .item="${item}">${DETALLE}</button>
            `;
        }
        if (item.IdEstadoPresentacionSSS == 2) {
            return html` <button btn2 class="button" @click=${this.consultarDetalle} .item="${item}">${DETALLE}</button> `;
        }
        if (item.IdEstadoPresentacionSSS == 3) {
            return html`
                <button btn2 class="button" @click=${this.delete} .item="${item}">${DELETE}</button>
                <button btn2 class="button" @click=${this.modif} .item="${item}">${MODIF}</button>
            `;
        }
    }

    delete(e) {
        store.dispatch(setSelected(e.currentTarget.item));
        store.dispatch(setTipoAccion("D"));
    }

    modif(e) {
        store.dispatch(setSelected(e.currentTarget.item));
        store.dispatch(setTipoAccion("M"));
    }

    agregar(e) {
        const itemVacio = {
            Activo: false,
            FechaPresentacion: "",
            FechaUpdate: "",
            Id: 0,
            IdEstadoPresentacionSSS: 0,
            PeriodoDesde: 0,
            PeriodoHasta: 0,
            PeriodoPresentacion: 0,
            UsuarioUpdate: "",
        };
        store.dispatch(setSelected(itemVacio));
        store.dispatch(setTipoAccion("A"));
    }

    consultarDetalle(e) {}

    mostrarFiltros() {
        this.shadowRoot.querySelector("#filtros").isOpen = true;
    }

    ordenar(e) {
        this.order = this.order == "" ? "desc" : "";
        store.dispatch(
            getPresentacionesCabecera({
                top: 100,
                orderby: e.currentTarget.orden + " " + this.order,
                count: true,
            })
        );
        this.update();
    }

    filtrar(e) {
        const filtros = this.shadowRoot.querySelector("#filtros");
        filtros.hidden = false;
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
            }
            this.update();
        }
        if (name == PRESENTACIONES_CAB) {
            this.items = state.presentacionesCabecera.entities;
            this.update();
        }

        if (name == MY_NET) {
            this.myNet = state.notifications.myNet.filter((item) => {
                return item.Id != state.notifications.myNetId;
            });
            this.update();
        }
        if (name == MESSAGE) {
            this.messages.push(state.notifications.singleMessage);
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
        };
    }
}
window.customElements.define("presentaciones-cabecera", presentacionesCabecera);
