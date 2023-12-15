import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import React, { createContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import { decode } from "base-64";
import {Sidebar} from "../component/Sidebar";
global.atob = decode;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = user !== null;


    useEffect(() => {
        const loadTokenFromStorage = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                if (storedToken) {
                    const decodedToken = jwtDecode(storedToken);
                    setUser((prevUser) => ({ ...prevUser, token: storedToken, id: decodedToken.id, role: decodedToken.roles }));
                }
            } catch (error) {
                console.error('Error loading token from storage:', error);
            }
        };

        loadTokenFromStorage();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
        } catch (error) {
            console.error('Error removing token from storage:', error);
        }
        setUser(null);
    };

    const setAuthToken = async (token) => {
        try {
            await AsyncStorage.setItem('authToken', token);
            const decodedToken = jwtDecode(token);
            setUser((prevUser) => ({ ...prevUser, token, id: decodedToken.id, role: decodedToken.roles }));
        } catch (error) {
            console.error('Error storing token in storage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
