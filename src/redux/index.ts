import { store } from "./store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export {store }from "./store";



export type ReduxState = ReturnType<typeof store.getState>


export type AppDispatch = ThunkDispatch<ReduxState, any, Action>
