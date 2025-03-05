import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {authApi} from '../api/authApi';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await authApi.login(credentials);
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            setUser({
                username: response.data.username,
                role: response.data.role,
            });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await authApi.register(userData);
            localStorage.setItem('token', response.data.data.token);
            setToken(response.data.data.token);
            setUser({
                username: response.data.data.username,
                role: response.data.data.role,
            });
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Kullanıcı bilgilerini çekmek için bir API isteği yapılabilir
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};