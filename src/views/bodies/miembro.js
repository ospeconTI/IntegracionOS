/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goNext, goTo, goHistoryPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showError, velo, verPantallaMiembro, verPantallaLogin, showWarning } from "../../redux/ui/actions";

import { logon, LOGON_ERROR } from "../../redux/autorizacion/actions";

import { input } from "../css/input";
import { button } from "../css/button";
import { ATRAS } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";

const LOGON_OK = "autorizacion.logonTimeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class pantallaMiembro extends connect(store, LOGON_OK, MEDIA_CHANGE, SCREEN)(LitElement) {
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
                padding: 1.7rem;
                display: grid;
                grid-auto-flow: rows;
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
                <div class="grid no-padding" id="titulo">
                    <button btn2 id="botonAtras" class="button" @click="${this.atras}">${ATRAS}</button>
                    <h3>Solicitar alta en el sistema</h3>
                </div>

                <div class="input">
                    <label>Mail</label>
                    <input id="correo" type="email" value="" placeholder="juan@acme.com" />
                </div>

                <button id="boton" @click="${this.submit}" btn1>Enviar Solicitud</button>
            </div>
        `;
    }
    atras() {
        store.dispatch(goTo("login"));
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

    submit(e) {
        if (store.getState().api.loading == 0) {
            let errores = this.validarCampos();
            [].forEach.call(this.shadowRoot.querySelectorAll(".error"), (element) => {
                element.classList.remove("error");
            });
            if (!errores) {
                //store.dispatch(showSpinner())
                const mail = this.shadowRoot.getElementById("correo").value;
                store.dispatch(logon(mail));
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
            const SeMuestraEnUnasDeEstasPantallas = "-serMiembro-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false;
            }
            this.update();
        }

        if (name == LOGON_OK) {
            if (state.autorizacion.logonMessage == "") {
                store.dispatch(goTo("login"));
                alert("Se ha enviado un correo a su cuenta de mail para el alta de usuario. Verifique");
            } else {
                alert(state.autorizacion.logonMessage);
            }
        }
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
window.customElements.define("pantalla-miembro", pantallaMiembro);
