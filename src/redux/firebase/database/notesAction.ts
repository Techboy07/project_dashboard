import { GET_NOTES, EDIT_NOTES, DELETE_NOTES, CREATE_NOTES, GET_NOTES_REQUEST, GET_NOTES_FAILED } from "./notesTypes";
import { Dispatch, SetStateAction } from "react";
import { noteObject } from "../../../pages/NotesPage";
import { getFirestore, collection, getDocs, doc, deleteDoc, query, where, orderBy, getDoc } from "firebase/firestore";
import { AppDispatch } from "../..";

export const getNotesAction = (notes: noteObject[]) => {
    return {
        type: GET_NOTES,
        notes


    }
}

export const getNotesRequestAction = () => {
    return {
        type: GET_NOTES_REQUEST,

    }
}
export const getNotesFailedAction = (error: any) => {
    return {
        type: GET_NOTES_FAILED,
        error: error
    }
}

export const editNotesAction = () => {
    return {
        type: EDIT_NOTES
    }
}

export const deleteNotesAction = () => {
    return {
        type: DELETE_NOTES
    }
}

export const creatNotesAction = () => {
    return {
        type: CREATE_NOTES
    }
}


export function updateNotes(userEmail: string | null = 'newUser001', func: AppDispatch) {

    func(getNotesRequestAction())
    const db = getFirestore()
    const email = userEmail
    const colRef = collection(db, `users/${email}/notes`)
    const queryRef = query(colRef, where('createdAt', '!=', false), orderBy('createdAt', 'desc'))
    const SnapShot = getDocs(queryRef)
        .then((snapshot) => {
            let userNotes: noteObject[] = []
            snapshot.docs.forEach((doc) => userNotes.push({
                title: doc.data().title,
                createdAt: doc.data().createdAt,
                id: doc.id,
                details: doc.data().details,
                category: doc.data().category
            }))
            return userNotes
        })
    return SnapShot
}
