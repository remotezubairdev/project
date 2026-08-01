import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
export default function ProtectedRoute({ children }) {
    const { loading, user } = useAuth();
    if (loading) {
        return <Loading message="Logging you in" />
    }
    return user ? <Outlet /> : <Navigate to="/login" />;
}