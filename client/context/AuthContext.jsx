import { createContext, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);

    // register
    const register = async (credentials) => {
        try {
            const { data } = await axios.post(`/api/users/register`, credentials);

            if (data.user) {
                setAuthUser(data.user);
                // axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success("Account registered successfully.");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // login
    const login = async (credentials) => {
        try {
            const { data } = await axios.post(`/api/users/login`, credentials);

            if (data.user) {
                setAuthUser(data.user);
                // axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(`Welcome ${data.user.name}`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    // Logout
    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        // axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successfully");
    }


    const value = {
        authUser,
        register,
        login,
        logout,
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;