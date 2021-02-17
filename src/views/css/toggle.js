/** @format */

import { css } from "lit-element";

export const toggle = css`
    .toggle {
        margin: 0;
        height: 2rem;
        width: 2rem;
        outline: none;
    }
    .toggle:focus {
        border: none;
    }
    .toggle + label {
        height: 2rem;
        width: 2rem;
        display: grid;
        place-content: center;
        background-color: var(--primary-color);
        font-size: 1.5rem;
        color: var(--color-blanco);
        cursor: pointer;
        pointer-events: none;
        z-index: 1;
    }
    .toggle:hover + label * {
        background-color: var(--color-azul-oscuro);
    }
    .toggle:focus + label * {
        background-color: var(--color-celeste);
    }

    .toggle:not(:checked) + label > *:first-child {
        display: none;
    }
    .toggle:checked + label > *:last-child {
        display: none;
    }
`;
