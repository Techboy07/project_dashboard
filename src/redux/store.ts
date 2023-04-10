
import { authReducer } from "./firebase/authentication/authReducer"
import { applyMiddleware } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { createStore, combineReducers } from "redux"
import { drawerReducer } from "./ui/drawer/drawerAction"
import { notesReducer } from "./firebase/database/notesReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { userPreferenceReducer } from "./firebase/userPreference/userPreferenceAction"
const rootReducer = combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
    notes: notesReducer,
    userpreference: userPreferenceReducer
})


export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
))