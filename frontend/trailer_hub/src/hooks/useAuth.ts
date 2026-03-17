import { useState } from "react";
import { api } from "../services/api";

export function useAuth() {
    const [loading, setLoading] = useState(false);

    async function login(email: string, password: string) {
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);

            return response.data;
        } finally {
            setLoading(false);
        }
    }

    async function register(data: any) {
        setLoading(true);

        try {
            const response = await api.post('/auth/register', data);
            return response.data;
        } finally {
            setLoading(false);
        }
    }

    return {
        login,
        register,
        loading,
    };
}