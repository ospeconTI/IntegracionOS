/** @format */

import { css } from "lit-element";

export const select = css`
    select {
        outline: 0;
        box-shadow: none;
        border: none;
        border: 1px solid var(--color-gris-claro);
        background-image: none;
        background-color: var(--color-blanco);
    }

    select::-ms-expand {
        display: none;
    }

    .select {
        display: grid;
        grid-gap: 0.1rem;
        grid-template-rows: 1fr auto 1fr;
        font-family: inherit;
    }

    select {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        height: 2.5rem;
        color: var(--color-azul-oscuro);
        cursor: pointer;
        font-size: var(--font-bajada-size);
        font-weight: var(--font-bajada-weight);
        border-radius: 5px;
    }
    .select[dark] select {
        color: var(--color-blanco);
        background-color: var(--color-azul-oscuro);
    }
    .select[dark] select option {
        color: var(--color-blanco);
        background-color: var(--color-azul-oscuro);
    }
    option {
        color: var(--color-azul-oscuro);
        padding: 0rem;
        font-size: var(--font-bajada-size);
        font-weight: var(--font-bajada-weight);
        font-family: inherit;
    }

    .select:hover::after {
        color: var(--color-celeste);
    }

    .select label {
        font-size: var(--font-label-size);
        font-weight: var(--font-label-weight);
        color: var(--color-azul-oscuro);
    }
    .select[dark] label {
        color: var(--color-blanco);
    }
`;
