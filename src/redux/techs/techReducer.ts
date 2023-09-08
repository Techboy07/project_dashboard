import { Action, Reducer } from "redux";
import { techObject } from "../../pages/TechPage";

interface GetAction extends Action{
payload: any
}

type techAction = (payload: techObject[])=> GetAction

interface techsState {
techs: techObject[]
}  

const GET_TECHS = "GET_TECHS" 

export const getTechsAction: techAction = (payload)=>{
return {type : GET_TECHS,payload: payload}
}

const initialTechsState: techsState = {
techs: []
}


const techReducer:Reducer<techsState, GetAction> = (state:techsState=initialTechsState ,action:GetAction)=>{
switch (action.type) {
    case GET_TECHS: return {
...state, techs: action.payload
    }
default: return state
}
}

export default techReducer
