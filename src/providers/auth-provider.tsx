import authService from '@/services/auth.service';
import usersService from '@/services/users.service';
import { TUser } from '@/types';
import React, { createContext, useState, useEffect } from 'react';

type TAuthUser = Pick<TUser, 'id' | 'email' | 'role' | 'first_name' | 'last_name' | 'phone_number'>;

interface AuthContextType {
    isAuth: boolean;
    user: TAuthUser | null;
    signOut: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<TAuthUser | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get the auth object from local storage
        const _auth = localStorage.getItem('_auth');

        if (_auth) {
            // Parse the auth object
            const auth = JSON.parse(_auth) as TAuthUser;

            if (auth.id && auth.email && auth.role) {
                setUser(auth); // Set the user
                setIsAuth(true); // Set the auth state

                // Check if the user still exists
                usersService
                    .getUser(auth.id)
                    .then((u) => {
                        // If the user does not exist, sign out
                        if (u.email !== auth.email || u.role !== auth.role) {
                            setUser(null);
                            setIsAuth(false);
                            authService.signOut();
                        }
                    })
                    .catch(() => {
                        // If the user does not exist, sign out
                        setUser(null);
                        setIsAuth(false);
                        authService.signOut();
                    });
            }
        }

        setIsLoading(false);
    }, []);

    function signOut() {
        setUser(null);
        authService.signOut().then(() => {
            location.href = '/sign-in';
        });
    }

    const value = { isAuth, user, isLoading, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
