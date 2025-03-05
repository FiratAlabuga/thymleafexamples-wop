import {useContext, useState} from 'react';
import { authApi } from '../api/authApi';
import {AuthContext} from "../context/AuthContext.tsx";

export const useAuth = () => {
    const [user, setUser] = useState(null);

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const login = async (credentials: { username: string; password: string }) => {
        const response = await authApi.login(credentials);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const register = async (userData: any) => {
        const response = await authApi.register(userData);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user,context, login, register, logout };
};