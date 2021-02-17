/** @format */

///DEMO EN:
///https://codepen.io/Paolo-Duzioni/pen/ZoRabJ spinner de 1 a 8
///https://codepen.io/declandewet/pen/aivLf spinner 9
import { html, LitElement } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
export class SpinnerLoading extends connect(store, "api.loading")(LitElement) {
    constructor() {
        super();
        this.oculto = true;
        this.type = "spinner1";
    }
    render() {
        return html` <style>
                :host {
                    position: fixed;
                    left: 50vw;
                    top: 50vh;
                    transform: translate(-50%, -50%);
                    z-index: 100000;
                    width: 3rem;
                    height: 3rem;
                }
                :host([hidden]) {
                    display: none;
                }

                .spinner1 {
                    width: 100%;
                    height: 100%;
                    border: 3px solid rgba(255, 255, 255, 0.25);
                    border-top-color: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    -webkit-animation: rotation 0.8s ease infinite;
                    animation: rotation 0.8s ease infinite;
                }
                .spinner2 {
                    width: 100%;
                    height: 100%;
                    border: 3px solid transparent;
                    border-top-color: var(--color-naranja);
                    border-bottom-color: var(--color-amarillo);
                    border-radius: 50%;
                    -webkit-animation: rotation 0.8s ease infinite;
                    animation: rotation 0.8s ease infinite;
                }
                .spinner3 {
                    width: 100%;
                    height: 100%;
                    border-top: 3px solid rgba(0, 0, 0, 0.5);
                    border-right: 3px solid transparent;
                    border-radius: 50%;
                    -webkit-animation: rotation 0.8s linear infinite;
                    animation: rotation 0.8s linear infinite;
                }
                .spinner4 {
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    -webkit-animation: flip 1.2s ease infinite;
                    animation: flip 1.2s ease infinite;
                }
                .spinner5 {
                    width: 100%;
                    height: 100%;
                    margin-top: 2rem;
                    overflow: hidden;
                    position: relative;
                    height: 0.5rem;
                    background: rgba(255, 255, 255, 0.25);
                }
                .spinner5::before {
                    content: "";
                    position: absolute;
                    left: -130%;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    -webkit-animation: progress 4s linear infinite;
                    animation: progress 4s linear infinite;
                }
                .spinner6 {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 45%;
                    left: 50%;
                    background: #fff;
                    border-radius: 50%;
                    -webkit-animation: pulse 1s ease-in-out infinite;
                    animation: pulse 1s ease-in-out infinite;
                    -webkit-transform: translate(-50%, -50%) scale(0);
                    transform: translate(-50%, -50%) scale(0);
                }
                .spinner7 {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                .spinner7::before,
                .spinner7::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    -webkit-transform: translate(-50%, -50%) scale(0);
                    transform: translate(-50%, -50%) scale(0);
                }
                .spinner7::before {
                    background: #fff;
                    -webkit-animation: pulse2 2s ease-in-out infinite;
                    animation: pulse2 2s ease-in-out infinite;
                }
                .spinner7::after {
                    background: #fff;
                    -webkit-animation: pulse2 2s 1s ease-in-out infinite;
                    animation: pulse2 2s 1s ease-in-out infinite;
                }
                .spinner8 {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    -webkit-perspective: 200px;
                    perspective: 200px;
                }
                .spinner8::before {
                    display: block;
                    content: "";
                    width: 50%;
                    height: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    -webkit-animation: 2s flipWalker ease infinite;
                    animation: 2s flipWalker ease infinite;
                }

                @-webkit-keyframes rotation {
                    from {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    to {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }

                @keyframes rotation {
                    from {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }
                    to {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }
                @-webkit-keyframes flip {
                    0% {
                        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
                        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
                    }
                    50% {
                        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
                        transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
                    }
                    100% {
                        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
                        transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
                    }
                }
                @keyframes flip {
                    0% {
                        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
                        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
                    }
                    50% {
                        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
                        transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
                    }
                    100% {
                        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
                        transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
                    }
                }
                @-webkit-keyframes progress {
                    0% {
                        left: -130%;
                        background: rgba(0, 0, 0, 0.5);
                    }
                    50% {
                        left: 130%;
                        background: rgba(0, 0, 0, 0.5);
                    }
                    51% {
                        background: rgba(255, 255, 255, 0.5);
                    }
                    100% {
                        background: rgba(255, 255, 255, 0.5);
                    }
                }
                @keyframes progress {
                    0% {
                        left: -130%;
                        background: rgba(0, 0, 0, 0.5);
                    }
                    50% {
                        left: 130%;
                        background: rgba(0, 0, 0, 0.5);
                    }
                    51% {
                        background: rgba(255, 255, 255, 0.5);
                    }
                    100% {
                        background: rgba(255, 255, 255, 0.5);
                    }
                }
                @-webkit-keyframes pulse {
                    0% {
                        -webkit-transform: translate(-50%, -50%) scale(0);
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        -webkit-transform: translate(-50%, -50%) scale(1);
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
                @keyframes pulse {
                    0% {
                        -webkit-transform: translate(-50%, -50%) scale(0);
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        -webkit-transform: translate(-50%, -50%) scale(1);
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
                @-webkit-keyframes pulse2 {
                    0%,
                    100% {
                        -webkit-transform: translate(-50%, -50%) scale(0);
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    50% {
                        -webkit-transform: translate(-50%, -50%) scale(1);
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
                @keyframes pulse2 {
                    0%,
                    100% {
                        -webkit-transform: translate(-50%, -50%) scale(0);
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    50% {
                        -webkit-transform: translate(-50%, -50%) scale(1);
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
                @-webkit-keyframes flipWalker {
                    0% {
                        -webkit-transform: translate(0, 0) rotateX(0) rotateY(0);
                        transform: translate(0, 0) rotateX(0) rotateY(0);
                    }
                    25% {
                        -webkit-transform: translate(100%, 0) rotateX(0) rotateY(180deg);
                        transform: translate(100%, 0) rotateX(0) rotateY(180deg);
                    }
                    50% {
                        -webkit-transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
                        transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
                    }
                    75% {
                        -webkit-transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
                        transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
                    }
                    100% {
                        -webkit-transform: translate(0, 0) rotateX(0) rotateY(360deg);
                        transform: translate(0, 0) rotateX(0) rotateY(360deg);
                    }
                }
                @keyframes flipWalker {
                    0% {
                        -webkit-transform: translate(0, 0) rotateX(0) rotateY(0);
                        transform: translate(0, 0) rotateX(0) rotateY(0);
                    }
                    25% {
                        -webkit-transform: translate(100%, 0) rotateX(0) rotateY(180deg);
                        transform: translate(100%, 0) rotateX(0) rotateY(180deg);
                    }
                    50% {
                        -webkit-transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
                        transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
                    }
                    75% {
                        -webkit-transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
                        transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
                    }
                    100% {
                        -webkit-transform: translate(0, 0) rotateX(0) rotateY(360deg);
                        transform: translate(0, 0) rotateX(0) rotateY(360deg);
                    }
                }

                .spinner9 {
                    backface-visibility: hidden;
                    opacity: 0.7;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    margin-top: -50px;
                    margin-left: -50px;
                    height: 100px;
                    width: 100px;
                    background: none;
                    border-radius: 100px;
                    border-top: 15px solid cyan;
                    border-bottom: 15px solid cyan;
                    border-left: 15px solid transparent;
                    border-right: 15px solid transparent;
                    animation: spin 10s infinite alternate linear, glow 5s infinite alternate linear;
                }

                .spinner9:before {
                    content: "";
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                    background: none;
                    position: relative;
                    top: -30px;
                    left: -30px;
                    z-index: -1;
                    border-radius: 115px;
                    border: 15px solid cyan;
                    border-top: 15px solid transparent;
                    border-bottom: 15px solid transparent;
                    animation: spin2 5s infinite alternate linear, glow 3s infinite alternate linear;
                }

                .spinner9:after {
                    content: "";
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 30px;
                    background: none;
                    position: relative;
                    top: -205px;
                    left: -45px;
                    z-index: -2;
                    border-radius: 130px;
                    border: 15px solid cyan;
                    border-left: 15px solid transparent;
                    border-bottom: 15px solid transparent;
                    animation: spin 2s infinite alternate ease both, glow 10s infinite alternate linear;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(360deg);
                    }
                    100% {
                        transform: rotate(0deg);
                    }
                }

                @keyframes spin2 {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes glow {
                    0% {
                        box-shadow: none;
                    }
                    50% {
                        box-shadow: 10px -10px 30px cyan, -10px 10px 30px cyan;
                    }
                    100% {
                        box-shadow: none;
                    }
                }
            </style>
            <div id="spinner" class="spinner ${this.type}"></div>`;
    }
    stateChanged(state, name) {
        this.oculto = state.api.loading == 0;
    }
    set oculto(value) {
        if (value) {
            this.setAttribute("hidden", "");
        } else {
            this.removeAttribute("hidden");
        }
    }

    static get properties() {
        return {
            type: {
                type: String,
                reflect: true,
            },
        };
    }
}
window.customElements.define("spinner-loading", SpinnerLoading);
