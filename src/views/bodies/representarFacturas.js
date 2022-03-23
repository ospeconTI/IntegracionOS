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
import { setSelected, representar } from "../../redux/facturasPrestadores/actions";
import { SEARCH, TIMELINE, ALERTA } from "../../../assets/icons/svgs";
import { filtrosFacturas } from "../componentes/filtrosFacturas";
import { goTo } from "../../redux/routing/actions";
import { set as setFiltro } from "../../redux/filtro/actions";
import { get as getLog } from "../../redux/facturasPrestadoresLog/actions";
import { getErroresByFactura } from "../../redux/presentacionesErrores/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURAS = "facturasPrestadores.facturasRechazadasSSSTimeStamp";

export class representarFacturas extends connect(store, FACTURAS, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.estados = [];

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
                font-size: 0.7rem;
                font-weight: bold;
            }
            .datos {
                background-color: white;
                color: var(--color-azul-oscuro);
                font-size: 0.7rem;
                cursor: pointer;
            }
            .datos:hover {
                background-color: var(--color-gris-claro);
            }
            .ordena {
                cursor: pointer;
            }

            filtros-facturas {
                position: fixed;
                top: 0px;
                width: 30%;
                height: 100vh;
                z-index: 1000;
                background-color: white;
                left: -100%;
                transition: all 0.5s ease 0s;
            }

            filtros-facturas[isOpen] {
                left: 0;
            }

            .rows {
                height: 68vh;
                overflow-y: auto;
                gap: 0.3rem;
                box-sizing: content-box;
                align-content: flex-start;
            }
            .contenedor {
                background-color: var(--color-crudo);
            }
            .bordeRow {
                border-bottom: 1px solid var(--color-gris-claro);
            }

            .columnas {
                grid-template-columns: 0.5fr 1fr 1fr 1fr 3fr 1fr 4fr 0.5fr 0.5fr 2fr 0.8fr 1fr 0.5fr 2fr 0.5fr;
                padding: 0.3rem !important;
            }
            .errores svg {
                width: 1.5rem;
                height: 1.5rem;
            }
        `;
    }
    render() {
        if (this.facturas) {
            return html`
                <div class="grid row contenedor">
                    <div class="grid column ">
                        <button btn3 class="justify-self-start" id="showfiltros" @click="${this.mostrarFiltros}">${SEARCH}</button>
                        <div class="justify-self-left">Consulta de Facturas Rechazadas por SSS</div>
                    </div>
                    <div class="grid column ">
                        <button class="justify-self-end" btn1 id="marcar" @click="${this.cambiarEstado}">Volver a Pesentar</button>
                    </div>
                    <filtros-facturas class="grid row start " id="filtros" hidden estado="-1"></filtros-facturas>
                    <div class="grid columnas cabecera ">
                        <div class="ordena">Orden</div>
                        <div class="ordena">Ingreso</div>
                        <div class="ordena">Expte</div>
                        <div class="ordena">Documento</div>
                        <div class="ordena">Nombre</div>
                        <div class="ordena">CUIT</div>
                        <div class="ordena">Nombre Prestador</div>
                        <div class="ordena">Nro</div>
                        <div class="justify-self-center">Int</div>
                        <div>Comprobante</div>
                        <div class="ordena">Periodo</div>
                        <div class="justify-self-end">Importe</div>
                        <div>Errores</div>
                        <div>Log</div>
                        <div><input type="checkbox" id="marcaTodos" @click="${this.marcaDesmarca}" /></div>
                    </div>
                    <div class="inner-grid rows">
                        ${this.facturas.map((item) => {
                            return html`
                                <div
                                    class="inner-grid columnas datos  bordeRow"
                                    .item="${item}"
                                    @click="${this.seleccionar}"
                                    .title="${item.IdMotivoRechazo ? item.FacturasPrestadoresRechazos.Descripcion : ""}"
                                >
                                    <div>${item.Id}</div>
                                    <div>${item.Fecha ? new Date(item.Fecha).toLocaleDateString() : ""}</div>
                                    <div>${item.Expediente}</div>
                                    <div>${item.Documento}</div>
                                    <div>${item.Nombre}</div>
                                    <div>${item.CUIT}</div>

                                    <div>${item.Prestador}</div>
                                    <div>${item.IdPrestador}</div>
                                    <div class="justify-self-center">${item.Integracion}</div>
                                    <div>
                                        ${item.TipoFactura.replace("FACTURA", "FC ").replace("RECIBO", "RC ") +
                                        " " +
                                        item.PuntoVenta.toString().padStart(4, "0") +
                                        "-" +
                                        item.NroComprobante.toString().padStart(8, "0")}
                                    </div>
                                    <div>${item.Periodo.toString().replace(/^(\d{4})(\d{2})/, "$2-$1")}</div>
                                    <div class="justify-self-end">${item.Importe}</div>
                                    <div class="errores" id="errores" .item="${item}">${ALERTA}</div>
                                    <div id="timeline" .item="${item}">${TIMELINE}</div>
                                    <div><input class="opcion" type="checkbox" id="marca" .opcion="${item.Id}" @click="${this.cabecera}" /></div>
                                </div>
                            `;
                        })}
                    </div>
                </div>
            `;
        } else {
            return html`<h3>Sin Datos</h3>`;
        }
    }

    cabecera() {
        const checkTodos = this.shadowRoot.querySelector("#marcaTodos");
        checkTodos.checked = false;
    }

    marcaDesmarca() {
        const checkTodos = this.shadowRoot.querySelector("#marcaTodos").checked;
        const checks = this.shadowRoot.querySelectorAll(".opcion");
        checks.forEach((check) => {
            check.checked = checkTodos;
        });
        this.update();
    }

    cambiarEstado() {
        let body = [];
        const items = this.shadowRoot.querySelectorAll(".opcion");
        items.forEach((item) => {
            if (item.checked) {
                body.push(item.opcion);
            }
        });

        if (body.length > 0) {
            store.dispatch(representar(body));
        }

        this.cabecera();

        this.update();
    }

    mostrarFiltros() {
        this.shadowRoot.querySelector("#filtros").isOpen = true;
    }

    seleccionar(e) {
        const clickOnTimeline = e.path.find((control) => control.id == "timeline");
        const clickOnErrores = e.path.find((control) => control.id == "errores");
        if (clickOnTimeline) {
            store.dispatch(getLog({ filter: "IdFacturasPrestadores eq " + e.currentTarget.item.Id, orderby: "Fecha desc" }));
        } else {
            if (clickOnErrores) {
                store.dispatch(getErroresByFactura(e.currentTarget.item.Id));
            } else {
                store.dispatch(setSelected(e.currentTarget.item));
                store.dispatch(goTo("detalleFacturaC"));
            }
        }
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["representarFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                this.facturas = [];
            }
            this.update();
        }
        if (name == FACTURAS) {
            this.facturas = state.facturasPrestadores.getFacturasRechazadasSSS;
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
window.customElements.define("representar-facturas", representarFacturas);
