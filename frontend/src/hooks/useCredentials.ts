import type { User } from "@/interfaces/user";
import { logout, restoreLogin } from "@/services/loginService";
import { useEffect, useState } from "react";

export function useCredentials() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [csrfToken] = useState<string | null>(localStorage.getItem('csrfToken'));
    useEffect(() => {
        if (!csrfToken || user) return;
        setLoading(true);
        async function getUserInfo() {
            try {
                const response = await restoreLogin();
                if (response?.success && response?.data) {
                    setUser(response.data)
                } else {
                    setError('Error en el servicio.');
                }
            } catch {
                setError('Error en el servicio.')
            } finally {
                setLoading(false);
            }
        };
        getUserInfo();
    }, [csrfToken, user]);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch {
            setError('Error en el servicio.')
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        error,
        handleLogout
    }
}