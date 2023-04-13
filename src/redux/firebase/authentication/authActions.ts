import { AnyAction, Action } from 'redux'
import { SIGN_UP_USER, LOG_IN_USER, AUTHENTICATION_FAILED, AUTHENTICATION_REQUEST, LOG_OUT_USER } from './authTypes'
import { firebase } from '../../../firebase/firebase.config'
import { ThunkAction } from 'redux-thunk'


const { signIn, createUser } = firebase()



type authAction = () => Action

export const logInUserAction: authAction = () => {
    return { type: LOG_IN_USER }
}


export const signUpUserAction: authAction = () => {
    return { type: SIGN_UP_USER }
}

export const requestAuthentication: authAction = () => {
    return {
        type: AUTHENTICATION_REQUEST
    }
}
export const denyAuthentication: authAction = () => {
    return {
        type: AUTHENTICATION_FAILED
    }
}
export const revokeAuthentication: authAction = () => {
    return {
        type: LOG_OUT_USER
    }
}



export const authenthicateUser = (authType: string, email: string, password: string, func: Function) => {

    switch (authType) {
        case 'signUp': return (dispatch: Function) => {
            dispatch(requestAuthentication())
            createUser(email, password)
                .then(() => dispatch(signUpUserAction()))
                .then(() => localStorage.setItem('notaculus', JSON.stringify({ email: email, password: password })))
                .then(() => func())
                .catch((err) => dispatch(denyAuthentication()))

        }
        case 'logIn': return (dispatch: any) => {
            dispatch(requestAuthentication())
            signIn(email, password).
                then(() => dispatch(logInUserAction()))
                .then(() => localStorage.setItem('notaculus', JSON.stringify({ email: email, password: password })))
                .then(() => func())
                .catch((err) => dispatch(denyAuthentication()))
        }
        default: return () => {

        }
    }


}