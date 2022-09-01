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
import { getCantidadFacturas } from "../../redux/facturasPrestadores/actions";
import { goTo } from "../../redux/routing/actions";



const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURAS = "facturasPrestadores.cantidadFacturasTimeStamp";
const ESTADOS = "facturasPrestadoresEstados.timeStamp";


export class cantidadFacturas extends connect(store, MEDIA_CHANGE, SCREEN, ESTADOS, FACTURAS)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];
        this.facturas=[]
        this.total = 0;

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
            
            

            .rows {
                overflow-y: auto;
                height: 60vh;
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
                grid-template-columns:  1fr 1fr  3fr;
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

            .total{
                padding: .6rem;
                font-size: .8rem;
                
            }
        `;
    }
    render() {
        return html`
        <div class="grid row start">
            <div class="grid column start">
               
                <div class="input">
                    <label>Fecha Desde:</label>
                    <input type="date" id="desde" />
                </div>
                <div class="input">
                    <label>Fecha Hasta:</label>
                    <input type="date" id="hasta" />
                </div>
                <button btn1 @click="${this.buscar}">Consultar</button>
            </div>
        </div>
        
        ${this.facturas.length==0 ?html``:
                 html`
                    <div class="total justify-self-end">Cantidad de Facturas: ${this.total}</div>
                    <div class="grid row contenedor">
                        <div class="grid columnas cabecera">
                            <div class="justify-self-center">Fecha</div>
                            <div class="justify-self-center">Integración</div>
                            <div class="justify-self-center">Cantidad</div>
                        </div>
                        <div class="inner-grid  rows">
                            ${this.facturas.map((item) => {
                                return html`
                                    <div class="inner-grid columnas datos bordeRow" .item="${item}">
                                        <div class="justify-self-center">${item.Fecha ? new Date(item.Fecha).toLocaleDateString() : ""}</div>
                                        <div class="justify-self-center">${item.Integracion}</div>
                                        <div class="justify-self-center">${item.Cantidad}</div>
                                    </div>
                                `;
                            })}
                        </div>
                    </div>
                `}`
    }

   buscar(){
    const desde = this.shadowRoot.querySelector("#desde").value
    const hasta = this.shadowRoot.querySelector("#hasta").value
    store.dispatch(getCantidadFacturas(desde, hasta))
   }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["cantidadFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;

                /*  let filtro = "IdFacturasPrestadoresEstado eq " + ESTADO_FACTURA_PRESENTADA;
                store.dispatch(setFiltro(filtro)); */
            }
            this.update();
        }
        if (name == FACTURAS) {

            
            const cantidadFacturas = state.facturasPrestadores.cantidadFacturas;
            if (cantidadFacturas){
                this.facturas = cantidadFacturas.Facturas;
                this.total = cantidadFacturas.Total;
            }
            this.update();
        }

        if (name == ESTADOS) {
            this.estados = state.facturasPrestadoresEstados.entities;
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
window.customElements.define("cantidad-facturas", cantidadFacturas);
