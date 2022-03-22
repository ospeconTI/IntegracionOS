/** @format */

import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_MEDIA,
    SET_MEDIA_ORIENTATION,
    SELECTION,
    VELO,
    VER_PANTALLA_LOGIN,
    VER_PANTALLA_MIEMBRO,
    VER_PANTALLA_CAMBIO_CLAVE,
    VER_PANTALLA_PASES,
    VER_PANTALLA_CAMBIO_ADMINISTRADOR,
    VER_PANTALLA_CAMBIO_NOMBRE_CUENTA,
    VER_PANTALLA_USUARIO_ASIGNAR,
    SHOW_WARNING,
    HIDE_WARNING,
    SHOW_CONFIRM,
    STEP,
} from "./actions";

const initialState = {
    spinner: {
        loading: 0,
    },
    error: {
        message: "",
        timestamp: null,
    },
    media: {
        size: "large",
        orientation: "landscape",
        timeStamp: null,
    },
    menu: {
        timeStamp: null,
        option: "",
    },

    warning: {
        pagina: "",
        nroWarning: -1,
        backgroundColor: "fondoInformacion",
        timeStamp: null,
        hidden: true,
        tineOut: 1500,
    },
    loginOk: false,
    steps: {
        step: 1,
    },
    confirm: {
        timeStamp: null,
        titulo: "",
        pregunta: "",
        onOK: null,
        onCancel: null,
    },
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.spinner.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.spinner.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = action.message;
            break;
        case HIDE_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = null;
            break;
        case SET_MEDIA:
            newState.media.size = action.size;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SET_MEDIA_ORIENTATION:
            newState.media.orientation = action.orientation;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SELECTION:
            newState.menu.timeStamp = new Date().getTime();
            newState.menu.option = action.option;
            break;
        case SHOW_WARNING:
            newState.warning.timeStamp = new Date().getTime();
            newState.warning.pagina = action.pagina;
            newState.warning.backgroundColor = action.backgroundColor;
            newState.warning.nroWarning = action.nroWarning;
            newState.warning.hidden = false;
            newState.warning.timeOut = action.timeOut;
            break;
        case HIDE_WARNING:
            newState.warning.timeStamp = new Date().getTime();
            newState.warning.pagina = "";
            newState.warning.nroWarning = -1;
            newState.warning.hidden = true;
            newState.warning.timeOut = 1500;
            break;
        case STEP:
            newState.steps.step = action.step;
            break;
        case SHOW_CONFIRM:
            newState.confirm.timeStamp = new Date().getTime();
            newState.confirm.titulo = action.titulo;
            newState.confirm.pregunta = action.pregunta;
            newState.confirm.onOK = action.onOK;
            newState.confirm.onCancel = action.onCancel;
            break;
    }
    return newState;
};
