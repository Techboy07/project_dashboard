import { GET_NOTES, EDIT_NOTES, DELETE_NOTES, CREATE_NOTES, GET_NOTES_REQUEST, GET_NOTES_FAILED } from "./notesTypes";
import { noteObject } from "../../../pages/NotesPage";
import { Action, Reducer } from "redux";
interface notesStateObject {
    loading: boolean;
    notes: noteObject[];
    error: boolean
}

const notesState: notesStateObject = {
    loading: false,
    notes: [],
    error: false
}
interface notesAction extends Action {
    notes: noteObject[]
}


export const notesReducer: Reducer<notesStateObject, notesAction> = (state: notesStateObject = notesState, action: notesAction) => {
    switch (action.type) {
        case GET_NOTES_REQUEST: return {
            ...state, loading: true
        }

        case GET_NOTES: return {
            ...state, loading: false,
            notes: action.notes
        }
        case GET_NOTES_FAILED: return {
            ...state, loading: false, error: true
        }
        default: return state
    }

}


