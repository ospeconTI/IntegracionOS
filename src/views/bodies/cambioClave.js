/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

import { merakiRecuperoFetch } from "../../redux/fetchs";
import { selection, velo, verPantallaLogin, verPantallaCambioClave, showWarning } from "../../redux/ui/actions";
import { recupero } from "../../redux/autorizacion/actions";

import { goHistoryPrev, goTo } from "../../redux/routing/actions";

import { input } from "../css/input";
import { button } from "../css/button";
import { ATRAS } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const RECUPERO_OK = "autorizacion.recuperoTimeStamp";

export class pantallaCambioClave extends connect(store, RECUPERO_OK, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES";
        this.hidden = true;
        this.area = "body";
    }

    static get styles() {
        return css`
            ${input}
            ${button}
            ${gridLayout}

        :host {
                display: grid;
                height: 100vh;
                place-content: center;
            }
            :host([hidden]) {
                display: none;
            }

            :host([media-size="small"]) .tarjeta {
                min-width: 70vw;
                padding: 1rem;
            }

            :host([media-size="medium"]) .tarjeta {
                min-width: 50vw;
                padding: 1rem;
            }

            .tarjeta {
                width: 40vw;
                background-color: var(--color-blanco);
                padding: 2rem;
                display: grid;
                grid-auto-flow: rows;
                grid-gap: 1rem;
            }
            button[btn2] {
                justify-self: center;
            }
            #titulo {
                display: grid;
                grid-template-columns: auto 1fr;
            }
            h3 {
                padding: 0;
                margin: 0;
                justify-self: center;
            }
        `;
    }

    render() {
        return html`
            <div class="tarjeta">
                <div class="grid" id="titulo">
                    <button btn2 id="botonAtras" class="button no-padding" @click="${this.atras}">${ATRAS}</button>
                    <h3>Solicitar recupero de Clave</h3>
                </div>

                <div class="input">
                    <label>Mail</label>
                    <input id="correo" type="email" value="" placeholder="juan@acme.com" />
                </div>
                <div id="detalle" class="lbl"></div>

                <button btn1 @click="${this.password}" id="boton">Solicitar recupero</button>
            </div>
        `;
    }
    atras() {
        store.dispatch(goTo("login"));
    }

    password() {
        if (store.getState().api.loading == 0) {
            let errores = this.validarCampos();
            [].forEach.call(this.shadowRoot.querySelectorAll(".error"), (element) => {
                element.classList.remove("error");
            });
            if (!errores) {
                store.dispatch(recupero(this.shadowRoot.querySelector("#correo").value));
            } else {
                alert(errores[0].mensaje);
            }
        }
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-cambioClave-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false;
            }
            this.update();
        }
        if (name == RECUPERO_OK) {
            if (state.autorizacion.recuperoMessage == "") {
                store.dispatch(goTo("login"));
                alert("Se ha enviado un correo a su cuenta de mail para el recupero de su clave. Verifique");
            } else {
                alert(state.autorizacion.recuperoMessage);
            }
        }
    }

    validaMail(email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }
    validarCampos() {
        const errores = [];
        const correo = this.shadowRoot.querySelector("#correo").value;
        if (correo == "" || !this.validaMail(correo)) {
            errores.push({
                campo: "correo",
                mensaje: "Mail Incorrecto",
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
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("pantalla-cambioclave", pantallaCambioClave);
