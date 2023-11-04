import { REGISTER, LOGIN } from "./actionTypes";

export function register() {
    return {
        type: REGISTER
    };
}

export function login() {
    return {
        type: LOGIN
    };
}