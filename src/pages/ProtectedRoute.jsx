import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRoute({ children }) {
    
    const { isAuthonicated } = useAuth();

    const navigate = useNavigate();
    useEffect(function () {
        if (!isAuthonicated) navigate("/")
        
    },[isAuthonicated,navigate])
    return isAuthonicated ? children:""
}

export default ProtectedRoute;

