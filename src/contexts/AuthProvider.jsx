import { createContext, useContext, useReducer } from "react";



const authcontext = createContext();

const initialState = {
    user: null,
 
    isAuthonicated:false
    
}
const FAKE_USER = {
    name: "Bashir",
    email: "bashka@example.com",
    password: "qwerty",
    avatar: "../prof.png"
  };
function reducer(state, action) {
    

    switch (action.type) {
        case "login":
            return { ...state, isAuthonicated: true, user: action.payload }
            case "logout":
                return{ ...state, isAuthonicated:false, user:null}
    }
}
function AuthProvider({children}) {

    const [{ user,  isAuthonicated}, dispatch] = useReducer(reducer, initialState);

    function LogIn( email, pass) {
        if (FAKE_USER.email === email && FAKE_USER.password === pass)
        dispatch({type:"login",payload:FAKE_USER})
        
    }
    function LogOut() {

    dispatch({type:"logout"})
    }
    


    return (
        <authcontext.Provider
            value={{
                LogIn,
                LogOut,
                user,
                isAuthonicated
        }}
        >
            {
                children
            }
        </authcontext.Provider>
    )
}

function useAuth() {
    const context = useContext(authcontext);
    if (context === "undefined")
        throw new Error("Out of the Auth Context");
    return context;
}

export { AuthProvider, useAuth };

