import {
    css
} from "lit-element"

export const label = css`
label{
    
    color:var(--color-azul-oscuro);
    font-size:var(--font-label-size);
    border:none;
    background-color:transparent;
    outline:none;
    border-radius:0;
    pointer-events:none;
    font-family:var(--font-label-family);
    font-weight:var(--font-label-weight);
}
label[oculto] {
    display: none;
}
label[error]{
    position: relative;
    transform: translateY(-80%);
    color:var(--color-rojo);
    font-size:var(--font-error-size);
    font-weight:var(--font-error-weight);
    font-family:var(--font-error-family)
}
`