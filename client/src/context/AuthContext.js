// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const response = await axios.post('/api/users/login', { username, password });
        setUser(response.data.username);
    };

    const register = async (username, password) => {
        const response = await axios.post('/api/users/register', { username, password });
        setUser(response.data.username);
    };

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
