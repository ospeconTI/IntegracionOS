/** @format */

/**
 *
 * @param {HTMLElement} gestureTarget - objeto del DOM al cual se le aplicaran los gestos
 * @param {function} method - metodo a ejecutar cuando se dispara un evento touch
 * @param {object} context - contexto sobre el cual se ejecutara el metodo (ej:. this)
 */
export const gestures = (gestureTarget, method, context) => {
    let x = 0;
    let y = 0;

    const addEvents = () => {
        if (!gestureTarget.__hasGestures) {
            gestureTarget.addEventListener("touchstart", touchstart, false);
            gestureTarget.addEventListener("touchmove", touchmove, false);
            gestureTarget.addEventListener("touchcancel", touchcancel, false);
            gestureTarget.addEventListener("touchend", touchend, false);
            gestureTarget.addEventListener("gestures", method.bind(context));
            gestureTarget.__hasGestures = true;
        }
    };

    const touchstart = (e) => {
        if (e.changedTouches.length > 0) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
            let detail = {
                RIGHT_TO_LEFT: false,
                LEFT_TO_RIGHT: false,
                DOWN: false,
                UP: false,
                FINGERS: e.changedTouches.length,
                ACTION: "start",
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
                dx: 0,
                dy: 0,
            };

            const event = new CustomEvent("gestures", { detail: detail });

            gestureTarget.dispatchEvent(event);
        }
    };

    const touchmove = (e) => {
        let detail = {
            RIGHT_TO_LEFT: false,
            LEFT_TO_RIGHT: false,
            DOWN: false,
            UP: false,
            FINGERS: e.changedTouches.length,
            ACTION: "move",
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY,
            dx: e.changedTouches[0].pageX - x,
            dy: e.changedTouches[0].pageY - y,
        };

        const event = new CustomEvent("gestures", { detail: detail });

        gestureTarget.dispatchEvent(event);
    };

    const touchend = (e) => {
        if (e.changedTouches.length > 0) {
            let detail = {
                RIGHT_TO_LEFT: x > e.changedTouches[0].pageX,
                LEFT_TO_RIGHT: x < e.changedTouches[0].pageX,
                DOWN: y < e.changedTouches[0].pageY,
                UP: y > e.changedTouches[0].pageY,
                FINGERS: e.changedTouches.length,
                ACTION: "end",
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
                dx: e.changedTouches[0].pageX - x,
                dy: e.changedTouches[0].pageY - y,
            };

            x = 0;
            y = 0;

            const event = new CustomEvent("gestures", { detail: detail });

            gestureTarget.dispatchEvent(event);
        }
    };

    const touchcancel = (e) => {};
    addEvents();
};
