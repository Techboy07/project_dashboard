import { Action, Reducer } from "redux"

export const OPEN_DRAWER = 'OPEN_DRAWER'

export const CLOSE_DRAWER = 'CLOSE_DRAWER'
type drawerAction = () => Action

export const openDrawerAction:drawerAction = () => {
    return{
        type: OPEN_DRAWER
    }
}
export const closeDrawerAction:drawerAction = () => {
    return{
        type: CLOSE_DRAWER
    }
}
interface drawerState{
isOpen: boolean
}

const drawerState:drawerState = {
    isOpen: false
}

export const drawerReducer:Reducer<drawerState> = (state:drawerState=drawerState, action:Action) => {
    switch(action.type){
case OPEN_DRAWER: return{
    ...state, isOpen:true
}
case CLOSE_DRAWER:return{
    ...state, isOpen:false
}
default: return state
    }
}