/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { gridLayout } from "../css/gridLayout";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const STEPS = "ui.steps.step";

export class stepsComponent extends connect(store, MEDIA_CHANGE, SCREEN, STEPS)(LitElement) {
    constructor() {
        super();
        this.area = "header";
        this.steps = [
            {
                step: 1,
                description: "Elegí el período autorizado",
            },
            {
                step: 2,
                description: "Ingresá los datos de la factura",
            },
            {
                step: 3,
                description: "Subí las imágenes correspondintes",
            },
            {
                step: 4,
                description: "Verificá los datos y presentá",
            },
        ];
        this.currentStep = 1;
    }
    static get styles() {
        return css`
            ${gridLayout}
            :host {
                box-sizing: border-box;
                display: grid;
                align-content: center;
                gap: 0.7rem;
                color: white;
            }
            :host([hidden]) {
                display: none;
            }
            .rout {
                display: grid;
                grid-auto-flow: column;
                align-items: center;
            }
            .step {
                display: grid;
                align-items: center;
                grid-template-columns: 1fr auto 1fr;
            }
            .check-point {
                border: 2px solid;
                width: 2rem;
                height: 2rem;
                display: grid;
                place-content: center;
            }
            .linea {
                height: 2px;
                background-color: white;
            }
            .descrip {
                color: white;
                font-size: 0.7rem;
                justify-self: center;
            }
            *[done] {
                color: var(--primary-color) !important;
            }
            .step[done] .linea {
                background-color: var(--primary-color) !important;
            }

            .step[current] .check-point {
                border-style: dotted;
            }
        `;
    }
    render() {
        return html`
            <div class="rout">
                ${this.steps.map((s) => {
                    return html`
                        <div class="step" ?done=${this.currentStep > s.step} ?current=${this.currentStep == s.step}>
                            <div class="linea"></div>
                            <div class="check-point">${s.step}</div>
                            <div class="linea"></div>
                        </div>
                    `;
                })}
            </div>
            <div class="rout">
                ${this.steps.map((s) => {
                    return html` <div class="descrip">${s.description}</div> `;
                })}
            </div>
        `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["factura"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
            this.update();
        }
        if (name == STEPS) {
            this.currentStep = state.ui.steps.step;
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
window.customElements.define("steps-component", stepsComponent);
