import React, { createContext, useReducer } from "react"
import { apiTienda } from "../api/apiTienda";
import authReducer from "../reducer/authReducer";
import { Cliente } from "../Types/interfaces";

export type AuthState = {
    id: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
    id: "",
    name: "",
    email: "",
    isAuthenticated: false
}

interface authContextType {
    auth: AuthState;
    login: (email: string, password: string, callback: (message: string) => void) => void;
    logout: () => void;
}

export const authContext = createContext<authContextType>({} as authContextType);

const AuthContextProvider = ({ children }: any) => {

    const [auth, dispatch] = useReducer(authReducer, initialAuthState);

    const login = async (email: string, password: string, callback: (message: string) => void) => {

        const body = {
            email,
            password
        }


        try {

            const res = await apiTienda.post<Cliente>('/login', {
                ...body
            });

            const { success, data, message } = res.data;

            callback(message);

            if (!success) {
                return;
            }

            const { id, email, nombres: name } = data;

            dispatch({
                type: "login",
                payload: { id, name, email, isAuthenticated: true }
            });

        } catch (error) {
            callback("Error en Server Login");
            console.log("Error Login Context");
            console.log(error);
        }

    }

    const logout = () => {

    }

    return (
        <authContext.Provider value={{
            auth,
            login,
            logout
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;
