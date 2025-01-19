import { Navigate, Outlet } from "react-router-dom"
import { UseAuth } from "../context/auth/authContext";

export const ProtectedRoute = () => {
    const { isauthenticated } = UseAuth();

    if (!isauthenticated){
        return <Navigate to='/login' />
    }
    return <Outlet />
}