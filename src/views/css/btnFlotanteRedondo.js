import {
    css
} from "lit-element"

export const btnFlotanteRedondo = css`
#bfrDivMas{
    position:absolute;
    height: 2rem;
    width: 2rem;
    right: 1rem;
    bottom:1rem;
    background-color: var(--color-azul-oscuro); 
    border-radius:50%;
    display: grid;
    align-items:center; 
    justify-content:center;
    box-shadow: var(--shadow-elevation-4-box);
    cursor:pointer;
    z-index:50;
}
#bfrDivMas svg{
    display:flex;
    stroke:var(--color-blanco);
    fill:var(--color-celeste);    
    height: 1.2rem;
    width: 1.2rem;
}
`