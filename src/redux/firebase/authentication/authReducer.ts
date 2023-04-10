import { Action } from "redux";

import { SIGN_UP_USER, LOG_IN_USER, AUTHENTICATION_REQUEST, AUTHENTICATION_FAILED, LOG_OUT_USER } from "./authTypes";

import { Reducer } from "redux";




;


interface authStateObject {
    isUserAuthenticated: boolean;
    loading: boolean;
    error: any
}


const authState: authStateObject = {
    isUserAuthenticated: false,
    loading: false,
    error: false
}
type authReducer = Reducer<authStateObject>

export const authReducer: authReducer = (state: authStateObject = authState, action: Action) => {


    switch (action.type) {
        case SIGN_UP_USER: return {
            ...state, isUserAuthenticated: true, loading: false
        }
        case LOG_IN_USER: return {
            ...state, isUserAuthenticated: true, loading: false
        }
        case AUTHENTICATION_REQUEST: return {
            ...state, loading: true
        }
        case AUTHENTICATION_FAILED: return {
            ...state, error: true, loading: false
        }
        case LOG_OUT_USER: return {
            ...state,
            isUserAuthenticated: false,
            loading: false,
            error: false
        }
        default: return state

    }

}