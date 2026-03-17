import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { api } from '../services/api'

interface User {
    sub: string
    email: string
    role: 'ADMIN' | 'USER'
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    register: (userName: string, email: string, password: string) => Promise<void>
    logout: () => void
    isAdmin: boolean
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);

            const payload = JSON.parse(atob(storedToken.split('.')[1]));
            setUser(payload);
        }
    }, [])

    async function login(email: string, password: string) {
        const response = await api.post('/auth/login', { email, password });
        const { access_token } = response.data;

        localStorage.setItem('token', access_token)
        setToken(access_token);

        const payload = JSON.parse(atob(access_token.split('.')[1]));
        setUser(payload);
    }

    async function register(userName: string, email: string, password: string) {
        await api.post('/auth/registe', { userName, email, password });
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            isAdmin: user?.role === 'ADMIN',
            isAuthenticated: !!token,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
