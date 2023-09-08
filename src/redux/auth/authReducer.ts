import { Action, Reducer } from 'redux'

type authAction = () => Action

interface authState {
isUserAuthenthicated: boolean;
}


const LOG_IN_USER = 'LOG_IN_USER'
const LOG_OUT_USER = "LOG_OUT_USER"


export const logInUserAction : authAction =  ()=> {
 return {type: LOG_IN_USER}
};


export const logOutUserAction : authAction =  ()=> {
 return {type: LOG_OUT_USER}
};



const initialAuthState: authState = {
isUserAuthenthicated: false,
}



const authReducer: Reducer<authState> = (state:authState = initialAuthState , action: Action ) => {
    switch (action.type) {
        case LOG_IN_USER: return {
...state, isUserAuthenthicated: true
        }
            case LOG_OUT_USER : return {

            ...state, isUserAuthenthicated: false }
        
        default: return state
            
    }
}

export default authReducer
