import { createContext, useEffect, useReducer } from "react";

export const AuthContext=createContext(); //this context will be used to share authentication state throughout the application

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

    //useReducer is alternative to useState for managing more complex state logic, especially when the state transitions depend on previous state or involve multiple sub-values
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

