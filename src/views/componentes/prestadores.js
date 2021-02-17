/** @format */

import { html, LitElement, css } from "lit-element";
import { gridLayout } from "../css/gridLayout";
import { button } from "../css/button";
import { toggle } from "../css/toggle";
import { input } from "../css/input";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import {get as getPrestador} from "../../redux/prestador/actions"

import { SEARCH } from "../../../assets/icons/svgs";
import { prestadoresFetch } from "../../redux/fetchs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PRESTADORES = "prestador.getTimeStamp"

export class prestadoresComponent extends connect(store,  MEDIA_CHANGE, SCREEN, PRESTADORES)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.prestadores=[]
        this._value = 0

    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${toggle}
            ${input}

            :host {
                display: grid;
                grid-auto-flow: row;
                align-content: start;
    
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
            .grilla{
                display:grid;
                grid-gap:.2rem;
                grid-auto-flow: row;
                max-height:50vh;
                padding:.2rem;
                box-shadow: var(--shadow-elevation-2-box);
               
                background-color:transparent;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .titulos{
                color:rgb(24 111 107);   
                display:grid;
                grid-auto-flow:column;       
            }



            .item{
                font-size:.7rem
            }

            .item:hover{
                color:rgb(24 111 107);  
                background-color:var(--primary-color);
                color: var(--color-azul-oscuro);
            }

        `;
    }
    render() {
        
            return html`
                <div class="grid row start">
                    <div class="grid column start">
                        <div class="input">
                            <label>Ingrese Número o Nombre del prestador</label>
                            <input type="text" id="txtPrestador" autocomplete="off" value="${this._value}" />                         
                        </div>    

                        <button btn3 @click="${this.buscar}">${SEARCH}</button>                       
                    </div>
                    <div id="nombrePrestador" style="display:none">
                        
                    </div>

                    <div class="grilla row" id="lista" style="display:none">                   
                        
                            ${this.prestadores.length==0?html `Sin datos`:this.prestadores.map(item=>{
                                return html `                             
                                <div class="grid column start item" .item="${item}" @click="${this.seleccion}">
                                    <div>${item.numero}</div>
                                    <div>${item.Cuit}</div>
                                    <div>${item.nombre}</div>
                                </div>`})}
                        
                    </div>
                </div>


            `;
    }

    seleccion(e){
        const prestador = e.currentTarget.item.numero
        const nombreprestador = this.shadowRoot.querySelector("#nombrePrestador")
        const txtPrestador = this.shadowRoot.querySelector("#txtPrestador")
        const lista = this.shadowRoot.querySelector("#lista")
        txtPrestador.value=prestador
        this._value = prestador
        nombreprestador.innerHTML = e.currentTarget.item.nombre
        nombreprestador.style.display="block"
        lista.style.display="none"
        this.update();
    }
    buscar() {
        const e = this.shadowRoot.querySelector("#txtPrestador").value.trim()
        if (e.length >= 3) {
            if (!Number.isNaN(parseInt(e))) {

                this.indiceActual = ""
                store.dispatch(getPrestador({
                    filter: "numero eq " + e,
                    select: "numero, Cuit, nombre"
                }))
            } else {
                store.dispatch(getPrestador({
                    filter: "contains(nombre,'" + e + "')",
                    top: 100,
                    orderby: "nombre",
                    select: "numero, Cuit, nombre"
                }))
            }
        } else {
            alert("Debe escribir al menos 3 letras para comenzar la busqueda")
        }
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["aprobacionFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                
            }
            this.update();
        }

        if (name == PRESTADORES) {
            this.prestadores = state.prestador.entities;
            const lista = this.shadowRoot.querySelector("#lista")
            lista.style.display="grid"
            this.update();
        }
        
    }
    get value() {
        return parseInt(this.shadowRoot.querySelector("#txtPrestador").value, 10)
    }

    set value(value) {
        this._value = value
        this.update()
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
window.customElements.define("prestadores-component", prestadoresComponent);
