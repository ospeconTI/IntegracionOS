/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { gridLayout } from "../css/gridLayout";
import { select } from "../css/select";
import { MENU, RIGHT } from "../../../assets/icons/svgs";
import { gestures } from "../../libs/gestures";
import { logout } from "../../redux/autorizacion/actions";
import { set as setPrestador } from "../../redux/prestador/actions";
import { getCurrent as getCurrentCabecera } from "../../redux/cabecera/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const USUARIO = "autorizacion.loginTimeStamp";

export class menuPrincipal extends connect(store, MEDIA_CHANGE, SCREEN, USUARIO)(LitElement) {
    constructor() {
        super();
        this.area = "header";
        this.visible = false;
        this.arrastrando = false;
        this.usuario = [];
        this.addEventListener("gestures", this.gestos);
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${select}
            :host {
                display: grid;
                grid-auto-flow: column;
                padding: 0 !important;
            }
            :host([hidden]) {
                display: none;
            }
            #titulo {
                color: var(--color-blanco);
                cursor: pointer;
            }

            .menuItem {
                color: var(--color-blanco);
                cursor: pointer;
            }

            div[oculto] {
                display: none;
            }
            h1 {
                margin: 0;
            }
            #version {
                color: var(--color-gris);
                font-size: 0.6rem;
                align-self: start;
            }
            #opciones {
                justify-content: end;
                grid-gap: 2rem;
                padding: 2rem;
            }
            :host(:not([media-size="large"])) #opciones {
                position: fixed;
                top: 0;
                right: -100%;
                height: 100vh;
                width: 60%;
                grid-auto-flow: row;
                background-color: var(--primary-color);
                align-content: start;
                transition: 0.5s all;
                display: grid;
                justify-items: start;
                z-index: 100;
            }

            :host([media-size="large"]) .menu-button,
            :host([media-size="large"]) #velo {
                display: none;
            }

            #velo {
                position: fixed;
                top: 0;
                right: -100%;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.3);

                z-index: 90;
            }

            .menu-button {
                cursor: pointer;
                stroke: var(--color-blanco);
                fill: var(--color-blanco);
                justify-self: end;
                justify-content: end;
                display: grid;
            }

            :host([visible]) #velo {
                right: 0;
            }

            :host([arrastrando]) #opciones {
                position: absolute;
                transition: none;
            }
        `;
    }
    render() {
        return html`
            <div id="velo" @click=${this.toggleMenu}></div>
            <div class="grid column">
                <div id="version">V${__VERSION__}</div>
                <h1 id="titulo" @click="${this.click}" .option=${""}>${__DESCRIPTION__}</h1>
                <div class="menu-button" @click=${this.toggleMenu}>${MENU}</div>
            </div>

            <div id="opciones" class="grid column" @click=${this.toggleMenu}>
                <div class="menu-button">${RIGHT}</div>
                <div class="menuItem" @click=${this.click} .option=${"aprobacionFacturas"}>Aprobación de Facturas</div>
                <div class="menuItem" @click=${this.click} .option=${"consultaFacturas"}>Consultar Facturas</div>
                <div class="menuItem" @click=${this.click} .option=${"bonos"}>Presentar Facturas</div>

<!--                 <div class="menuItem select" dark .option=${""}>
                    <label></label>
                    <select id="usuario" style="background-color:var(--primary-color)" @change="${this.cambioPrestador}">
                        ${this.usuario.map((item, index) => {
                            return html`<option ?selected="${index == 0}" value="${item.Lifnr}">${item.Name1}</option>`;
                        })}
                    </select>
                </div> -->
                <div class="menuItem" @click=${this.click} .option=${"ayuda"}>Ayuda</div>
                <div class="menuItem" @click=${this.click} .option=${"logout"}>Salir</div>
            </div>
        `;
    }

/*     cambioPrestador(e) {
        store.dispatch(setPrestador(e.currentTarget.value));
        store.dispatch(getCurrentCabecera(e.currentTarget.value, store.getState().periodo.periodoActual));
    } */

    gestos(e) {
        if (this.mediaSize != "large") {
            if (e.detail.ACTION == "move") {
                if (e.detail.dx > 0) {
                    this.arrastrando = true;
                    this.opciones.style.right = -e.detail.dx + "px";
                }
            }
            if (e.detail.ACTION == "end" && e.detail.LEFT_TO_RIGHT) {
                this.arrastrando = false;
                if (e.detail.dx > 40) {
                    this.toggleMenu();
                } else {
                    this.opciones.style.right = "0";
                    this.update();
                }
            }
        }
    }
    toggleMenu() {
        this.visible = !this.visible;
        this.opciones.style.right = this.visible ? "0" : "-100%";
        this.update();
    }

    click(e) {
        if (e.currentTarget.option == "ayuda") {
            window.open("./ayuda.html", "_blank");

            return;
        }
        if (e.currentTarget.option == "logout") {
            try {
                navigator.credentials.preventSilentAccess();
            } catch {}
            store.dispatch(logout());
        } else {
            store.dispatch(goTo(e.currentTarget.option));
        }
        this.update();
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = ["factura"].includes(state.screen.name);
            if (isInLayout(state, this.area) && !isCurrentScreen) {
                //activo evento de gestos
                this.opciones = this.shadowRoot.querySelector("#opciones");
                gestures(this.opciones, this.gestos, this);
                this.hidden = false;
            }

            this.update();
        }
        if (name == USUARIO) {
            this.usuario = state.autorizacion.usuario;
            // agrego usuario para test
            //this.usuario.push({ Lifnr: 1566, Name1: "Test" });
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
            visible: {
                type: Boolean,
                reflect: true,
            },
            arrastrando: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("menu-principal", menuPrincipal);
