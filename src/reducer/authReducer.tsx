import { AuthState } from '../context/authContext';

type ActionType =
    | { type: "login", payload: object }
    | { type: "logout" }

const authReducer = (state: AuthState, action: ActionType) => {

    switch (action.type) {

        case "login":
            return {
                ...state,
                ...action.payload,
            };

        case "logout":
            return state;

        default:
            return state;

    }
}

export default authReducer
