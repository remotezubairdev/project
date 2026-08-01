import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.clear()
        setUser(null);
        navigate("/login")
    }

    const checkAuth = async () => {
        const token = localStorage.getItem("access")
        if (!token) {
            setLoading(false);
            navigate("/login");
            return;
        }
        try {
            const response = await api.get("/api/user")
            setUser(response.data)
            navigate("/home")
        } catch (AxiosError) {
            console.error("The server is not working or has not started yet.")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        checkAuth();
    }, [])
    return (
        <AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthContextProvider;