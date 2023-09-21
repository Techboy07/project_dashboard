
import authReducer from "./auth/authReducer"
//import { applyMiddleware } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { createStore, combineReducers } from "redux"
import { drawerReducer } from "./ui/drawer/drawerAction"
import { composeWithDevTools } from "redux-devtools-extension"
import projectsReducer from "./projects/projectReducer"
import techReducer from "./techs/techReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
    projects: projectsReducer,
    techs: techReducer
})


export const store = createStore(rootReducer)
    // other store enhancers if))
