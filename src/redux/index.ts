import { store } from "./store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export {store }from "./store";

export {logInUserAction, signUpUserAction} from './firebase/authentication/authActions'


export type ReduxState = ReturnType<typeof store.getState>


export type AppDispatch = ThunkDispatch<ReduxState, any, Action>