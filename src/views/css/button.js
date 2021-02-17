/** @format */

import { css } from "lit-element";

export const button = css`
    button[btn1] {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        grid-gap: 0.3rem;
        cursor: pointer;
        color: var(--color-crudo);
        fill: var(--primary-color);
        stroke: var(--primary-color);
        background-color: var(--primary-color);
        font-size: var(--font-bajada-size);
        font-weight: var(--font-bajada-weight);
        border-radius: 0.4rem;
        padding: 0.5rem;
        box-shadow: 0 3px 6px 0 var(--orange-5);
        transition-duration: 0.4s;
        text-decoration: none;
        border: none;
        outline: none;
    }
    button:not([disabled])[btn1]:hover {
        background-color: var(--color-azul-oscuro);
    }
    button[btn1]:active {
        background-color: var(--primary-color);
        box-shadow: 0.2rem var(--color-azul-oscuro);
        transform: translateY(0.2rem);
    }
    button[btn1][disabled] {
        opacity: 0.8;
        background-color: var(--color-gris);
        cursor: not-allowed;
        pointer-events: none;
    }

    button[btn2] {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        grid-gap: 0.3rem;
        cursor: pointer;
        color: var(--primary-color);
        fill: var(--primary-color);
        stroke: var(--primary-color);
        background-color: transparent;
        font-size: var(--font-bajada-size);
        font-weight: var(--font-bajada-weight);
        border-radius: 0.4rem;
        padding: 0.5rem;
        box-shadow: 0 3px 6px 0 var(--orange-5);
        transition-duration: 0.4s;
        text-decoration-line: underline;
        text-decoration-style: solid;
        border: none;
        outline: none;
    }
    button:not([disabled])[btn2]:hover {
        color: var(--color-azul-oscuro);
    }
    button[btn2]:active {
        color: var(--primary-color);
        transform: translateY(0.2rem);
    }
    button[btn2][disabled] {
        opacity: 0.8;
        color: var(--color-gris);
        cursor: not-allowed;
        pointer-events: none;
    }

    button[btn3] {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        grid-gap: 0.3rem;
        cursor: pointer;
        color: var(--primary-color);
        background-color: transparent;
        font-size: var(--font-bajada-size);
        font-weight: var(--font-bajada-weight);
        border-radius: 0.4rem;
        border: 1px solid var(--primary-color);
        padding: 0.5rem;
        box-shadow: 0 3px 6px 0 var(--orange-5);
        transition-duration: 0.4s;
        text-decoration: none;
        outline: none;
    }
    button:not([disabled])[btn3]:hover {
        background-color: var(--color-azul-oscuro);
    }
    button[btn3]:active {
        background-color: var(--color-negro);
        box-shadow: 0.2rem var(--color-azul-oscuro);
        transform: translateY(0.2rem);
    }
    button[btn3][disabled] {
        opacity: 0.8;
        background-color: var(--color-gris);
        cursor: not-allowed;
        pointer-events: none;
    }
`;
