import { Action, Reducer } from "redux";
import { projectObject } from "../../pages/ProjectPage";

interface GetAction extends Action{
payload: any
}

type projectsAction = (payload: projectObject[])=> GetAction

interface projectsState {
projects: projectObject[]
}  

const GET_PROJECTS = "GET_PROJECTS" 

export const getProjectsAction: projectsAction = (payload)=>{
return {type : GET_PROJECTS,payload: payload}
}

const initialProjectsState: projectsState = {
projects: []
}


const projectsReducer:Reducer<projectsState, GetAction> = (state:projectsState=initialProjectsState ,action:GetAction)=>{
switch (action.type) {
    case GET_PROJECTS: return {
...state, projects: action.payload
    }
default: return state
}
}

export default projectsReducer
