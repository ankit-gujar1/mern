import { createContext, useEffect, useReducer } from "react";

export const AuthContext=createContext()

export const authReducer=(state,action)=>{

    switch (action.type) {

        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state;
    }
}

export const AuthContextProvider=({children})=>{

    const [state,dispatch]=useReducer(authReducer,{ //state name is user and dispatch function name is authReducer
        user:null
    })

    useEffect(()=>{
        const u=JSON.parse(localStorage.getItem('user'));

        if(u) dispatch({type:'LOGIN',payload:u})
    },[])

    console.log("AuthContext state",state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

