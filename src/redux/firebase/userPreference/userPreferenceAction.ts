import { Action, Reducer } from "redux";

export const GET_USER_PREFERENCE = "GET_USER_PREFERENCE";
export const SET_USER_PREFERENCE = "SET_USER_PREFERENCE";




export interface userPreferenceStateObject {
    accent: "primary" | "error" | "secondary" | "info" | "success" | "warning"
    mode: boolean;
    nickname: string;
    id: string
}
const userPreferenceState: userPreferenceStateObject = {
    accent: 'primary',
    mode: true,
    nickname: 'newUser',
    id: 'LHeZBlyuKHt3W0znG2Lj'
};



export const getUserPreferenceAction = ({ mode, accent, nickname, id }: userPreferenceStateObject) => {
    return {
        type: GET_USER_PREFERENCE,
        payload: { mode, accent, nickname, id }
    }
}
type updatePreference = ReturnType<typeof getUserPreferenceAction>

export const setUserPreference = ({ mode, accent, nickname, id }: userPreferenceStateObject) => {
    return {
        type: SET_USER_PREFERENCE,
        payload: { mode, accent, nickname, id }
    }
}


export const userPreferenceReducer: Reducer<userPreferenceStateObject, updatePreference> = (state: userPreferenceStateObject = userPreferenceState, action: updatePreference) => {
    switch (action.type) {
        case GET_USER_PREFERENCE: return {
            ...state, ...action.payload
        }
        case SET_USER_PREFERENCE: return {
            ...state, ...action.payload
        }

        default: return state
    }
}